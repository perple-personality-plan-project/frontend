import React, { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

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
  __Togo,
  __modalOpen,
  __togoDelete,
} from '../redux/modules/mySlice';
import FeedModal from '../components/modal/MyFeedCreateModal';
import FeedDetailModal from '../components/modal/FeedDetailModal';
import Navbar from '../components/Navbar';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/hooks/typescripthook/hooks';
import { __mainFeedDetail } from '../redux/modules/postSlice';
import MyPickModal from '../components/modal/MyPickModal';
interface IAppState {
  show: boolean;
}

function MyPage() {
  const dispatch = useAppDispatch();

  const profileInfo = useAppSelector((store: any) => store.mypage.profileInfo);
  const myfeed = useAppSelector((store: any) => store.mypage.myFeed);
  const myGroupList = useAppSelector((store: any) => store.mypage.myGroupList);
  const mapList = useAppSelector((store: any) => store.mypage.maplist);
  const myPick = useAppSelector((store: any) => store.mypage.myPick);
  const userId = sessionStorage.getItem('userId');

  const [myFeed, setMyFeed] = useState(true);
  const [toGoList, setToGoList] = useState(false);
  const [dibs, setDibs] = useState(false);
  const [myGroup, setMyGroup] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [dataSource, setDataSource] = useState(Array.from({ length: 4 }));
  const [hasMore, setHasMore] = useState(true);
  const [Modals, setModals] = useState(true);
  const [MBTI, setMBTI] = useState(profileInfo[0]?.mbti);
  const [nickName, setnickName] = useState(profileInfo[0]?.nickname);
  const [isOpen, setIsOpen] = useState(false);
  const [isPickModalOpen, setIsPickModalOpen] = useState(false);

  const onChangeMBTI = (e: any) => {
    setMBTI(e);
  };

  const onChangeNickName = (e: any) => {
    setnickName(e);
  };

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
    sessionStorage.setItem('mbti', MBTI.toUpperCase());
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
    dispatch(__getMyProfile());
    setMBTI(profileInfo[0]?.mbti);
    setnickName(profileInfo[0]?.nickname);
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

  const modalClose = async (e: any) => {
    setIsOpen(false);
  };

  const pickModal = async (e: any) => {
    setIsPickModalOpen(!isPickModalOpen);
  };

  const modalOpen = async (e: any) => {
    setIsOpen(true);
    await dispatch(__modalData(e));
    await dispatch(__mainFeedDetail({ feedId: e.feed_id, userId: userId }));
  };

  const modalPickOpen = async (e: any) => {
    setIsPickModalOpen(!isPickModalOpen);
    await dispatch(__modalData(e));
    await dispatch(__mainFeedDetail({ feedId: e.feed_id, userId: userId }));
  };
  const token = sessionStorage.getItem('accessToken');
  const deleteTogo = async (mapId: number) => {
    await dispatch(__togoDelete(mapId));
    await dispatch(__getMap());
    await dispatch(__getMyProfile());
  };

  if (token === null) {
    return (
      <Container>
        <Navbar />
        <Banner>
          <label htmlFor="banner">
            {profileInfo?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <img
                    src={
                      profileInfo[0].background_img === null
                        ? require('../gray.png')
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
                        ? require('../gray.png')
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
          {profileInfo?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <Mbti show={profileEdit}>{item.mbti}</Mbti>
                <form onSubmit={updateProfile}>
                  <MbtiInput
                    onChange={e => onChangeMBTI(e.target.value.toUpperCase())}
                    show={profileEdit}
                    required
                    defaultValue={item.mbti}
                    pattern="^(istj|isfj|infj|intj|istp|isfp|infp|intp|estp|esfp|enfp|entp|estj|esfj|enfj|entj|ISTJ|ISFJ|INFJ|INTJ|ISTP|ISFP|INFP|INTP|ESTP|ESFP|ENFP|ENTP|ESTJ|ESFJ|ENFJ|ENTJ)$"
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
                              ? require('../마이페이지.png')
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
                    defaultValue={item.nickname}
                    pattern="^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$"
                    onInvalid={e =>
                      (e.target as HTMLInputElement).setCustomValidity(
                        '2글자 이상 8글자 이하',
                      )
                    }
                    onInput={e =>
                      (e.target as HTMLInputElement).setCustomValidity('')
                    }
                  />
                  <Edit show={profileEdit} onClick={profileEditShow}>
                    내 프로필 편집하기
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
                    {JSON.parse(item.location).place_group_name === undefined ||
                    JSON.parse(item.location).place_group_name === '없음' ? (
                      <div></div>
                    ) : (
                      <Address>
                        {JSON.parse(item?.location).place_group_name} 🏃
                      </Address>
                    )}
                  </Feed>
                );
              })}
              <FeedDetailModal
                state={isOpen}
                close={modalClose}
              ></FeedDetailModal>
            </MyFeed>
            <ToGoList show={toGoList}>
              {mapList.map((item: any, index: number) => {
                return (
                  <ToGoFeed key={index}>
                    <ToGoAddress>
                      <TogoTitle
                        onClick={() => letsGo(JSON.parse(item.place_group))}
                      >
                        {item.place_group_name}
                      </TogoTitle>
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        color="#8979f5"
                        fill="currentColor"
                        className="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </Icon>
                      <PlaceNum>{JSON.parse(item.place_group).length}</PlaceNum>
                      <DeleteTogo onClick={() => deleteTogo(item.map_id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
                            fill="rgba(225,226,232,1)"
                          />
                        </svg>
                      </DeleteTogo>
                    </ToGoAddress>
                    <TogoIcons>
                      <TogoShow>
                        {JSON.parse(item.place_group).map(
                          (item: any, index: number) => {
                            return (
                              <TogoContainer key={index}>
                                <SideIcon
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
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
                          },
                        )}
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
                        modalPickOpen(item);
                      }}
                    />
                    {/* <TopGradation></TopGradation> */}
                    {JSON.parse(item.location).place_group_name === undefined ||
                    JSON.parse(item.location).place_group_name === '없음' ? (
                      <div></div>
                    ) : (
                      <Address>
                        {JSON.parse(item?.location).place_group_name} 🏃
                      </Address>
                    )}
                  </Feed>
                );
              })}
              <MyPickModal
                state={isPickModalOpen}
                close={pickModal}
              ></MyPickModal>
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
                    <Description>
                      게시글{item.feedCount}개/{item.group_user_count}명이
                      소통중이에요
                    </Description>
                    <HashBox>
                      {item.hashtags === null ? (
                        <NoTag>태그가 없습니다</NoTag>
                      ) : (
                        item.hashtags
                          .split(',')
                          .map((item: any, index: any) => {
                            return <HashTag key={index}>{item}</HashTag>;
                          })
                      )}
                    </HashBox>
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
  width: 429px;
  height: 444px;
  background-color: #ffffff;
  position: absolute;
  margin-top: 98px;
  margin-left: 80px;
  border: solid #d9d9d9 1px;
  border-radius: 15px;
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
  margin-left: 150px;
  border: solid #e6e6e6 1px;
  border-radius: 50%;
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
    margin-left: 32%;
  }
  @media (max-width: 390px) {
    margin-left: 31%;
  }
`;
const Retest = styled.a`
  text-decoration: underline;
  margin-left: 280px;
  bottom: 61%;
  position: absolute;
  font-family: 'Nanum_R';
  cursor: pointer;
  @media screen and (max-width: 390px) {
    margin-left: 240px;
    font-size: 15px;
  }
  @media screen and (max-width: 412px) {
    margin-left: 240px;
    font-size: 15px;
  }
`;

const Mbti = styled.div<IAppState>`
  position: absolute;
  text-align: center;
  margin-left: 174px;
  margin-top: 110px;
  //text center of the box (vertical)
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  width: 80px;
  height: 30px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  display: ${props => (props.show ? 'none' : '')};
  @media (max-width: 412px) {
    margin-left: 39%;
  }
  @media (max-width: 390px) {
    margin-left: 38%;
  }
`;

const MbtiInput = styled.input<IAppState>`
  position: absolute;
  text-align: center;
  margin-left: 174px;
  margin-top: 110px;
  font-size: 20px;
  width: 80px;
  height: 25px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  display: ${props => (props.show ? 'flex' : 'none')};
  @media (max-width: 390px) {
    margin-left: 130px;
  }
`;

const Name = styled.div<IAppState>`
  text-align: center;
  margin-top: 30px;
  font-size: 30px;
  display: ${props => (props.show ? 'none' : '')};
  font-family: 'Nanum_R';
  @media (max-width: 390px) {
  }
`;
const NameInput = styled.input<IAppState>`
  text-align: center;
  width: 200px;
  margin-top: 10px;
  font-size: 30px;
  margin-left: 115px;
  display: ${props => (props.show ? 'flex' : 'none')};
  @media (max-width: 390px) {
    margin-left: 75px;
  }
`;

const Edit = styled.button<IAppState>`
  display: ${props => (props.show ? 'none' : 'block')};
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 360px;
  height: 50px;
  background-color: #f2f2f8;
  border: solid #f6f6fa 1px;
  border-radius: 25px;
  font-family: 'Nanum_R';
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
  font-size: 13px;
  display: flex;
  margin-top: 3px;
  justify-content: center;
  align-items: center;
  color: #5b5b5b;
  font-weight: bold;
`;

const FeedNum = styled.div`
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: #5b5b5b;
  font-family: 'Nanum_L';
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
    margin-top: 570px;
    margin-left: 30px;
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
  background-color: ${props => (props.show ? ' #F6F7FA' : '#ffffff')};
  border: ${props => (props.show ? 'solid #644eee 2px' : 'solid #DEDEDE 2px')};
  border-radius: 20px;
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
  font-size: 15px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  margin-top: 18px;
  margin-right: 18px;
  width: fit-content;
  height: 30px;
  //background black tranclucent
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: #ffffff;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TogoTitle = styled.div`
  font-size: 22px;
  margin-left: 15px;
  cursor: pointer;
`;
const ToGoAddress = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 20px;
  font-size: 25px;
  font-weight: bold;
  width: 350px;
  height: 40px;
  position: absolute;
  z-index: 1;
  @media (max-width: 412px) {
    margin-top: 30px;
    margin-left: 20px;
    width: 200px;
    height: 30px;
  }
`;
const TogoIcons = styled.div`
  border-top: solid #d9d9d9 2px;
  height: 200px;
  width: 80%;
  margin-top: 80px;
  margin-left: 30px;
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
  margin-left: 275px;
  position: absolute;
  z-index: 2;
  @media (max-width: 412px) {
    margin-left: 240px;
  }
`;
const TogoShow = styled.div`
  z-index: 100;
  margin-top: 10px;
`;
const TogoContainer = styled.div`
  margin-top: -5px;
`;

const SideIcon = styled.svg`
  margin-top: 12px;
`;

const TogoText = styled.div`
  display: inline-block;
  position: absolute;
  margin-top: 15px;
  margin-left: 10px;
`;

const PlaceNum = styled.div`
  display: inline-block;
  margin-left: 310px;
  margin-top: 5px;
  font-size: 38px;
  font-weight: bold;
  position: absolute;
  font-family: 'Nanum_L';
  color: gray;
  z-index: 1;
  @media (max-width: 412px) {
    margin-left: 280px;
    font-size: 30px;
  }
`;

const DeleteTogo = styled.div`
  position: absolute;
  right: -25px;
  top: -20px;
  cursor: pointer;
  @media (max-width: 412px) {
    right: -120px;
  }
`;
const Feed = styled.div`
  //css append row
  display: inline-flex;
  justify-content: end;
  margin-top: 20px;
  margin-left: 20px;
  width: 35%;
  min-width: 350px;
  height: 40%;
  min-height: 350px;
  background-color: #f3f3f3;
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  @media (max-width: 1120px) {
    margin-left: 70px;
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
  display: inline-flex;
  margin-top: 20px;
  margin-left: 20px;
  width: 407px;
  height: 270px;
  border: solid #d9d9d9 1px;
  border-radius: 15px;
  @media (max-width: 412px) {
    width: 347px;
    height: 300px;
    height: 20%;
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
  border-radius: 10px;
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
  border: solid #e6e6e6 1px;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  @media (max-width: 1120px) {
    width: 500px;
  }
  @media (max-width: 412px) {
    width: 360px;
    height: 130px;
  }
  @media (max-width: 390px) {
    width: 350px;
    height: 130px;
    margin-left: 30px;
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
  margin-left: 30px;
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
  margin-left: 30px;
  position: absolute;
  margin-top: 110px;
  font-size: 15px;
  @media (max-width: 412px) {
    font-size: 10px;
    margin-top: 70px;
    margin-left: 20px;
  }
`;
const HashBox = styled.div`
  display: inline-block;
  margin-left: 15px;
  margin-top: -50px;
`;
const HashTag = styled.div`
  display: inline-block;
  font-size: 15px;
  width: fit-content;
  height: 20px;
  border-radius: 10px;
  background-color: #eeeeee;
  text-align: center;
  color: #959595;
  margin-left: 15px;
  // text center of the box (vertical)
  line-height: 15px;

  @media (max-width: 412px) {
    font-size: 10px;
    height: 15px;
    margin-top: -10px;
  }
`;
const NoTag = styled.div`
  display: inline-block;
  margin-top: 140px;
  font-size: 15px;
  width: 200px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  color: #959595;

  @media (max-width: 412px) {
    font-size: 10px;
    margin-top: 70px;
    margin-left: 5px;
    width: 100px;
    height: 15px;
  }
`;

export default MyPage;
