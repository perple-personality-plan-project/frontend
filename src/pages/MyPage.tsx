import React from 'react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import NaviBar from '../components/Header';

function MyPage() {
  const [myFeed, setMyFeed] = useState([]);
  const [toGoList, setToGoList] = useState([]);
  const [dibs, setDibs] = useState([]);

  const [dataSource, setDataSource] = useState(Array.from({ length: 4 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    setTimeout(() => {
      setDataSource(dataSource.concat(Array.from({ length: 4 })));
    }, 1000);
  };
  var element = document.getElementsByClassName('infinite-scroll-component ');
  console.log(element);
  return (
    <Container>
      <NaviBar></NaviBar>
      <Banner src="data:image/jpeg;base64,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"></Banner>
      <Profile>
        <Mbti>ENTJ</Mbti>
        <Image src="https://blog.kakaocdn.net/dn/bw32S0/btqz1LaRxRm/xUvL2Kd0ygXyAY1T254un0/img.png"></Image>
        <Name>홍길동님</Name>
        <Edit>내프로필 편집하기</Edit>
        <Box>
          <ProfileBox>
            <FeedType>피드</FeedType>
            <FeedNum>7</FeedNum>
          </ProfileBox>
          <ProfileBox>
            <FeedType>list</FeedType>
            <FeedNum>7</FeedNum>
          </ProfileBox>
          <ProfileBox>
            <FeedType>찜</FeedType>
            <FeedNum>7</FeedNum>
          </ProfileBox>
          <ProfileBox>
            <FeedType>팔로워</FeedType>
            <FeedNum>7</FeedNum>
          </ProfileBox>
          <ProfileBox>
            <FeedType>팔로잉</FeedType>
            <FeedNum>7</FeedNum>
          </ProfileBox>
          <ProfileBox>
            <FeedType>그룹</FeedType>
            <FeedNum>7</FeedNum>
          </ProfileBox>
        </Box>
      </Profile>
      <FeedContainer>
        <BtnComp>
          <MyFeedBtn>마이피드</MyFeedBtn>
          <MyFeedBtn>to-go list</MyFeedBtn>
          <MyFeedBtn>찜</MyFeedBtn>
        </BtnComp>
        <FeedBox>
          <InfiniteScroll
            dataLength={dataSource.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<p>loading...</p>}
            style={{ overflow: 'none' }}
          >
            {dataSource.map((item, index) => {
              return (
                <Feed>
                  <Address>왕십리🏃</Address>
                </Feed>
              );
            })}
          </InfiniteScroll>
        </FeedBox>
        <AddPostBtn>+</AddPostBtn>
      </FeedContainer>
    </Container>
  );
}

const Container = styled.div`
  //css cover whole page
  width: 100%;
  height: 100vh;
  position: relative;
`;
const Banner = styled.img`
  width: 100%;
  height: 30vh;
  background-color: #f3f3f3;
  position: absolute;
`;
const Profile = styled.div`
  width: 450px;
  height: 600px;
  background-color: #f3f3f3;
  position: absolute;
  margin-top: 10vh;
  margin-left: 80px;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 412px) {
    margin-top: 200px;
    margin-left: 5%;
    width: 90%;
  }
  @media (max-width: 390px) {
    margin-top: 200px;
    margin-left: 5%;
  }
`;

const Image = styled.img`
  width: 130px;
  height: 130px;
  background-color: #f3f3f3;
  margin-top: 30px;
  margin-left: 160px;
  border: solid #e6e6e6 1px;
  border-radius: 50%;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 412px) {
    margin-left: 34%;
  }
`;
const Mbti = styled.div`
  position: absolute;
  text-align: center;
  margin-left: 184px;
  margin-top: 140px;
  font-size: 20px;
  width: 80px;
  height: 25px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 412px) {
    margin-left: 41%;
  }
`;
const Name = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 30px;
`;
const Edit = styled.button`
  display: block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  height: 35px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  font-size: 20px;
  &:hover {
    background-color: #e6e6e6;
  }
  @media (max-width: 390px) {
    width: 300px;
  }
`;
const Box = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;
const ProfileBox = styled.div`
  display: inline-block;
  margin-top: 25px;
  margin-left: 20px;
  width: 120px;
  height: 120px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 412px) {
    width: 100px;
    height: 100px;
    margin-left: 15px;
  }
  @media (max-width: 390px) {
    margin-left: 11px;
  }
`;
const FeedType = styled.div`
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 20px;
`;

const FeedNum = styled.div`
  position: absolute;
  margin-top: 70px;
  margin-left: 80px;
  font-size: 30px;
  @media (max-width: 412px) {
    margin-top: 60px;
    margin-left: 70px;
  }
`;

const FeedContainer = styled.div`
  margin-left: 40px;
  @media (max-width: 412px) {
    margin-left: 0px;
  }
  @media (max-width: 390px) {
    margin-left: -10px;
  }
`;
const BtnComp = styled.div`
  //css center of page
  display: block;
  margin-top: 320px;
  margin-left: 550px;
  width: 1000px;
  height: 30px;
  @media (max-width: 1120px) {
    margin-top: 720px;
    margin-left: 20px;
  }
  @media (max-width: 412px) {
    margin-top: 820px;
  }
`;
const MyFeedBtn = styled.button`
  //css center of page
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  width: 150px;
  height: 40px;
  background-color: #ffffff;
  border: solid #d9d9d9 2px;
  border-radius: 15px;
  font-size: 15px;
  &:hover {
    background-color: #e6e6e6;
  }
  @media (max-width: 412px) {
    width: 110px;
    height: 40px;
  }
`;

const FeedBox = styled.div`
  //css box append 2 row
  display: inline-block;
  margin-top: 50px;
  margin-left: 540px;
  width: 70%;
  height: 1200px;
  @media (max-width: 1120px) {
    margin-left: 0px;
  }
`;
const Address = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 340px;
  font-size: 20px;
  width: 150px;
  height: 40px;
  background-color: #d9d9d9;
  border: solid #d9d9d9 2px;
  border-radius: 15px;
  position: absolute;
  @media (max-width: 412px) {
    margin-top: 20px;
    margin-left: 190px;
    width: 140px;
    height: 30px;
  }
`;
const Feed = styled.div`
  //css append row
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  width: 40%;
  min-width: 500px;
  height: 40%;
  min-height: 500px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  //css front of page
  @media (max-width: 412px) {
    min-width: 350px;
    height: 20%;
    min-height: 350px;
    margin-left: 30px;
  }
`;
const AddPostBtn = styled.button`
  position: fixed;
  bottom: 5%;
  right: 15%;
  background-color: #565656;
  color: white;
  border: #565656;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  font-size: 50px;
  &:hover {
    background-color: #5a4545;
  }
  @media (max-width: 412px) {
    position: fixed;
    right: 65%;
    bottom: 50%;
  }
`;

export default MyPage;
