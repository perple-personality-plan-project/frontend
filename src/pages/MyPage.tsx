import React, { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/hooks/typescripthook/hooks';

import {
  __getMyProfile,
  __myFeed,
  __myGroupList,
  __getMap,
  __updateProfile,
  __getPicked,
  __profilePic,
  __backgroundpic,
  __modalData,
} from '../redux/modules/mySlice';
import FeedModal from '../components/modal/MyFeedCreateModal';
import { __Togo } from '../redux/modules/mySlice';
import FeedDetailModal from '../components/modal/FeedDetailModal';
import { __modalOpen } from '../redux/modules/mySlice';
import Navbar from '../components/Navbar';
interface IAppState {
  show: boolean;
}

function MyPage() {
  const dispatch = useAppDispatch();

  const [myFeed, setMyFeed] = useState(true);
  const [toGoList, setToGoList] = useState(false);
  const [dibs, setDibs] = useState(false);
  const [myGroup, setMyGroup] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);

  const [dataSource, setDataSource] = useState(Array.from({ length: 4 }));
  const [hasMore, setHasMore] = useState(true);
  const [Modals, setModals] = useState(true);

  const [MBTI, setMBTI] = useState(false);
  const [nickName, setnickName] = useState(false);
  const onChangeMBTI = (e: any) => {
    setMBTI(e);
  };

  const onChangeNickName = (e: any) => {
    setnickName(e);
  };

  const profileInfo = useAppSelector((store: any) => store.mypage.profileInfo);
  const myfeed = useAppSelector((store: any) => store.mypage.myFeed);
  const myGroupList = useAppSelector((store: any) => store.mypage.myGroupList);
  const mapList = useAppSelector((store: any) => store.mypage.maplist);
  const myPick = useAppSelector((store: any) => store.mypage.myPick);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await dispatch(__getMyProfile());
    await dispatch(__myGroupList());
    await dispatch(__getMap());
    await dispatch(__getPicked());
    await dispatch(__myFeed());
    await mapListParser();
  };

  const mapListParser = () => {
    let mapJson = [];
    for (let i = 0; i < mapList.length; i++) {
      mapJson.push(JSON.parse(mapList[i].place_group));
    }
    return mapJson;
  };

  //dispatch __updateProfile
  const updateProfile = async (e: any) => {
    e.preventDefault();

    const patchProfile = {
      nickname: nickName,
      mbti: MBTI,
    };
    await dispatch(__updateProfile(patchProfile));
    await dispatch(__getMyProfile());
    setProfileEdit(false);
  };

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
  const profileEditShow = (e: any) => {
    e.preventDefault();

    setProfileEdit(true);
  };
  const fetchMoreData = () => {
    setTimeout(() => {
      setDataSource(dataSource.concat(Array.from({ length: 4 })));
    }, 1000);
  };
  var element = document.getElementsByClassName('infinite-scroll-component ');

  //dispatch __letsGo
  const letsGo = async (letsgo: any) => {
    await dispatch(__Togo(letsgo));
    await navigate('/togolist');
  };

  const onChangeBanner = async (e: any) => {
    const formData = new FormData();
    await formData.append('profile', e.target.files[0]);

    await dispatch(__backgroundpic(formData));
    await dispatch(__getMyProfile());
  };

  const onChangeProfile = async (e: any) => {
    const formData = new FormData();
    await formData.append('profile', e.target.files[0]);

    await dispatch(__profilePic(formData));
    await dispatch(__getMyProfile());
  };

  const modalOpen = async (e: any) => {
    await dispatch(__modalOpen(true));
    await dispatch(__modalData(e));
  };
  const token = localStorage.getItem('accessToken');

  if (token === null) {
    return (
      <Container>
        <Navbar />
        <Banner>
          <label htmlFor="banner">
            {profileInfo?.map((item: any) => {
              return (
                <div>
                  <img
                    src={
                      profileInfo[0].background_img === null
                        ? require('../defaultbanner.jpg')
                        : process.env.REACT_APP_IMG_SERVER +
                          profileInfo[0].background_img
                    }
                  />
                </div>
              );
            })}
          </label>
          <input
            type="file"
            id="banner"
            accept="image/jpg, image/png, image/jpeg"
            onChange={e => onChangeBanner(e)}
          />
        </Banner>
        <Profile>
          <LoginRequire onClick={() => navigate(`/signin`)}>
            로그인이 필요합니다
          </LoginRequire>
        </Profile>
        <FeedContainer>
          <BtnComp>
            <MyFeedBtn show={myFeed} onClick={feedShow}>
              마이피드
            </MyFeedBtn>
            <MyFeedBtn show={toGoList} onClick={togoShow}>
              to-go list
            </MyFeedBtn>
            <MyFeedBtn show={dibs} onClick={dibsShow}>
              찜
            </MyFeedBtn>
            <MyFeedBtn show={myGroup} onClick={myGroupShow}>
              그룹
            </MyFeedBtn>
          </BtnComp>
          <FeedBox></FeedBox>
          <FeedModal />
        </FeedContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <Navbar />
        <Banner>
          <label htmlFor="banner">
            {profileInfo?.map((item: any) => {
              return (
                <div>
                  <img
                    src={
                      profileInfo[0].background_img === null
                        ? require('../defaultbanner.jpg')
                        : process.env.REACT_APP_IMG_SERVER +
                          profileInfo[0].background_img
                    }
                  />
                </div>
              );
            })}
          </label>
          <input
            type="file"
            id="banner"
            accept="image/jpg, image/png, image/jpeg"
            onChange={e => onChangeBanner(e)}
          />
        </Banner>
        <Profile>
          {profileInfo?.map((item: any) => {
            return (
              <div>
                <Mbti show={profileEdit}>{item.mbti}</Mbti>
                <form onSubmit={updateProfile}>
                  <MbtiInput
                    onChange={e => onChangeMBTI(e.target.value)}
                    show={profileEdit}
                    required
                    pattern="^(intj|infj|infj|intj|istp|isfp|infp|intp|estp|esfp|enfp|entp|estj|esfj|enfj|entj)$"
                    onInvalid={e =>
                      (e.target as HTMLInputElement).setCustomValidity(
                        'MBTI를 올바르게 입력해 주세요',
                      )
                    }
                    onInput={e =>
                      (e.target as HTMLInputElement).setCustomValidity('')
                    }
                  />
                  <Image>
                    <label htmlFor="profile">
                      <div>
                        <img
                          src={
                            item.profile_img === null
                              ? require('../defaultprofile.png')
                              : process.env.REACT_APP_IMG_SERVER +
                                item.profile_img
                          }
                        />
                      </div>
                    </label>
                    <input
                      type="file"
                      id="profile"
                      accept="image/jpg, image/png, image/jpeg"
                      onChange={e => onChangeProfile(e)}
                    />
                  </Image>
                  <Retest onClick={() => navigate(`/mbti`)}>
                    다시 검사하기▷
                  </Retest>
                  <Name show={profileEdit}>{item.nickname}</Name>
                  <NameInput
                    onChange={e => onChangeNickName(e.target.value)}
                    show={profileEdit}
                    required
                    pattern="^[가-힣]{2,8}$"
                    onInvalid={e =>
                      (e.target as HTMLInputElement).setCustomValidity(
                        '2글자 이상 8글자 이하 한국어만 가능',
                      )
                    }
                    onInput={e =>
                      (e.target as HTMLInputElement).setCustomValidity('')
                    }
                  />
                  <Edit show={profileEdit} onClick={profileEditShow}>
                    내프로필 편집하기
                  </Edit>
                  <Editsend show={profileEdit}>편집하기</Editsend>
                </form>
                <Box>
                  <ProfileBox>
                    <FeedNum>{item.feeds_cnt}</FeedNum>
                    <FeedType>피드</FeedType>
                  </ProfileBox>
                  <ProfileBox>
                    <FeedNum>{item.routes_cnt}</FeedNum>
                    <FeedType>To-go</FeedType>
                  </ProfileBox>
                  <ProfileBox>
                    <FeedNum>{item.picks_cnt}</FeedNum>
                    <FeedType>찜</FeedType>
                  </ProfileBox>
                  <ProfileBox>
                    <FeedNum>{item.groups_cnt}</FeedNum>
                    <FeedType>그룹</FeedType>
                  </ProfileBox>
                </Box>
              </div>
            );
          })}
        </Profile>
        <FeedContainer>
          <BtnComp>
            <MyFeedBtn show={myFeed} onClick={feedShow}>
              마이피드
            </MyFeedBtn>
            <MyFeedBtn show={toGoList} onClick={togoShow}>
              to-go list
            </MyFeedBtn>
            <MyFeedBtn show={dibs} onClick={dibsShow}>
              찜
            </MyFeedBtn>
            <MyFeedBtn show={myGroup} onClick={myGroupShow}>
              그룹
            </MyFeedBtn>
          </BtnComp>
          <FeedBox>
            <MyFeed show={myFeed}>
              {myfeed?.map((item: any, index: number) => {
                return (
                  <Feed key={index}>
                    <PostImage
                      src={
                        process.env.REACT_APP_IMG_SERVER +
                        item.thumbnail.split(',')[0]
                      }
                      onClick={() => {
                        modalOpen(item);
                      }}
                    />
                    <Address>{item.mbti}🏃</Address>
                    <FeedDetailModal post={item}></FeedDetailModal>
                  </Feed>
                );
              })}
            </MyFeed>
            <ToGoList show={toGoList}>
              {mapList.map((item: any, index: number) => {
                return (
                  <ToGoFeed
                    key={index}
                    onClick={() => letsGo(JSON.parse(item.place_group))}
                  >
                    <ToGoAddress>
                      <div>{item.place_group_name}</div>
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        color="#644EEE"
                        fill="currentColor"
                        className="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </Icon>
                      <PlaceNum>{JSON.parse(item.place_group).length}</PlaceNum>
                    </ToGoAddress>
                    <TogoIcons>
                      <TogoShow>
                        {JSON.parse(item.place_group).map((item: any) => {
                          return (
                            <TogoContainer>
                              <SideIcon
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                color="#644EEE"
                                fill="currentColor"
                                className="bi bi-geo-alt-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                              </SideIcon>
                              <TogoText>{item.place_name}</TogoText>
                            </TogoContainer>
                          );
                        })}
                      </TogoShow>
                    </TogoIcons>
                  </ToGoFeed>
                );
              })}
            </ToGoList>
            <DibsList show={dibs}>
              {myPick?.map((item: any, index: number) => {
                return (
                  <Feed key={index}>
                    <PostImage
                      src={
                        process.env.REACT_APP_IMG_SERVER +
                        item.thumbnail.split(',')[0]
                      }
                      onClick={() => {
                        modalOpen(item);
                      }}
                    />
                    {/* <TopGradation></TopGradation> */}
                    <Address>{item.mbti}🏃</Address>
                    <FeedDetailModal post={item}></FeedDetailModal>
                  </Feed>
                );
              })}
            </DibsList>
            <MyGroupList show={myGroup}>
              {myGroupList?.map((item: any, index: any) => {
                return (
                  <GroupFeed
                    key={index}
                    onClick={() => navigate(`/${item.group_id}`)}
                  >
                    <GroupProfile
                      src={process.env.REACT_APP_IMG_SERVER + item.thumbnail}
                      alt="group-img"
                    />
                    <Title>{item.group_name}</Title>
                    <Description>{item.description}</Description>
                  </GroupFeed>
                );
              })}
            </MyGroupList>
          </FeedBox>
          <FeedModal />
        </FeedContainer>
      </Container>
    );
  }
}
const LoginRequire = styled.button`
  //로그인 필요
  width: 100%;
  height: 200px;
  margin-top: 30%;
  background-color: #f3f3f3;
  border: none;
  font-size: 40px;
  font-weight: 600;
  color: #644eee;
  cursor: pointer;
  //css middle of the page
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  //css cover whole page
  width: 100%;
  position: relative;
`;
const Banner = styled.div`
  width: 100%;
  height: 30vh;
  background-color: #f3f3f3;
  position: absolute;
  img {
    //background image
    width: 100%;
    height: 290px;
    object-fit: cover;
  }
  label {
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
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

const Image = styled.div`
  width: 130px;
  height: 130px;
  background-color: #f3f3f3;
  margin-top: 30px;
  margin-left: 160px;
  border: solid #e6e6e6 1px;
  border-radius: 50%;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
  img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    z-index: 100;
    object-fit: cover;
  }
  label {
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    z-index: 100;
  }
  @media (max-width: 412px) {
    margin-left: 34%;
  }
`;
const Retest = styled.a`
  text-decoration: underline;
  margin-left: 300px;
`;

const Mbti = styled.div<IAppState>`
  position: absolute;
  text-align: center;
  margin-left: 184px;
  margin-top: 110px;
  font-size: 20px;
  width: 80px;
  height: 30px;
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
  margin-top: 110px;
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

const Edit = styled.button<IAppState>`
  display: ${props => (props.show ? 'none' : 'block')};
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

const Editsend = styled.button<IAppState>`
  display: ${props => (props.show ? 'block' : 'none')};
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
const MyFeedBtn = styled.button<IAppState>`
  //css center of page
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  width: 150px;
  height: 40px;
  background-color: #ffffff;
  border: ${props => (props.show ? 'solid #644eee 2px' : 'solid #DEDEDE 2px')};
  border-radius: 15px;
  font-size: 15px;
  z-index: 200;
  &:hover {
    border: solid #644eee 2px;
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

const MyFeed = styled.div<IAppState>`
  display: ${props => (props.show ? 'inline-block' : 'none')};
`;
const ToGoList = styled.div<IAppState>`
  display: ${props => (props.show ? 'inline-block' : 'none')};
`;
const DibsList = styled.div<IAppState>`
  display: ${props => (props.show ? 'inline-block' : 'none')};
`;
const MyGroupList = styled.div<IAppState>`
  display: ${props => (props.show ? 'inline-block' : 'none')};
`;
const Address = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 220px;
  font-size: 15px;
  width: 100px;
  height: 30px;
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
const ToGoAddress = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 25px;
  font-weight: bold;
  width: 350px;
  height: 40px;
  position: absolute;

  z-index: 1;
  @media (max-width: 412px) {
    margin-top: 20px;
    margin-left: 190px;
    width: 140px;
    height: 30px;
  }
`;
const TogoIcons = styled.div`
  border-top: solid #d9d9d9 2px;
  height: 200px;
  width: 90%;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
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
  margin-left: 400px;
  position: absolute;
  z-index: 2;
`;
const TogoShow = styled.div`
  z-index: 100;
`;
const TogoContainer = styled.div``;

const SideIcon = styled.svg`
  margin-top: 12px;
`;

const TogoText = styled.div`
  display: inline-block;
  position: absolute;
  margin-top: 14px;
  margin-left: 10px;
`;

const PlaceNum = styled.div`
  display: inline-block;
  margin-left: 440px;
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
  width: 35%;
  min-width: 350px;
  height: 40%;
  min-height: 350px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 1120px) {
    margin-left: 90px;
  }
  @media (max-width: 412px) {
    min-width: 350px;
    height: 20%;
    min-height: 350px;
    margin-left: 30px;
  }
`;

const ToGoFeed = styled.div`
  //css append row
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  width: 40%;
  min-width: 500px;
  height: 300px;
  border: solid #d9d9d9 1px;
  border-radius: 15px;
  @media (max-width: 412px) {
    min-width: 350px;
    height: 20%;
    min-height: 350px;
    margin-left: 30px;
  }
`;
const TogoBox = styled.div`
  //css append column
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
  width: 350px;
  height: 350px;
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

export default MyPage;
