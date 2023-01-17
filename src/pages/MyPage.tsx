import React from 'react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';

import styled from 'styled-components';
import NaviBar from '../components/Header';

interface IAppState {
  show: boolean;
}

function MyPage() {
  const [myFeed, setMyFeed] = useState(true);
  const [toGoList, setToGoList] = useState(false);
  const [dibs, setDibs] = useState(false);
  const [myGroup, setMyGroup] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);

  const [dataSource, setDataSource] = useState(Array.from({ length: 4 }));
  const [hasMore, setHasMore] = useState(true);
  const [Modals, setModals] = useState(true);

  const navigate = useNavigate();

  // toggle show hide function
  const feedShow = () => {
    setMyFeed(true);
    setToGoList(false);
    setDibs(false);
    setMyGroup(false);
  };
  const togoShow = () => {
    setToGoList(true);
    setMyFeed(false);
    setDibs(false);
    setMyGroup(false);
  };
  const dibsShow = () => {
    setMyFeed(false);
    setToGoList(false);
    setDibs(true);
    setMyGroup(false);
  };
  const myGroupShow = () => {
    setMyFeed(false);
    setToGoList(false);
    setDibs(false);
    setMyGroup(true);
  };
  const profileEditShow = () => {
    setProfileEdit(!profileEdit);
  };
  const fetchMoreData = () => {
    setTimeout(() => {
      setDataSource(dataSource.concat(Array.from({ length: 4 })));
    }, 1000);
  };
  var element = document.getElementsByClassName('infinite-scroll-component ');

  return (
    <Container>
      <NaviBar></NaviBar>
      <Banner src=""></Banner>
      <Profile>
        <Mbti show={profileEdit}>ENTJ</Mbti>
        <MbtiInput show={profileEdit} />
        <Image src="https://blog.kakaocdn.net/dn/bw32S0/btqz1LaRxRm/xUvL2Kd0ygXyAY1T254un0/img.png"></Image>
        <Retest onClick={() => navigate(`/mbti`)}>다시 검사하기▷</Retest>
        <Name show={profileEdit}>홍길동님</Name>
        <NameInput show={profileEdit} />
        <Edit onClick={profileEditShow}>내프로필 편집하기</Edit>
        <Box>
          <ProfileBox>
            <FeedNum>7</FeedNum>
            <FeedType>피드</FeedType>
          </ProfileBox>
          <ProfileBox>
            <FeedNum>7</FeedNum>
            <FeedType>list</FeedType>
          </ProfileBox>
          <ProfileBox>
            <FeedNum>7</FeedNum>
            <FeedType>찜</FeedType>
          </ProfileBox>
          <ProfileBox>
            <FeedNum>7</FeedNum>
            <FeedType>팔로워</FeedType>
          </ProfileBox>
        </Box>
      </Profile>
      <FeedContainer>
        <BtnComp>
          <MyFeedBtn onClick={feedShow}>마이피드</MyFeedBtn>
          <MyFeedBtn onClick={togoShow}>to-go list</MyFeedBtn>
          <MyFeedBtn onClick={dibsShow}>찜</MyFeedBtn>
          <MyFeedBtn onClick={myGroupShow}>그룹</MyFeedBtn>
        </BtnComp>
        <FeedBox>
          <MyFeed show={myFeed}>
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
                    <PostImage src={require('../전주맛집.jpg')} />
                    <TopGradation></TopGradation>
                    <Address>전주🏃</Address>
                    <Icon
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </Icon>
                    <PlaceNum>5</PlaceNum>
                  </Feed>
                );
              })}
            </InfiniteScroll>
          </MyFeed>
          <ToGoList show={toGoList}>
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
                    <PostImage src={require('../전주맛집.jpg')} />
                    <TopGradation></TopGradation>
                    <Address>대구🏃</Address>
                    <Icon
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </Icon>
                    <PlaceNum>5</PlaceNum>
                  </Feed>
                );
              })}
            </InfiniteScroll>
          </ToGoList>
          <DibsList show={dibs}>
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
                    <PostImage src={require('../전주맛집.jpg')} />
                    <TopGradation></TopGradation>
                    <Address>대전🏃</Address>
                    <Icon
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </Icon>
                    <PlaceNum>5</PlaceNum>
                  </Feed>
                );
              })}
            </InfiniteScroll>
          </DibsList>
          <MyGroupList show={myGroup}>
            <InfiniteScroll
              dataLength={dataSource.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<p>loading...</p>}
              style={{ overflow: 'none' }}
            >
              {dataSource.map((item, index) => {
                return (
                  <GroupFeed onClick={() => navigate(`/${index + 1}`)}>
                    <GroupProfile
                      src={require('../빡빡이1.png')}
                      alt="group-img"
                    />{' '}
                    <Title>전시에 미친 사람들</Title>
                    <Description>
                      전시 카페 정보를 공유하는 그룹 입니다.
                    </Description>
                  </GroupFeed>
                );
              })}
            </InfiniteScroll>
          </MyGroupList>
        </FeedBox>
        <AddPostBtn>+</AddPostBtn>
      </FeedContainer>
    </Container>
  );
}

const Container = styled.div`
  //css cover whole page
  width: 100%;
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
  height: 420px;
  background-color: #ffffff;
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
const Retest = styled.a`
  text-decoration: underline;
`;

const Mbti = styled.div<IAppState>`
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
  display: ${props => (props.show ? 'none' : '')};
  @media (max-width: 412px) {
    margin-left: 41%;
  }
`;

const MbtiInput = styled.input<IAppState>`
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
  display: ${props => (props.show ? 'flex' : 'none')};
`;
const Name = styled.div<IAppState>`
  text-align: center;
  margin-top: 10px;
  font-size: 30px;
  display: ${props => (props.show ? 'none' : '')};
`;
const NameInput = styled.input<IAppState>`
  text-align: center;
  width: 200px;
  margin-top: 10px;
  font-size: 30px;
  margin-left: 125px;
  display: ${props => (props.show ? 'flex' : 'none')};
`;

const Edit = styled.button`
  display: block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  height: 35px;
  background-color: #f2f2f2;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  font-size: 20px;
  &:hover {
    background-color: #e6e6e6;
  }
  @media (max-width: 390px) {
    width: 300px;
  }
`;
const Box = styled.div`
  margin-left: 55px;
`;
const ProfileBox = styled.div`
  display: inline-block;
  margin-top: 25px;
  width: 80px;
  height: 80px;
  @media (max-width: 412px) {
    width: 60px;
    height: 100px;
    margin-top: -20px;
  }
`;
const FeedType = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d9d9d9;
  font-weight: bold;
`;

const FeedNum = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: #d9d9d9;
  @media (max-width: 412px) {
    margin-top: 60px;
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
  width: 60%;
  min-width: 440px;
  height: 30px;
  @media (max-width: 1120px) {
    margin-top: 550px;
    margin-left: 40px;
  }
  @media (max-width: 412px) {
    margin-top: 650px;
    margin-left: 15px;
    min-width: 380px;
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
  @media (max-width: 1120px) {
    width: 100px;
    height: 40px;
  }
  @media (max-width: 412px) {
    width: 80px;
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

//modal
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//modal content
const ModalContent = styled.div`
  width: 60%;
  height: 70%;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
`;
const ModalCloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  border: none;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #d9d9d9;
  }
`;
//modal image
const ModalImage = styled.img`
  width: 60%;
  height: 100%;
  object-fit: cover;
  background-color: black;
  float: left;
  border-radius: 15px;
`;

const MyFeed = styled.div<IAppState>`
  display: ${props => (props.show ? 'flex' : 'none')};
`;
const ToGoList = styled.div<IAppState>`
  display: ${props => (props.show ? 'flex' : 'none')};
`;
const DibsList = styled.div<IAppState>`
  display: ${props => (props.show ? 'flex' : 'none')};
`;
const MyGroupList = styled.div<IAppState>`
  display: ${props => (props.show ? 'flex' : 'none')};
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

  z-index: 1;
  @media (max-width: 412px) {
    margin-top: 20px;
    margin-left: 190px;
    width: 140px;
    height: 30px;
  }
`;
const TopGradation = styled.div`
  display: inline-block;
  margin-top: 0px;
  margin-left: 0px;
  width: 520px;
  height: 100px;
  border-radius: 15px;
  background: linear-gradient(180deg, #272121 0%, rgba(0, 0, 0, 0) 50%);
  position: absolute;
  z-index: 1;
`;
const Icon = styled.svg`
  margin-top: 10px;
  margin-left: 10px;
  position: absolute;
  z-index: 2;
`;
const PlaceNum = styled.div`
  display: inline-block;
  margin-top: 10px;
  margin-left: 60px;
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  z-index: 1;
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
  @media (max-width: 412px) {
    min-width: 350px;
    height: 20%;
    min-height: 350px;
    margin-left: 30px;
  }
`;
const PostImage = styled.img`
  position: absolute;
  z-index: 1;
  display: inline-block;
  width: 520px;
  height: 500px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  background-size: cover;
  @media (max-width: 412px) {
    width: 350px;
    height: 350px;
  }
`;

const GroupFeed = styled.div`
  //css append row
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  width: 800px;
  height: 200px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 1120px) {
    width: 500px;
  }
  @media (max-width: 412px) {
    width: 120%;
    height: 120px;
  }
`;

const GroupProfile = styled.img`
  //css left middle
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  width: 150px;
  height: 150px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 10px;
  @media (max-width: 412px) {
    width: 25%;
    height: 80px;
  }
`;
const Title = styled.div`
  //css append row
  display: inline-block;
  margin-left: 40px;
  position: absolute;
  margin-top: 60px;
  font-size: 25px;
  font-weight: bold;
  @media (max-width: 412px) {
    font-size: 15px;
    margin-top: 40px;
    margin-left: 20px;
  }
`;
const Description = styled.div`
  display: inline-block;
  margin-left: 40px;
  position: absolute;
  margin-top: 110px;
  font-size: 15px;
  @media (max-width: 412px) {
    font-size: 10px;
    margin-top: 70px;
    margin-left: 20px;
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
  z-index: 1;
  &:hover {
    background-color: #5a4545;
  }
  @media (max-width: 412px) {
    right: 15%;
    bottom: 15%;
  }
`;

export default MyPage;
