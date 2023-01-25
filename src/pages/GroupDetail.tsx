import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/hooks/typescripthook/hooks';
import GroupDetailCreateModal from '../components/modal/GroupDetailCreateModal';
import {
  __groupFeedList,
  __groupGetDate,
  __groupGetRank,
  __groupSubscribeCheck,
} from '../redux/modules/groupSlice';
import GroupDetailCard from './subpages/GroupDetailCard';
import { groupPreset } from './GroupPage';
import GroupDetailEmptyShow from './subpages/GroupDetailEmptyShow';
import loggedIn from '../api/loggedIn';

export interface subscribeInfoPreset {
  admin_flag?: number;
  created_at?: string;
  group_id?: number;
  group_user_id?: number;
  updated_at?: string;
  user_id?: number;
  likeCount?: number;
}

export interface groupFeedPreset {
  created_at: string;
  description: string;
  feed_id: number;
  group_user_id: number;
  location: null;
  thumbnail: string;
  updated_at: string;
  mbti: string;
  nickname: string;
  likeCount: number;
}

const GroupDetail = () => {
  const paramId = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { groupRank } = useAppSelector(store => store.group);
  const { groupSubscribe } = useAppSelector(store => store.group);
  const { groupFeedList } = useAppSelector(store => store.group);
  const filteredByPage: any = groupRank.filter((group: groupPreset) =>
    paramId.id ? group.group_id === +paramId.id : null,
  );

  const accessToken = localStorage.getItem('accessToken');

  // console.log(groupSubscribe.admin_flag);
  // const groupSubscribeCheck: subscribeInfoPreset = groupSubscribe;

  // console.log(groupSubscribeCheck.group_id);

  //페이지 시작할 때 그룹 정보와 그룹 게시글 정보들을 가져옴
  useEffect(() => {
    dispatch(__groupGetRank());
    dispatch(__groupFeedList({ id: paramId.id }));
  }, []);

  //이 페이지에서 구독한지 확인하기
  useEffect(() => {
    dispatch(__groupSubscribeCheck({ id: paramId.id }));
  }, []);

  const onClickGroupSubscribe = async () => {
    if (accessToken !== null) {
      await loggedIn.put(`api/group/${paramId.id}`); //구독 or 구독 취소 => 나중에 thunk에 넣기
      await dispatch(__groupSubscribeCheck({ id: paramId.id })); //구독 확인
      await dispatch(__groupGetRank()); //여기서 그룹 정보 들고옴
      await dispatch(__groupFeedList({ id: paramId.id })); //그룹 게시글 들고옴
    } else {
      alert('로그인 후 구독해주세요!');
    }
  };

  const postDelete = async () => {
    if (window.confirm('정말로 이 그룹을 삭제하시겠습니까?')) {
      await loggedIn.delete(`/api/group/${paramId.id}`);
      dispatch(__groupGetRank());
      dispatch(__groupGetDate());
      navigate('/group');
    } else {
      // alert('취소합니다.');
    }
  };

  return (
    <div>
      <StBgImages>
        <img src={require('../이미지1.webp')} alt="bg-img" />
      </StBgImages>
      <StContainer>
        <StMainContainer>
          <StGroupInfo>
            <div className="group-info">
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
                ?.split(',')
                ?.map((tag: string, index: number) => {
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
              groupSubscribe.admin_flag ? (
                <StSubscribeOn>
                  <button onClick={postDelete} className="group-subscribe-del">
                    삭제하기
                  </button>
                </StSubscribeOn>
              ) : (
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
              )
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
                  groupSubscribe={groupSubscribe}
                />
              ))
            ) : (
              <GroupDetailEmptyShow />
            )}
          </StGroupPosts>
        </StPostContainer>

        {groupSubscribe ? <GroupDetailCreateModal paramId={paramId} /> : null}
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
  height: 300px;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const StMainContainer = styled.div`
  width: 460px;
  min-width: 460px;

  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: 100%;
  }
`;

const StSubscribeOn = styled.div`
  text-align: center;

  .group-subscribe-on {
    display: block;
    width: 100%;
    border: 0;
    /* border: 1px solid gray; */
    border-radius: 5px;
    color: #9d9d9d;
    cursor: pointer;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    background-color: #f3f1f8;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    /* fill: #6E57F6; */
  }

  .group-subscribe-del {
    display: block;
    width: 100%;
    /* border: 1px solid gray; */
    border-radius: 5px;
    cursor: pointer;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: white;
    color: red;
    border: 1px solid red;

    &:hover {
      background-color: red;
      color: white;
    }
  }

  .group-subscribe-cancel {
    display: none;
    width: 100%;
    /* border: 1px solid gray; */
    border: 0;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #644eee;

    /* background-color: pink; */
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
    /* border: 1px solid gray; */
    border: 0;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #644eee;
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
