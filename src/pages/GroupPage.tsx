import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import GroupCreateModal from '../components/modal/GroupCreateModal';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/hooks/typescripthook/hooks';
import { __groupGetDate, __groupGetRank } from '../redux/modules/groupSlice';
import GroupCard from './subpages/GroupCard';
import GroupEmptyShow from './subpages/GroupEmptyShow';
import nonTokenClient from '../api/noClient';

export interface groupPreset {
  created_at: string;
  description: string;
  feedCount: number;
  group_id: number;
  group_name: string;
  group_user_count: number;
  hashtags: string;
  thumbnail: string;
  updated_at: string;
}

const GroupPage = () => {
  const dispatch = useAppDispatch();
  const { groupRank } = useAppSelector(store => store.group);
  const { groupDate } = useAppSelector(store => store.group);

  const [toggle, setToggle] = useState(false);
  const [filterGroup, setFilterGroup] = useState('인기순');

  const [groupByfilter, setGroupByfilter] = useState([]);
  const [tags, setTags] = useState<{}[]>([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    if (filterGroup === '인기순') {
      dispatch(__groupGetRank());
    }
    if (filterGroup === '날짜순') {
      dispatch(__groupGetDate());
    }
  }, [filterGroup]);

  useEffect(() => {
    setGroupByfilter(groupRank);
  }, [groupRank]);

  useEffect(() => {
    setGroupByfilter(groupDate);
  }, [groupDate]);

  const fetchData = async () => {
    const { data } = await nonTokenClient.get(`api/group/hashtag`);
    const randomTags = data.data.sort(() => Math.random() - 0.5).splice(0, 11);
    setTags([...randomTags]);
  };

  const handlekeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const { data } = await nonTokenClient.get(
        `/api/group?sort=date&search=${word}`,
      );
      setGroupByfilter(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StContainer>
      <StInputContainer>
        <StInput>
          <StUpperInput
            value={word}
            onChange={e => setWord(e.target.value)}
            placeholder="원하는 그룹을 검색해 보세요!"
            onKeyDown={handlekeyDown}
          />
          <div className="input-search">
            <i
              style={{
                fontSize: '20px',
                color: '#c2c0cf',
              }}
              className="ri-search-2-line"
            ></i>
          </div>
          <div className="input-clear" onClick={() => setWord('')}>
            <i
              style={{ fontSize: '28px', color: 'rgb(220, 218, 230)' }}
              className="ri-close-circle-fill"
            ></i>
          </div>
        </StInput>
        <img
          src={require('../components/images/groupImages/groupimg.png')}
          alt="group-banner"
        />
      </StInputContainer>
      <StRecommend>검색이 어려우시다고요? 추천해 드릴게요!</StRecommend>
      <StRecommendLists>
        {tags?.map((tag: any, index) => (
          <StRecommendList key={index}>{tag.title}</StRecommendList>
        ))}
      </StRecommendLists>

      <StLine></StLine>

      {groupByfilter.length !== 0 ? (
        <StGroups>
          {toggle ? (
            <StCategoryGroup>
              <StCategoryHead onClick={() => setToggle(prev => !prev)}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {filterGroup} <i className="ri-arrow-down-s-fill"></i>
                </div>
              </StCategoryHead>
              <StCategory
                onClick={() => {
                  setToggle(prev => !prev);
                  setFilterGroup('인기순');
                }}
              >
                인기순
              </StCategory>
              <StCategory
                onClick={() => {
                  setToggle(prev => !prev);
                  setFilterGroup('날짜순');
                }}
              >
                날짜순
              </StCategory>
            </StCategoryGroup>
          ) : (
            <StCategoryGroup
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <StCategoryHead onClick={() => setToggle(prev => !prev)}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {filterGroup} <i className="ri-arrow-down-s-fill"></i>
                </div>
              </StCategoryHead>
            </StCategoryGroup>
          )}

          {groupByfilter.map((group: groupPreset) => {
            // const tags = group.hashtags;
            // const groupNames = group.group_name;
            // if (word === '') {
            //   return <GroupCard key={group.group_id} group={group} />;
            // }
            // if (groupNames?.includes(word) || tags?.includes(word)) {
            //   return <GroupCard key={group.group_id} group={group} />;
            // } else {
            //   return null;
            // }
            return <GroupCard key={group.group_id} group={group} />;
          })}

          {/* {groupRank.map((group: groupPreset) => {
          if (filterGroup === '인기순') {
            return <GroupCard key={group.group_id} group={group} />;
          }
        })}

        {groupDate.map((group: groupPreset) => {
          if (filterGroup === '날짜순') {
            return <GroupCard key={group.group_id} group={group} />;
          }
        })} */}
        </StGroups>
      ) : (
        <GroupEmptyShow />
      )}

      <GroupCreateModal
        setGroupByfilter={setGroupByfilter}
        // groupByfilter={groupByfilter}
        filterGroup={filterGroup}
      />
    </StContainer>
  );
};

export default GroupPage;

const StInput = styled.div`
  position: relative;
  min-width: 420px;
  width: 100%;

  /* font-size: 12px; */

  .input-search {
    /* position: absolute; */
    position: absolute;
    /* top: 20px;
    left: 14px; */
    top: 13px;
    left: 15px;
    @media screen and (max-width: 800px) {
      left: 24%;
    }
    @media screen and (max-width: 600px) {
      left: 15%;
    }

    @media screen and (max-width: 500px) {
      left: 4%;
      /* min-width: 400px; */
    }
  }

  .input-clear {
    display: flex;
    justify-content: center;
    border-radius: 50%;
    color: white;
    /* background-color: #e2e1ea; */
    width: 28px;
    height: 28px;
    position: absolute;
    top: 10px;
    left: 280px;
    font-size: 25px;

    @media screen and (min-width: 866px) {
      left: 35.7%;
    }

    @media screen and (max-width: 800px) {
      left: 72.5%;
    }

    @media screen and (max-width: 600px) {
      left: 78%;
    }

    @media screen and (max-width: 500px) {
      left: 90%;
    }
  }

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    max-width: 298px;
  }

  @media screen and (max-width: 500px) {
    display: flex;
    justify-content: center;
    width: 95%;
    min-width: 390px;
  }
`;

const StLine = styled.div`
  border: 1px solid #f2f2f2;
`;
const StContainer = styled.div`
  * {
    font-family: 'Nanum_R';
  }
  background-color: #f9f9ff;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

//원하는 그룹을 검색해 보세요!
const StInputContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  padding: 50px 0 0 68px;
  display: flex;
  justify-content: center;

  img {
    position: absolute;
    top: 120px;
    right: 0;
    width: 30%;
    height: 100px;
    margin-right: 50px;

    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    width: 100%;

    margin: 20px 0 0 0;
    padding: 20px 0 0 0;
  }
`;

const StCategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px 20px;
  width: 100px;
  border: 1px solid gray;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  top: 50px;
  left: 0;

  z-index: 2;

  @media screen and (max-width: 1315px) {
    left: 50%;
    transform: translate(-330px, 0);
  }
  @media screen and (max-width: 800px) {
    left: 333px;
    /* transform: translate(-380px, 0); */
  }
`;

const StCategoryHead = styled.button`
  width: 100px;
  height: 30px;
  border: 0;
  font-size: 15px;
  background-color: white;
  cursor: pointer;
`;

const StCategory = styled.button`
  width: 100px;
  height: 30px;
  border: 0;
  font-size: 15px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: pink;
  }
`;

//원하는 그룹을 검색해 보세요!
const StUpperInput = styled.input`
  width: 95%;
  max-width: 35%;
  min-width: 273px;
  height: 20px;
  padding: 11px 20px;
  background-color: white;
  outline: 0;
  text-indent: 22px;
  margin: 0 0 51px 0;
  /* font-size: 20px; */
  font-size: 15px;

  border: double 3px transparent;
  border-radius: 40px;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, #644eee, #4584ff);
  background-origin: border-box;
  background-clip: padding-box, border-box;

  @media screen and (max-width: 800px) {
    text-align: center;
    margin: 0 auto 20px auto;
    max-width: 50%;
    width: 100%;
    text-indent: 0;
  }

  /* @media screen and (max-width: 600px) {
    font-size: 12px;
  } */

  @media screen and (max-width: 500px) {
    font-size: 14px;
    max-width: 100%;
    width: 95%;
  }
`;

//검색이 어려우시다고요? 추천해 드릴게요!
const StRecommend = styled.p`
  background-color: white;
  color: #7a7a7a;
  font-size: 16.33px;
  padding: 0 0 25px 69px;
  margin: 0;

  @media screen and (max-width: 800px) {
    padding: 0 0 10px 0;
    font-size: 15px;
    text-align: center;
  }
`;

//해시태그 그룹
const StRecommendLists = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 49px;
  div {
    &:first-of-type {
      margin-left: 61px;
    }
  }
`;

//해시태그
const StRecommendList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 114.34px;
  height: 38.38px;
  color: #7a7a7a;
  margin: 5px;
  font-size: 16.33px;

  border-radius: 30px;
  background-color: #f5f5f5;

  @media screen and (max-width: 500px) {
    width: 125px;
    height: 35px;
  }
`;

//그룹 컨테이너
const StGroups = styled.div`
  background-color: #f9f9ff;
  display: flex;
  /* justify-content: center; */
  width: 1300px;
  flex-wrap: wrap;

  margin: 0 auto;
  padding: 110px 0;
  gap: 15px;
  position: relative;
  /* max-width: 1200px; */

  @media screen and (max-width: 1315px) {
    display: flex;
    justify-content: center;
    width: initial;
  }
`;

const StGroupContainer = styled.div`
  position: relative;

  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 0 15px;
    /* height: 276px; */
  }
`;

const StIcons = styled.div`
  position: absolute;
  display: flex;
  top: 20px;
  right: 20px;

  z-index: 1;

  .icon:nth-of-type(2) {
    margin-left: 5px;
  }

  .icon {
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: pink;
  }
  @media screen and (max-width: 500px) {
    /* display: none; */
    top: 50%;
    transform: translate(0, -280%);
    left: 55px;
  }
`;

const StGroup = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 13.6122px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  cursor: pointer;
  width: 550px;
  position: relative;
  /* height: 276px; */

  h2 {
    font-size: 20px;
    margin: 15px 0 5px 0;
  }

  p {
    color: #8e8e8e;
    font-size: 13px;
    margin: 0 0 0 0;
  }

  .img-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;

    img {
      /* aspect-ratio: 1/1;
      width: 100%; */
      width: 130px;
      height: 130px;
      border-radius: 10px;
    }

    @media screen and (max-width: 500px) {
      height: 170px;
      flex-direction: row;
      align-items: flex-end;
    }
  }

  .btn-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;

    button {
      font-size: 12px;
      color: #888888;
      max-width: 20ch;
      border-radius: 20px;
      border: 0;
      padding: 5px 15px;
      cursor: pointer;
    }
  }

  .info-vertical {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    box-sizing: border-box;
  }
`;
