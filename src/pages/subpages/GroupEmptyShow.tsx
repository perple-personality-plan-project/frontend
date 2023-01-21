import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const GroupEmptyShow = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div>
      {accessToken === null ? (
        <StContainer>
          <p>로그인 후 그룹을 만들어주세요!</p>
          <div onClick={() => navigate('/signin')}>
            <p className="login">로그인 하러 가기</p>
            <p className="arrow">{`->`}</p>
          </div>
        </StContainer>
      ) : (
        <StContainer>
          <p>우측 하단 버튼을 클릭해 그룹을 만들어주세요!</p>
        </StContainer>
      )}
    </div>
  );
};

export default GroupEmptyShow;

const StContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  p {
    margin: 0 0 10px 0;
  }

  div {
    font-size: 15px;
    display: flex;
    cursor: pointer;
    &:hover {
      .arrow {
        padding-left: 5px;
      }
    }
  }
`;
