import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>올바른 url을 입력해 주세요.</p>
      <button onClick={() => navigate('/')}>메인으로</button>
    </StContainer>
  );
};

export default NotFound;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;

  h1 {
    font-size: 30px;
    margin: 0 0 10px 0;
  }

  p {
    margin: 0 0 10px 0;
  }

  button {
    padding: 8px 20px;
    border-radius: 20px;
    background-color: #644eee;
    color: white;
    outline: 0;
    border: 0;
    cursor: pointer;
  }
`;
