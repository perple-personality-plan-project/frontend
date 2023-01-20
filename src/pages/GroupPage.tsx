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
    setTags([...data.data]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StContainer>
      <StInputContainer>
        <StUpperInput placeholder="원하는 그룹을 검색해 보세요!" />
      </StInputContainer>
      <StRecommend>검색이 어려우시다고요? 추천해 드릴게요!</StRecommend>
      <StRecommendLists>
        {tags.map((tag: any) => (
          <StRecommendList>{tag.title}</StRecommendList>
        ))}
      </StRecommendLists>

      {groupByfilter.length !== 0 ? (
        <StGroups>
          {toggle ? (
            <StCategoryGroup>
              <StCategoryHead onClick={() => setToggle(prev => !prev)}>
                {filterGroup}
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
                {filterGroup}
              </StCategoryHead>
            </StCategoryGroup>
          )}

          {groupByfilter.map((group: groupPreset) => {
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

const StContainer = styled.div`
  background-color: #f8f8f8;
  /* position: relative; */
  width: 100%;
  min-height: 100vh;
  height: 100%;
  /* padding: 10px; */
  margin: 0 auto;
`;

//원하는 그룹을 검색해 보세요!
const StInputContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  padding: 20px 0 0 50px;
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
  top: 20px;
  left: -10px;

  z-index: 2;

  @media screen and (max-width: 800px) {
    left: 0;
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
  max-width: 40%;
  height: 20px;
  padding: 10px;
  border-radius: 20px;
  border: 0;
  background-color: #f1f1f1;

  text-indent: 12px;
  margin: 0 0 20px 0;

  @media screen and (max-width: 800px) {
    text-align: center;
    margin: 0 auto 20px auto;
    max-width: 50%;
    width: 100%;
  }
`;

//검색이 어려우시다고요? 추천해 드릴게요!
const StRecommend = styled.p`
  background-color: white;
  color: #7a7a7a;
  font-size: 12px;
  padding: 0 0 20px 50px;
  margin: 0;

  @media screen and (max-width: 800px) {
    padding-bottom: 10px;
    text-align: center;
  }
`;

//해시태그 그룹
const StRecommendLists = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  margin-bottom: 30px;
  div {
    &:first-of-type {
      margin-left: 45px;
    }
  }
`;

//해시태그
const StRecommendList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 30px;
  color: #7a7a7a;
  margin: 5px;

  border-radius: 20px;
  background-color: #f5f5f5;
`;

//그룹 컨테이너
const StGroups = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 0 auto;
  padding: 70px 0;
  gap: 15px;
  position: relative;
  max-width: 1200px;

  @media screen and (max-width: 1250px) {
    margin: 0 auto;
    padding: 70px 0;
    max-width: 600px;
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
