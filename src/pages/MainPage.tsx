import React from 'react';
import styled from 'styled-components';
import PostCard from '../components/MainPostCard';
import MainSlider from '../components/MainSlider';

function MainPage() {
  return (
    <Wrap>
      <Backgr>
        <MbtiWrap>
          <div className="gathered">
            <MbtiTag>😀ENFP</MbtiTag>
            <MbtiTitle>뭐하고 놀까?</MbtiTitle>
          </div>
          <div>
            <MainSlider />
          </div>
        </MbtiWrap>
      </Backgr>
      <CardListContainer>
        <PostCard />
      </CardListContainer>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 25vh;
`;

const Backgr = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 550px;
  font-size: 60px;
  justify-content: center;
  left: 0;
  right: 0;

  @media screen and (max-width: 800px) {
    font-size: 1.5em;
    text-align: center;
    flex-direction: column;
  }
`;

const MbtiWrap = styled.div`
  display: flex;
  margin: auto;
  gap: 100px;
  border: 1px solid;
  .gathered {
    margin-top: 100px;
  }
  @media screen and (max-width: 800px) {
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 25px;
    .gathered {
      flex-direction: row;
      margin: auto;
    }
  }
`;

const MbtiTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  color: #474545;
  border-radius: 50px;
  background-color: #d2d1d1;

  @media screen and (max-width: 800px) {
    justify-content: center;
    /* margin-left: 15%; */
    width: 120px;
    height: 50px;
  }
`;

const MbtiTitle = styled.div`
  color: black;
  margin-left: 55px;
  @media screen and (max-width: 412px) {
    /* justify-content: center; */
    /* margin-left: 5%; */
    width: 100%;
    height: 100%;
  }
`;

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10vh;
  justify-content: center;
  gap: 5%;

  @media screen and (max-width: 412px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export default MainPage;
