import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/GroupModal';

const GroupPage = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
      </StRecommendLists>
      <StGroups>
        <StGroup>
          <img src={require('../빡빡이1.png')} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2>INTJ 만화 카페 그룹</h2>
            <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
          </div>
        </StGroup>
        <StGroup>
          <img src={require('../빡빡이1.png')} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2>INTJ 만화 카페 그룹</h2>
            <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
          </div>
        </StGroup>
        <StGroup>
          <img src={require('../빡빡이1.png')} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2>INTJ 만화 카페 그룹</h2>
            <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
          </div>
        </StGroup>
        <StGroup>
          <img src={require('../빡빡이1.png')} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2>INTJ 만화 카페 그룹</h2>
            <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
          </div>
        </StGroup>
      </StGroups>
      <StModalIcon
        onClick={() => setIsOpen(true)}
        src={require('../빡빡이1.png')}
      />
      <Modal onClose={() => setIsOpen(false)} open={isOpen}>
        <StModalContainer>
          <div>fancy</div>
          <div>fancy</div>
          <div>fancy</div>
          <div>fancy</div>
          <div>
            <StModalButton>생성하기</StModalButton>
            <StModalButton onClick={() => setIsOpen(false)}>닫기</StModalButton>
          </div>
        </StModalContainer>
      </Modal>
    </StContainer>
  );
};

export default GroupPage;

//640 / 1024

const StContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 100vh; */
  /* padding: 10px; */
  margin: 0 auto;
`;

const StModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const StModalButton = styled.button`
  border-radius: 5px;
  border: 0;

  cursor: pointer;
`;

const StInputContainer = styled.div`
  margin: 20px 0 0 20px;
  @media screen and (max-width: 412px) {
    display: flex;
    justify-content: center;
  }
`;

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

  @media screen and (max-width: 412px) {
    margin: 0 auto 20px auto;
    max-width: 216px;
  }
`;

const StRecommend = styled.p`
  color: #7a7a7a;
  font-size: 12px;
  padding: 0 0 0 50px;
  margin-bottom: 20px;

  @media screen and (max-width: 412px) {
    padding: 0;
    text-align: center;
  }
`;

const StRecommendLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;

  div {
    &:first-of-type {
      margin-left: 45px;
    }
  }
  /* div {
    &:last-of-type {
      margin-right: 45px;
    }
  } */
`;

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

const StGroups = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 0 15px;
  gap: 10px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const StGroup = styled.div`
  display: flex;
  padding: 20px;
  box-shadow: 0px 0px 13.6122px rgba(0, 0, 0, 0.14);
  border-radius: 10px;

  img {
    border-radius: 10px;
  }
  h2 {
    margin: 20px 0 0 0;
  }

  p {
    margin: 0 0 20px 0;
  }
`;

const StModalIcon = styled.img`
  width: 60px;
  height: 60px;

  position: fixed;
  bottom: 100px;
  right: 100px;

  cursor: pointer;
`;
