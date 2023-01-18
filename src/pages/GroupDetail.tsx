import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/hooks/typescripthook/hooks';
import GroupDetailCreateModal from '../components/modal/GroupDetailCreateModal';
import {
  __groupFeedList,
  __groupGetRank,
  __groupSubscribeCheck,
} from '../redux/modules/groupSlice';
import GroupDetailCard from './subpages/GroupDetailCard';
import { groupPreset } from './GroupPage';
import nonTokenClient from '../api/noClient';
import GroupDetailEmptyShow from './subpages/GroupDetailEmptyShow';

export interface groupPostPreset {
  locationId: number;
  locationName: string;
  locationRoute: string;
  postDetail: string;
  thumbnail: string[];
  index: number;
}

export interface groupFeedPreset {
  created_at: string;
  description: string;
  feed_id: number;
  group_user_id: number;
  location: null;
  thumbnail: string;
  updated_at: string;
}

const GroupDetail = () => {
  const paramId = useParams();

  const dispatch = useAppDispatch();
  const { groupRank } = useAppSelector(store => store.group);
  const { groupSubscribe } = useAppSelector(store => store.group);
  const { groupFeedList } = useAppSelector(store => store.group);
  const [toggle, setToggle] = useState(false);
  const filteredByPage: any = groupRank.filter((group: groupPreset) =>
    paramId.id ? group.group_id === +paramId.id : null,
  );

  //페이지 시작할 때 그룹 정보와 그룹 게시글 정보들을 가져옴
  useEffect(() => {
    dispatch(__groupGetRank());
    dispatch(__groupFeedList({ id: paramId.id }));
  }, []);

  //부모 trigger
  const [trigger, setTrigger] = useState();

  //자식 trigger가 부모 trigger를 변경시켜 useEffect작동
  //피드 생성 후 다시 받아기 위한 useEffect
  useEffect(() => {
    dispatch(__groupFeedList({ id: paramId.id }));
  }, [trigger]);

  //이 페이지에서 구독한지 확인하기 + 구독 했으면 구독자 수
  //화면에서 늘어야 하니 그룹도 업데이트 해주기
  useEffect(() => {
    dispatch(__groupSubscribeCheck({ id: paramId.id }));
    dispatch(__groupGetRank());
  }, [toggle]);

  //thunk 쓸 필요 없으면 같은 페이지에서 작업하기
  //toggle을 임의로 줌으로써 useEffect를 toggle에 의존하여 작동하게 만듬
  const onClickGroupSubscribe = async () => {
    await nonTokenClient.put(`/group/${paramId.id}`);
    setToggle(!toggle);
  };

  return (
    <div>
      <StBgImages></StBgImages>
      <StContainer>
        <StMainContainer>
          <StGroupInfo>
            <div className="group-info">
              {/* <img src={require('../빡빡이1.png')} alt="group-img" /> */}
              <img
                src={
                  process.env.REACT_APP_IMG_SERVER +
                  filteredByPage[0]?.thumbnail
                }
                alt="group-img"
              />
              <div className="group-text">
                <h1>{filteredByPage[0]?.group_name}</h1>
                <p>
                  게시물 {filteredByPage[0]?.feedCount}개 /{' '}
                  {filteredByPage[0]?.group_user_count}명이 소통중이에요{' '}
                </p>
              </div>
            </div>
            <div className="group-tag-container">
              {filteredByPage[0]?.hashtags
                .split(',')
                .map((tag: string, index: number) => {
                  return (
                    <div key={index} className="group-tag">
                      {tag}
                    </div>
                  );
                })}
            </div>
            <div className="group-horizontal-line" />

            <div className="group-intro">
              <h2>그룹 소개</h2>
              <p>{filteredByPage[0]?.description}</p>
            </div>
            {groupSubscribe ? (
              <StSubscribeOn>
                <button
                  onClick={onClickGroupSubscribe}
                  className="group-subscribe-on"
                >
                  구독중
                </button>
                <button
                  onClick={onClickGroupSubscribe}
                  className="group-subscribe-cancel"
                >
                  구독취소
                </button>
              </StSubscribeOn>
            ) : (
              <button
                onClick={onClickGroupSubscribe}
                className="group-subscribe"
              >
                그룹 구독하기
              </button>
            )}
          </StGroupInfo>
        </StMainContainer>
        <StPostContainer>
          <h2>그룹 게시글</h2>
          <StGroupPosts>
            {groupFeedList.length !== 0 ? (
              groupFeedList.map((feed: groupFeedPreset) => (
                <GroupDetailCard
                  key={feed.feed_id}
                  feed={feed}
                  paramId={paramId}
                />
              ))
            ) : (
              <GroupDetailEmptyShow />
            )}
          </StGroupPosts>
        </StPostContainer>

        {groupSubscribe ? (
          <GroupDetailCreateModal
            paramId={paramId}
            setTriggerParant={setTrigger}
          />
        ) : null}
      </StContainer>
    </div>
  );
};

export default GroupDetail;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
  }
`;

const StPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  h2 {
    width: 150px;
    margin-left: 50px;
    font-size: 13px;
    color: #a9a9a9;
  }

  @media screen and (max-width: 900px) {
    h2 {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const StBgImages = styled.div`
  background-color: #f3f3f3;
  height: 250px;
`;

const StMainContainer = styled.div`
  width: 400px;
  min-width: 400px;

  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: 100%;
  }
`;

const StSubscribeOn = styled.div`
  text-align: center;

  .group-subscribe-on {
    /* width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    background-color: #644eee; */

    display: block;
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    background-color: #644eee;
  }

  .group-subscribe-cancel {
    display: none;
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    background-color: pink;
  }

  &:hover {
    .group-subscribe-on {
      display: none;
    }

    .group-subscribe-cancel {
      display: block;
    }
  }
`;

const StGroupInfo = styled.div`
  img {
    width: 80px;
    height: 80px;
    /* margin: 0 10px 10px 0; */
    border-radius: 10px;
  }
  .group-info {
    display: flex;
    align-items: center;
  }

  .group-text {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    h1,
    p {
      margin: 0 0 5px 0;
      padding: 0;

      font-size: 13px;
    }

    h1 {
      margin-bottom: 10px;
      font-size: 25px;
    }
  }

  .group-tag-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;

    .group-tag {
      background-color: #eeeeee;
      color: #888888;
      padding: 5px 15px;
      border-radius: 10px;

      margin: 0 10px 10px 0;
      font-size: 13px;
    }
  }

  .group-horizontal-line {
    border-bottom: 2px solid #eeeeee;
    margin: 20px 0 30px 0;
  }

  .group-intro {
    h2,
    p {
      font-size: 13px;
    }

    h2 {
      color: #a9a9a9;
    }

    p {
      color: #5b5b5b;
    }
  }

  .group-subscribe {
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    background-color: #644eee;

    /* &:hover {
      background-color: gray;
      color: white;
    } */
  }
`;

const StGroupPost = styled.div`
  .post-container {
    position: relative;
    /* margin: 20px; */
    width: 330px;

    /* height: 400px; */

    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      background-color: #f0f0f0;
    }

    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;

      .post-header-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          background-color: pink;
          border-radius: 50%;
          margin-right: 10px;
        }

        h3 {
          margin: 0;
          font-size: 15px;
          margin-right: 10px;
        }

        p {
          background-color: white;
          border-radius: 20px;
          font-size: 12px;
          padding: 5px 15px;
        }
      }

      .post-header-route {
        background-color: white;
        border-radius: 5px;
        color: #5b5b5b;
        font-size: 12px;
        font-weight: bold;
        padding: 10px 15px;
        /* margin-right: 20px; */
      }
    }

    .post-desc {
      margin: 15px;
      p {
        max-width: 25ch;
        margin: 0 0 40px 0;
        overflow: auto;
      }

      .post-date {
        font-size: 14px;
        color: #9e9e9e;
        margin: 0;
      }
    }

    .post-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .post-bottom-right {
      display: flex;

      .post-bottom-icon {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: pink;

        /* border-radius: 50%; */
        margin: 0 5px;
      }
    }

    @media screen and (max-width: 900px) {
      width: 400px;
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
    margin-left: 0px;
  }
`;

const StGroupPosts = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 50px;
  position: relative;
  width: 100%;

  .post-add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #565656;
    color: white;
    position: fixed;
    z-index: 1;

    bottom: 80px;
    right: 60px;

    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
    margin-left: 0px;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;
