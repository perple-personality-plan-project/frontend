import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const MBTIKakao = () => {
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const mbtiList = [
    'ENFJ',
    'ENFP',
    'ENTJ',
    'ENTP',
    'ESFP',
    'ESFJ',
    'ESTP',
    'ESTJ',
    'INFP',
    'INFJ',
    'INTP',
    'INTJ',
    'ISTP',
    'ISTJ',
    'ISFP',
    'ISFJ',
  ];

  const sendMbti = () => {
    if (mbtiList.includes(data.toUpperCase())) {
      // console.log(data.toUpperCase());
      sessionStorage.setItem('mbti', data.toUpperCase());
      navigate('/');
    } else {
      alert('MBTI를 제대로 입력해주세요!');
    }
  };

  return (
    <StContainer>
      <h1>잠깐!</h1>
      <h2>Platter를 즐기러 가기 전에 </h2>
      <h2>자신의 MBTI를 입력해 주세요!</h2>
      <input
        maxLength={4}
        value={data}
        onChange={e => setData(e.target.value)}
        placeholder="MBTI를 입력해주세요!"
      />
      <p>자신의 MBTI... 잘 모르시겠다구요?</p>
      <StTextContent>
        <p>테스트를 통해 간단하게 알아보세요!</p>
        <p onClick={() => window.open('/mbti', '_blank')}>검사하러 가기</p>
      </StTextContent>
      <div className="text-arrow">
        <i className="ri-arrow-right-line arrow-active"></i>
        <p onClick={sendMbti}>Platter 즐기러 가기</p>
      </div>
    </StContainer>
  );
};

export default MBTIKakao;

const StContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  /* background-color: pink; */
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #644eee;
  }

  h2 {
    margin: 10px;
  }
  h2 {
    &:nth-of-type(2) {
      margin: 0 0 30px 0;
      /* padding-left: 80px; */
    }
  }

  input {
    border-radius: 30px;
    border: 0;
    outline: 0;
    font-size: 18px;
    height: 50px;
    text-indent: 15px;
    max-width: 300px;
    width: 90%;
    background-color: #f5f3f3;
  }

  .text-arrow {
    position: relative;
    cursor: pointer;
    p {
      font-size: 20px;
      padding: 10px 20px;
      border-radius: 20px;
      /* background-color: #644eee; */
      color: #644eee;
    }

    .arrow-active {
      position: absolute;
      top: 30px;
      right: -3px;
      color: #644eee;
      font-size: 20px;
    }

    &:hover {
      .arrow-active {
        top: 30px;
        right: -10px;
      }
    }
  }
`;

const StTextContent = styled.div`
  display: flex;
  align-items: center;

  p {
    &:first-of-type {
      margin-right: 20px;
    }

    &:nth-of-type(2) {
      border: 1px solid gray;
      background-color: white;
      padding: 10px 20px;
      border-radius: 20px;
      color: #644eee;
      cursor: pointer;

      &:hover {
        background-color: #644eee;
        color: white;
      }
    }
  }
`;
