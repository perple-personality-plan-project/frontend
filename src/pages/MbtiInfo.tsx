import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

const MbtiInfo = () => {
  const param = useParams();
  const navigate = useNavigate();

  const mbtiCategory = [
    'ISTJ',
    'ISTP',
    'ISFJ',
    'ISFP',
    'INTJ',
    'INTP',
    'INFJ',
    'INFP',
    'ESTJ',
    'ESTP',
    'ESFJ',
    'ESFP',
    'ENTJ',
    'ENTP',
    'ENFJ',
    'ENFP',
  ];

  const mbtiMeaning = [
    '현실주의자',
    '장인',
    '수호자',
    '모험가',
    '전략가',
    '논리술사',
    '옹호자',
    '중재자',
    '경영자',
    '사업가',
    '집정관',
    '연예인',
    '통솔자',
    '변론가',
    '선도자',
    '활동가',
  ];

  return (
    <StContainer>
      {mbtiCategory.map((mbti, index) => {
        return mbti === param.mbti ? (
          <h1>
            당신은 <span>{`${mbtiMeaning[index]} ${mbti}`}</span> 입니다.
          </h1>
        ) : null;
      })}
      {mbtiCategory.map((mbti, index) => {
        return mbti === param.mbti ? (
          <img
            src={require(`../components/images/${index + 1}.jpg`)}
            alt="mbti-detail-img"
          />
        ) : null;
      })}
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
    border-radius: 20px;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
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
