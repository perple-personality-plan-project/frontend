import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import MainSlider from '../components/MainSlider';
import MainPostCard from './subpages/MainPostCard';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/hooks/typescripthook/hooks';
import { __mainFeedlist } from '../redux/modules/postSlice';

export interface mainPostPreset {
  feed_id: number;
  created_at: string;
  description: string;
  thumbnail: string;
  like_count: number;
  mbti: string;
  updated_at: string;
}

const MainPage = () => {
  const paramId = useParams();

  const dispatch = useAppDispatch();

  const [mbtiCheck, setMbtiCheck] = useState('All');

  const { mainFeedList } = useAppSelector(store => store.post);
  const [mainPosts, setMainPosts] = useState<mainPostPreset[]>([]);

  // useEffect(() => {
  //   dispatch(__mainFeedlist());
  // }, []);

  return (
    <Wrap>
      <Backgr>
        <TitleWrap>
          <div className="gathered">
            <MbtiTag>{mbtiCheck}</MbtiTag>
            <MbtiTitle>뭐하고 놀까?</MbtiTitle>
            <div style={{ fontSize: '15px', padding: '20px 0 0 20px' }}>
              MBTI 검사하고 나에게 맞는 HOT PLACE 찾자!
            </div>
            {/* <div
              style={{
                width: '110px',
                height: '50px',
                border: '2px soild white',
                fontSize: '15px',
                padding: '8% 0 0 70%',
              }}
            >
              v MBTI 검사하기
            </div> */}
          </div>

          <MainSlider setMbtiCheck={setMbtiCheck} />
        </TitleWrap>
      </Backgr>
      <PostListContainer>
        {mainFeedList.map((post: any) => (
          <MainPostCard key={post.feed_id} post={post} />
        ))}
      </PostListContainer>
    </Wrap>
  );
};
export default MainPage;

const Wrap = styled.div`
  margin: auto;
  position: relative;
  /* padding-top: 10vh; */
  /* width: 1440px;
  /* margin-top: 12vh; */
`;

const Backgr = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 370px;
  font-size: 50px;
  justify-content: center;
  left: 0;
  right: 0;
  border-radius: 0 0 0 250px;
  padding-top: 10vh;
  background-color: #644eee;

  @media screen and (max-width: 800px) {
    font-size: 1.5em;
    text-align: center;
    flex-direction: column;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  margin: auto;
  gap: 150px;

  .gathered {
    margin-top: 10px;
    color: white;
  }
  @media screen and (max-width: 800px) {
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 23px;
    gap: 70px;
    .gathered {
      flex-direction: row;
      margin: auto;

      .div {
      }
    }
  }
`;

const MbtiTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 90px;
  color: #644eee;
  border-radius: 50px;
  background-color: white;
  font-weight: 500;

  @media screen and (max-width: 800px) {
    justify-content: center;
    /* margin-left: 15%; */
    width: 120px;
    height: 50px;
    margin: auto;
  }
`;

const MbtiTitle = styled.div`
  margin-left: 55px;
  .div {
    font-size: 10px;
  }
  @media screen and (max-width: 412px) {
    /* justify-content: center; */
    /* margin-left: 5%; */
    width: 100%;
    /* height: 100%; */
  }
`;

const PostListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15vh;
  justify-content: center;
  gap: 25px;
  border: 5px soild red;

  @media screen and (max-width: 412px) {
    flex-direction: column;
    justify-content: center;
  }
`;
