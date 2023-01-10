import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import GroupCreateModal from '../components/modal/GroupCreateModal';

const GroupPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([
    {
      groupId: 1,
      groupName: '미친 텐션의 술집 정보',
      groupTag: 'ENFP',
      groupDetail: '만화 카페 정보 공유하는 방입니다 :)',
      thumbnail:
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
    },
    {
      groupId: 2,
      groupName: '미친 텐션의 술집 정보',
      groupTag: 'ENFP',
      groupDetail: '만화 카페 정보 공유하는 방입니다 :)',
      thumbnail:
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
    },
    {
      groupId: 3,
      groupName: '미친 텐션의 술집 정보',
      groupTag: 'ENFP',
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
        {groups.map(group => {
          console.log(group);
          return (
            <StGroup
              key={group.groupId}
              onClick={() => navigate(`/${group.groupId}`)}
            >
              <img src={group.thumbnail} alt="group-img" />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <h2>{group.groupName}</h2>
                <p>{group.groupDetail}</p>
              </div>
            </StGroup>
          );
        })}
      </StGroups>
      {/* <StModalIcon
        onClick={() => setIsOpen(true)}
        src={require('../빡빡이1.png')}
      /> */}
      <GroupCreateModal setGroups={setGroups} groups={groups} />
    </StContainer>
  );
};

export default GroupPage;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 100vh; */
  /* padding: 10px; */
  margin: 0 auto;
`;

//원하는 그룹을 검색해 보세요!
const StInputContainer = styled.div`
  margin: 20px 0 0 20px;
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    width: 100%;

    margin: 20px 0 0 0;
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
  color: #7a7a7a;
  font-size: 12px;
  padding: 0 0 0 50px;
  margin-bottom: 20px;

  @media screen and (max-width: 800px) {
    padding: 0;
    text-align: center;
  }
`;

//해시태그 그룹
const StRecommendLists = styled.div`
  display: flex;
  flex-wrap: wrap;
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

  margin: 0 15px;
  gap: 15px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 500px) {
    margin: 0 auto;
  }
`;

//그룹
const StGroup = styled.div`
  display: flex;
  padding: 20px;
  box-shadow: 0px 0px 13.6122px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  cursor: pointer;
  width: 400px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right: 20px;
  }
  h2 {
    margin: 20px 0 0 0;
  }

  p {
    margin: 0 0 20px 0;
  }

  @media screen and (max-width: 500px) {
    width: 350px;
  }
`;

const StModalIcon = styled.img`
  width: 60px;
  height: 60px;

  position: fixed;
  bottom: 100px;
  right: 100px;

  cursor: pointer;

  @media screen and (max-width: 500px) {
    bottom: 60px;
    right: 60px;
  }
`;
