import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

const MbtiInfo = () => {
  const { mbti } = useParams();
  const navigate = useNavigate();
  return (
    <StContainer>
      <h1>
        당신은 <span>{`${mbti}`}</span> 입니다.
      </h1>
      <img src={require('../../src/빡빡이1.png')} alt="mbti-detail-img" />
      <StBtnGroups>
        <button onClick={() => navigate('/mbtiquestion')}>다시하기</button>
        {/* <button>결과보기</button> */}
      </StBtnGroups>
    </StContainer>
  );
};

export default MbtiInfo;

const StContainer = styled.div`
  font-family: 'Nanum_L';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #5b5b5b;

  h1 {
    font-family: 'Nanum_L';
    font-size: 30px;
    margin: 0;

    span {
      font-family: 'Nanum_EB';
      color: #5b5b5b;
    }
  }

  img {
    width: 95%;
    max-width: 394px;
    aspect-ratio: 394 / 525.89;
    margin: 74px 0 39px 0;
    background-color: pink;
  }
`;

const StBtnGroups = styled.div`
  display: flex;
  button {
    width: 269px;

    height: 60px;
    border-radius: 40px;
    border: 0;
    font-size: 18px;
    background-color: #5b5b5b;
    color: white;
    cursor: pointer;
  }
`;
