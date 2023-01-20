import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../components/hooks/typescripthook/hooks';

const GroupDetailEmptyShow = () => {
  const { groupSubscribe } = useAppSelector(store => store.group);

  console.log(groupSubscribe);
  return (
    <div>
      {groupSubscribe ? (
        <StContainer>게시글을 작성해주세요!</StContainer>
      ) : (
        <StContainer>구독 후 게시글을 작성해주세요!</StContainer>
      )}
    </div>
  );
};

export default GroupDetailEmptyShow;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #d1cdcd;
  width: 400px;
  height: 400px;

  @media screen and (max-width: 500px) {
    width: 100%;
    background-color: #d1cdcd;
  }
`;
