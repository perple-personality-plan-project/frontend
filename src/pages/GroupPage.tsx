import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import GroupCreateModal from '../components/modal/GroupCreateModal';

export interface groupPreset {
  groupId: number;
  groupName: string;
  groupTag: string;
  groupDetail: string;
  thumbnail: string;
}

const GroupPage = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [filterGroup, setFilterGroup] = useState('인기순 v');
  const [groups, setGroups] = useState<groupPreset[]>([
    {
      groupId: 1,
      groupName: '미친 텐션의 술집 정보',
      groupTag: '[]',
      groupDetail: '만화 카페 정보 공유하는 방입니다 :)',
      thumbnail:
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
    },
    {
      groupId: 2,
      groupName: '미친 텐션의 술집 정보',
      groupTag: '["# 술집", "# 맥주", "# 소주", "# INTJ", "# 춤zzzzzzzz"]',
      groupDetail: '만화 카페 정보 공유하는 방입니다 :)',
      thumbnail:
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
    },
    {
      groupId: 3,
      groupName: '미친 텐션의 술집 정보',
      groupTag: '["# 술집", "# 맥주", "# 소주", "# INTJ", "# 춤"]',
      groupDetail: '만화 카페 정보 공유하는 방입니다 :)',
      thumbnail:
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
    },
  ]);

  return (
    <StContainer>
      <StInputContainer>
        <StUpperInput placeholder="원하는 그룹을 검색해 보세요!" />
      </StInputContainer>
      <StRecommend>검색이 어려우시다고요? 추천해 드릴게요!</StRecommend>
      <StRecommendLists>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
      </StRecommendLists>

      <StGroups>
        {toggle ? (
          <StCategoryGroup style={{ display: 'flex', flexDirection: 'column' }}>
            <StCategoryHead onClick={() => setToggle(prev => !prev)}>
              {filterGroup}
            </StCategoryHead>
            <StCategory
              onClick={() => {
                setToggle(prev => !prev);
                setFilterGroup('인기순 v');
              }}
            >
              인기순
            </StCategory>
            <StCategory
              onClick={() => {
                setToggle(prev => !prev);
                setFilterGroup('날짜순 v');
              }}
            >
              날짜순
            </StCategory>
          </StCategoryGroup>
        ) : (
          <StCategoryGroup style={{ display: 'flex', flexDirection: 'column' }}>
            <StCategoryHead onClick={() => setToggle(prev => !prev)}>
              {filterGroup}
            </StCategoryHead>
          </StCategoryGroup>
        )}

        {groups.map(group => {
          return (
            <StGroupContainer>
              <StIcons>
                <button onClick={() => console.log('a')} className="icon">
                  A
                </button>
                <button onClick={() => console.log('b')} className="icon">
                  B
                </button>
              </StIcons>
              <StGroup
                key={group.groupId}
                onClick={() => navigate(`/${group.groupId}`)}
              >
                <div className="img-container">
                  <img src={group.thumbnail} alt="group-img" />
                </div>
                <div className="info-vertical">
                  <h2>{group.groupName}</h2>
                  {/* <p>{group.groupDetail}</p> */}

                  <p>게시글 2,786개 / 123명이 구독중이에요</p>
                  <div className="btn-group">
                    {JSON.parse(group.groupTag).length !== 0 ? (
                      JSON.parse(group.groupTag).map((tag: string) => {
                        return <button>{tag}</button>;
                      })
                    ) : (
                      <p>태그가 없습니다</p>
                    )}
                  </div>
                </div>
              </StGroup>
            </StGroupContainer>
          );
        })}
      </StGroups>
      <GroupCreateModal setGroups={setGroups} groups={groups} />
    </StContainer>
  );
};

export default GroupPage;

const StContainer = styled.div`
  background-color: #f8f8f8;
  /* position: relative; */
  width: 100%;
  height: 100vh;
  /* padding: 10px; */
  margin: 0 auto;
`;

const StGroupContainer = styled.div`
  position: relative;

  @media screen and (max-width: 800px) {
    width: 100%;
    /* height: 276px; */
  }
`;

//원하는 그룹을 검색해 보세요!
const StInputContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  padding: 20px 0 0 20px;
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    width: 100%;

    margin: 20px 0 0 0;
  }
`;

const StCategoryGroup = styled.div`
  margin: 0 15px 20px;
  width: 100px;
  border: 1px solid gray;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  top: -50px;
  left: -10px;

  z-index: 2;
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
  max-width: 50%;
  height: 20px;
  padding: 10px;
  border-radius: 20px;
  border: 0;
  background-color: #f1f1f1;

  text-indent: 12px;
  margin: 0 0 20px 0;

  @media screen and (max-width: 800px) {
    margin: 0 auto 20px auto;
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

  margin: 70px 15px;
  gap: 15px;
  position: relative;
`;

//그룹
const StGroup = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 13.6122px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  cursor: pointer;
  width: 600px;
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
