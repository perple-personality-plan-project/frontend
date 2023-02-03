import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const MainEmptyShow = () => {
  return (
    <div>
      <StContainer>
        <StIcon>
          <i
            className="ri-image-line"
            style={{
              color: '#9e9e9e',
              fontSize: '100px',
              cursor: 'pointer',
            }}
          ></i>
        </StIcon>
        <div
          className="title"
          style={{
            color: '#9e9e9e',
          }}
        >
          게시물 없음
        </div>
        <div
          className="title"
          style={{
            color: '#9e9e9e',
          }}
        >
          로그인 후 마이페이지에서 게시글 작성이 가능합니다.
        </div>
      </StContainer>
    </div>
  );
};

export default MainEmptyShow;

const StContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 15vh;

  p {
    margin: 0 0 10px 0;
  }

  .title {
    margin-top: 10px;
  }
`;

const StIcon = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
