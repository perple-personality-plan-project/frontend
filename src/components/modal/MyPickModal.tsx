import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import { MyFeedDetailModal } from '../../components/modal/MyFeedDetailModal';
import {
  useAppDispatch,
  useAppSelector,
} from '../../components/hooks/typescripthook/hooks';
import loggedIn from '../../api/loggedIn';
import { __groupFeedDetail } from '../../redux/modules/groupSlice';
import { __mainFeedDetail } from '../../redux/modules/postSlice';
import {
  __modalOpen,
  __myFeed,
  __getMyProfile,
  __Togo,
} from '../../redux/modules/mySlice';
import { __RootMaker } from '../../redux/modules/mapSlice';
import { __getPicked, __getMap } from '../../redux/modules/mySlice';
import { useNavigate } from 'react-router-dom';

type Props = {
  state: React.ReactNode;
  close: any;
};
interface IAppState {
  show: boolean;
}

const FeedDetailModal: React.FC<Props> = ({ state, close }) => {
  const dispatch = useAppDispatch();

  // const [isOpen, setIsOpen] = useState(false);
  const [routeOpen, setRouteOpen] = useState(false);
  const [comment, setComment] = useState('');

  const mainFeedDetail: any = useAppSelector(
    store => store.post.mainFeedDetail,
  );
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');
  const thumbnailArray = mainFeedDetail?.thumbnail?.split(',');
  const imgLink = process.env.REACT_APP_IMG_SERVER;
  const profileInfo = useAppSelector((store: any) => store.mypage.profileInfo);
  const myPick = useAppSelector((store: any) => store.mypage.myPick);
  const mapList = useAppSelector((store: any) => store.mypage.maplist);
  const pickData = useAppSelector((store: any) => store.mypage.myData);

  const mainFeedComment: any = useAppSelector(
    store => store.post.mainFeedDetail,
  );
  const date = mainFeedDetail?.created_at
    ?.replace('T', '. ')
    .split(' ')[0]
    .split('-')
    .join('.')
    .replace('.', '년 ')
    .replace('.', '월 ')
    .replace('.', '일');
  const postComment = async () => {
    if (comment) {
      if (accessToken) {
        await loggedIn.post(`api/comment/${mainFeedDetail.feed_id}`, {
          comment,
        });
        dispatch(
          __mainFeedDetail({ feedId: mainFeedDetail.feed_id, userId: userId }),
        );
        setComment('');
      } else {
        alert('로그인 해주세요!');
        setComment('');
      }
    } else {
      alert('댓글을 입력해주세요!');
    }
  };

  const deleteComment = async (commentId: string | number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await loggedIn.delete(
        `api/comment/${mainFeedDetail.feed_id}/${commentId}`,
      );
      dispatch(
        __mainFeedDetail({ feedId: mainFeedDetail.feed_id, userId: userId }),
      );
    }
  };

  const handlekeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      postComment();
    }
  };

  // const openModal = () => {
  //   setIsOpen(true);
  //   dispatch(
  //     __mainFeedDetail({ feedId: mainFeedDetail.feed_id, userId: userId }),
  //   );
  // };

  const modalOpen = useAppSelector((store: any) => store.mypage.modalOpen);
  const navigate = useNavigate();

  let modalParse: { place_group: string; place_group_name: string } = {
    place_group: '',
    place_group_name: '',
  };
  let placeName: [] = [];

  if (mainFeedDetail.location === undefined) {
    modalParse = { place_group: '', place_group_name: '' };
    placeName = [];
  } else if (mainFeedDetail.location === '{}') {
    modalParse = { place_group: '', place_group_name: '' };
    placeName = [];
  } else if (
    mainFeedDetail.location ===
    '{"place_group_name":"없음","place_group":"없음"}'
  ) {
    modalParse = { place_group: '', place_group_name: '' };
    placeName = [];
  } else {
    modalParse = JSON.parse(mainFeedDetail.location);
    placeName = JSON.parse(modalParse.place_group);
  }

  const saveRoute = async () => {
    const saveData = {
      place_group: modalParse.place_group,
      place_group_name: modalParse.place_group_name,
    };
    if (saveData.place_group_name === '') {
      alert('해당 게시물에 루트가 없습니다');
    } else if (
      mapList.find(
        (el: any) => el.place_group_name === saveData.place_group_name,
      )
    ) {
      alert('이미 저장한 루트입니다');
    } else if (
      mapList.find((el: any) => el.place_group === saveData.place_group)
    ) {
      alert('이미 저장한 루트입니다');
    } else {
      await dispatch(__RootMaker(saveData));
      await dispatch(__getMap());
      alert('저장한 루트는 마이페이지>to-go-list에서 확인할 수 있습니다');
    }
  };
  const deletePost = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await loggedIn.delete(`api/feed/${mainFeedDetail.feed_id}`);
      await dispatch(__myFeed());
      await close();
    } else {
    }
  };
  const toggleHeart = async () => {
    await loggedIn.put(`/api/feed/${mainFeedDetail.feed_id}/like`); //좋아요 / 좋아요 취소 api
    await dispatch(
      __mainFeedDetail({ feedId: mainFeedDetail.feed_id, userId: userId }),
    );
  };

  const pick = async () => {
    await loggedIn
      .put(`api/feed/${mainFeedDetail.feed_id}/pick`)
      .then(response => {
        if (response.data.data.message === '찜하기가 취소되었습니다.') {
          dispatch(__getPicked());
          dispatch(
            __mainFeedDetail({
              feedId: mainFeedDetail.feed_id,
              userId: userId,
            }),
          );
          dispatch(__getMyProfile());
          alert('찜하기가 취소되었습니다.');
          close();
        } else {
          dispatch(__getPicked());
          dispatch(
            __mainFeedDetail({
              feedId: mainFeedDetail.feed_id,
              userId: userId,
            }),
          );
          dispatch(__getMyProfile());
          alert('찜하기가 완료되었습니다.');
        }
      });
  };
  const openRoutine = () => {
    if (placeName.length !== 0) {
      setRouteOpen(!routeOpen);
    }
  };
  const NavigaeToGo = async (e: []) => {
    await dispatch(__Togo(e));
    await navigate('/togolist');
  };
  return (
    <MyFeedDetailModal
      onClose={() => {
        close();
        setRouteOpen(false);
      }}
      open={state}
      id={mainFeedDetail?.feed_id}
    >
      <StXIcon
        onClick={() => {
          close();
          setRouteOpen(false);
        }}
      >
        X
      </StXIcon>
      <StDetailContainer>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          style={{ width: '100%', aspectRatio: '1/1' }}
        >
          {thumbnailArray?.map((thumbnail: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <img src={`${imgLink}${thumbnail}`} alt="swiper-img" />
              </SwiperSlide>
            );
          })}
          {/* <img src={thumbnail} alt="swiper-img" /> */}
        </Swiper>
        <StDetailInfo>
          <StDetailDesc>
            {profileInfo?.map((profile: any, index: number) => {
              return (
                <img
                  src={
                    profile?.profile_img !== null
                      ? process.env.REACT_APP_IMG_SERVER +
                        mainFeedDetail.profile_img
                      : require('../../마이페이지.png')
                  }
                  alt="detail-img"
                />
              );
            })}
            <div className="detail-info">
              <div className="detail-top" style={{ display: 'flex' }}>
                <div>{mainFeedDetail?.nickname}</div>
                <p>{pickData?.mbti}</p>
              </div>
              <StDiv>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                  {mainFeedDetail.description}
                </p>
                {mainFeedDetail.location !==
                '{"place_group_name":"없음","place_group":"없음"}' ? (
                  !routeOpen ? (
                    <div className="route-open">
                      <p className="route-open-button" onClick={openRoutine}>
                        루트 펼치기
                      </p>
                      <div className="route-open-count">
                        <p>{placeName?.length || 0}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="route-close">
                      <p className="route-close-button" onClick={openRoutine}>
                        루트 접기
                      </p>
                      {placeName?.map((route: any, index: number) => {
                        return (
                          <div
                            onClick={openRoutine}
                            key={index}
                            className="route-close-list"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              color="#644EEE"
                              fill="currentColor"
                              className="bi bi-geo-alt-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                            <p>{route.place_name}</p>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : null}
              </StDiv>
              <div className="detail-bottom">
                <p>{date}</p>
                <div style={{ display: 'flex' }}>
                  {mainFeedDetail.isLike === 1 ? (
                    <StIcon>
                      <p>{mainFeedDetail.likeCount}</p>
                      <i
                        style={{ color: 'blue', fontSize: '25px' }}
                        className="ri-thumb-up-fill"
                        onClick={() => toggleHeart()}
                      ></i>
                    </StIcon>
                  ) : (
                    <StIcon>
                      <p>{mainFeedDetail.likeCount}</p>
                      <i
                        style={{ color: 'blue', fontSize: '25px' }}
                        className="ri-thumb-up-line"
                        onClick={() => toggleHeart()}
                      ></i>
                    </StIcon>
                  )}
                  <div onClick={pick} className="detail-btn">
                    {mainFeedDetail.isPick === 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0H24V24H0z" />
                        <path
                          d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
                          fill="rgba(231,76,60,1)"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0H24V24H0z" />
                        <path
                          d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
                          fill="rgba(231,76,60,1)"
                        />
                      </svg>
                    )}
                  </div>
                  <div onClick={saveRoute} className="detail-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M13 10h5l-6 6-6-6h5V3h2v7zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7z" />
                    </svg>
                  </div>
                  {/* <PostDelete onClick={deletePost}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
                    </svg>
                  </PostDelete> */}
                </div>
              </div>
            </div>
          </StDetailDesc>
          <StDetailBorder></StDetailBorder>
          <CommentBox>
            <StDetailComments>
              {mainFeedComment?.comment?.map((comment: any) => {
                return (
                  <StDetailComment key={comment.comment_id}>
                    <img
                      src={
                        comment.profile_img === null
                          ? require('../../마이페이지.png')
                          : process.env.REACT_APP_IMG_SERVER +
                            comment.profile_img
                      }
                      alt="detail-img"
                    />
                    <div className="detail-info">
                      <div className="detail-top" style={{ display: 'flex' }}>
                        <h2>{comment.nickname}</h2>
                        {comment.user_id == userId ? (
                          <div
                            onClick={() => deleteComment(comment.comment_id)}
                            className="detail-del"
                          >
                            X
                          </div>
                        ) : (
                          <div className="detail-del"></div>
                        )}
                      </div>
                      <p>{comment.comment}</p>
                    </div>
                  </StDetailComment>
                );
              })}
            </StDetailComments>
            <StDetailInput>
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="댓글을 입력하세요"
                onKeyDown={handlekeyDown}
              />
              <button onClick={postComment}>완료</button>
            </StDetailInput>
          </CommentBox>
        </StDetailInfo>
      </StDetailContainer>
    </MyFeedDetailModal>
  );
};

export default FeedDetailModal;

const StDiv = styled.div`
  position: relative;
  font-size: 13px;
  margin-bottom: 10px;

  .route-open,
  .route-close {
    position: absolute;
    background-color: #f6f4fd;
    box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.25);
    margin-top: 15px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 10;
    /* left: -4px; */

    .route-open-button {
      font-size: 10px;
      color: gray;
    }

    .route-close-button {
      font-size: 10px;
      color: gray;
    }

    .route-open-count {
      display: flex;
      justify-content: center;
      align-items: center;
      /* text-align: center; */
      color: white;
      border-radius: 50%;
      width: 14px;
      height: 14px;
      font-size: 8px;
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: rgb(100, 78, 238);
    }

    .route-close-list {
      display: flex;
      align-items: center;
      /* justify-content: center; */
      padding-top: 5px;
      height: 20px;
      p {
        font-size: 11px;
        padding-left: 5px;
        /* margin-top: 10px; */

        /* margin-left: 5px; */
        color: #323232;
      }
    }
  }
`;

const StDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
  /* max-width: 800px; */

  img {
    /* max-width: 600px; */
    width: 100%;
    height: 100%;
    background-color: #b6b6b6;
  }

  @media screen and (max-width: 1024px) {
    /* aspect-ratio: 1/1; */
    width: 350px;
    /* height: 100%; */
    flex-direction: column;
    margin: 0 auto;

    img {
      width: 350px;
      height: 350px;
    }
  }
  @media screen and (max-width: 390px) {
    width: 90%;
  }
`;

const StDetailInput = styled.div`
  /* background-color: #f2f2f2; */
  background-color: white;
  border-top: 1px solid #b6b6b6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* height: 10%; */
  width: 100%;
  padding: 25px 24px;

  input {
    outline: 0;
  }

  @media screen and (max-width: 800px) {
    padding: 10px 20px;
  }
  input {
    background-color: #f6f7fa;
    /* border: 1px solid gray; */
    border: 0;
    border-radius: 20px;
    text-indent: 10px;
    width: 100%;
    height: 44px;

    &::placeholder {
      color: #b8b8b8;
    }
  }

  button {
    /* text-align: center; */
    margin-left: 10px;
    width: 50px;
    height: 25px;
    border: 0;
    font-family: 'Nanum_EB';
    color: #644eee;
    font-size: 15px;
    background-color: white;
    /* background-color: #f2f2f2; */

    cursor: pointer;
  }
`;

const StDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 60%;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const NumberOfPlace = styled.div`
  width: 18px;
  height: 18px;
  text-align: center;
  border-radius: 50%;
  background-color: #644eee;
  color: white;
  font-size: 15px;
  //text center vertical
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 60px;
  margin-left: 65px;
  z-index: 100;
`;
const RouteButton = styled.div<IAppState>`
  width: 60px;
  height: 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 500px;
  font-size: 12px;
  background-color: #f6f4fd;
  box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.25);
  color: gray;
  cursor: pointer;
  display: ${props => (props.show ? 'none' : '')};
  @media screen and (max-width: 1120px) {
    bottom: 445px;
  }
  @media screen and (max-width: 412px) {
    bottom: 245px;
  }
`;
const RouteButtonZero = styled.div<IAppState>`
  width: 60px;
  height: 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 500px;
  font-size: 12px;
  background-color: #f6f4fd;
  box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.25);
  color: gray;
  cursor: pointer;
  display: ${props => (props.show ? '' : 'none')};
  @media screen and (max-width: 1120px) {
    bottom: 445px;
  }
  @media screen and (max-width: 412px) {
    bottom: 245px;
  }
`;

const RouteFoldButton = styled.div<IAppState>`
  color: gray;
  cursor: pointer;
  font-size: 12px;
  position: absolute;
  top: -12px;
  display: ${props => (props.show ? '' : 'none')};
`;
const RouteShowBox = styled.div<IAppState>`
  background-color: #f6f4fd;
  box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.25);
  position: absolute;
  bottom: 425px;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 10;
  padding-top: 25px;
  display: ${props => (props.show ? '' : 'none')};
  @media screen and (max-width: 1120px) {
    bottom: 370px;
  }
  @media screen and (max-width: 412px) {
    bottom: 170px;
  }
`;

const RouteShow = styled.div<IAppState>`
  display: ${props => (props.show ? '' : 'none')};
`;

const StIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: -50px;

  margin-left: 5px;
  cursor: pointer;

  p {
    margin: 0;
  }
`;

const PostDelete = styled.button`
  background-color: transparent;
  border: transparent;
  font-size: 20px;
  margin-left: 5px;
  cursor: pointer;
`;

const StDetailDesc = styled.div`
  box-sizing: border-box;
  padding: 30px 22px 15px 22px;
  display: flex;
  background-color: white;
  img {
    margin-right: 12px;
    width: 29px;
    height: 29px;
    border-radius: 50%;
  }
  .detail-info {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      margin: 0;
      /* width: 90%; */
      /* width: 20ch; */
    }

    .detail-top {
      display: flex;
      /* justify-content: center; */
      align-items: center;
      margin: 0 0 10px 0;
      font-size: 15px;
      h2 {
        font-family: 'Nanum_EB';
        font-size: 13px;
        margin: 0 10px 0 0;
        color: #555555;
      }

      p {
        font-family: 'Nanum_EB';
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        border: 1px solid #8e8e8e;
        width: 57px;
        height: 20px;
        background-color: white;
        color: #9e9e9e;
        letter-spacing: 1px;
        font-size: 12px;
        margin-left: 5px;
      }
    }

    .detail-route {
      position: relative;
      p {
        color: #9e9e9e;
        height: 20px;
      }

      .detail-route-route {
        margin-top: 10px;
        color: #9e9e9e;
        font-size: 10px;
        cursor: pointer;
      }

      .detail-route-count {
        border-radius: 50%;
        font-size: 10px;
        width: 15px;
        height: 15px;
        background-color: rgb(100, 78, 238);
        color: white;
        position: absolute;
        top: 0px;
        right: 130px;
        /* display: none; */

        p {
          color: white;
          margin: 0;
          position: absolute;
          top: 1.5px;
          right: 4.6px;
        }
      }

      .detail-route-list {
        display: flex;
        align-items: center;
        /* justify-content: center; */
        p {
          font-size: 11px;
          margin-top: 10px;
          margin-left: 5px;
          color: #323232;
        }
      }
    }

    .detail-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 23px;

      p {
        font-size: 10px;
        color: #9e9e9e;
        margin-top: 40px;
      }

      .detail-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        color: black;
        margin-left: 10px;
        margin-top: 4px;
      }
    }
  }
`;

const StDetailComments = styled.div`
  aspect-ratio: 1/1;
  overflow: auto;
  flex: 1;
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 250px;
  }
`;

const StDetailComment = styled.div`
  width: 100%;
  /* max-width: 30ch; */
  display: flex;
  margin-bottom: 15px;
  position: relative;
  word-break: break-all;

  p {
    width: 90%;
    font-size: 13px;
  }

  img {
    margin: -10px 10px 0 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .detail-info {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      margin: 0;
      /* width: 20ch; */
    }

    .detail-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      h2 {
        font-family: 'Nanum_EB';
        font-size: 13px;
        margin: 0 10px 0 0;
      }

      p {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        width: 60px;
        height: 20px;
        background-color: white;
      }
    }

    .detail-del {
      width: 25px;
      height: 25px;
      border-radius: 50%;

      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(220, 218, 230);
        color: white;

        cursor: pointer;

        .hover-color {
          color: white !important;
        }
      }
    }
  }
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 455px;
  justify-content: space-between;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1120px) {
    height: 400px;
  }

  @media screen and (max-width: 412px) {
    height: 200px;
  }
`;

const StDetailBorder = styled.div`
  border-bottom: 1px solid #b6b6b6;
  /* margin-top: 10px; */
`;

const StXIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;

  position: absolute;
  top: -30px;
  right: -30px;
  cursor: pointer;
  @media screen and (max-width: 1120px) {
    right: 10px;
    top: 10px;
    z-index: 100;
  }
  @media screen and (max-width: 390px) {
    right: 30px;
  }
`;
