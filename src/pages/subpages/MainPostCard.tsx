import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import { GroupDetailCardModal } from '../../components/modal/GroupDetailCardModal';
import { groupFeedPreset } from '../GroupDetail';
import {
  useAppDispatch,
  useAppSelector,
} from '../../components/hooks/typescripthook/hooks';
import nonTokenClient from '../../api/noClient';
import loggedIn from '../../api/loggedIn';
import {
  __mainFeedDetail,
  __mainFeedlist,
  __mainMbtilist,
} from '../../redux/modules/postSlice';
import client from '../../api/client';
import { __RootMaker } from '../../redux/modules/mapSlice';

interface Props {
  post: {
    created_at: string;
    description: string;
    feed_id: number;
    likeCount: number;
    location: string;
    mbti: string;
    nickname: string;
    thumbnail: string;
    updated_at: string;
    user_id: number;
    isLike: number | string;
    isPick: number | string;
    profile_img: string;
  };
  mbtiCheck: string;
}

interface IAppState {
  show: boolean;
}

const MainPostCard: React.FC<Props> = ({ post, mbtiCheck }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    created_at,
    description,
    feed_id,
    likeCount,
    isLike,
    isPick,
    location,
    mbti,
    profile_img,
    nickname,
    thumbnail,
    updated_at,
    user_id,
  } = post;

  const groupName = JSON.parse(location);
  const sessionMbti = sessionStorage.getItem('');
  let parsedLocation: {
    created_at: string;
    map_id: number;
    place_group: string;
    place_group_name: string;
    updated_at: string;
    user_id: number;
  };

  let parsedData;
  let parsedPlace;
  if (
    groupName.place_group_name !== undefined &&
    groupName.place_group_name !== '없음'
  ) {
    parsedData = JSON.parse(location);
    parsedPlace = JSON.parse(parsedData.place_group);
    parsedLocation = { ...JSON.parse(location) };
  } else {
    parsedLocation = {
      created_at: '',
      map_id: 0,
      place_group: '없음',
      place_group_name: '없음',
      updated_at: '',
      user_id: 0,
    };
  }

  const { mainFeedDetail }: any = useAppSelector(store => store.post);

  const date = created_at
    .replace('T', '. ')
    .split(' ')[0]
    .split('-')
    .join('.')
    .replace('.', '년 ')
    .replace('.', '월 ')
    .replace('.', '일');

  const [comment, setComment] = useState('');
  const [pintoggle, setPinToggle] = useState(false);
  const [toggleRoute, setToggleRoute] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');

  const [routeOpen, setRouteOpen] = useState(false);
  const thumbnailArray = thumbnail.split(',');
  const imgLink = process.env.REACT_APP_IMG_SERVER;
  const userId: number = Number(sessionStorage.getItem('userId'));

  const postComment = async () => {
    if (comment) {
      if (accessToken) {
        await loggedIn.post(`api/comment/${feed_id}`, {
          comment,
        });
        dispatch(__mainFeedDetail({ feedId: feed_id, userId: userId }));
        setComment('');
      } else {
        alert('로그인 해주세요!');
        setComment('');
      }
    } else {
      alert('댓글을 입력해주세요!');
    }
  };

  const toggleThumb = async (feedId: number) => {
    await loggedIn.put(`/api/feed/${feed_id}/like`);
    dispatch(__mainFeedlist({ userId }));
    dispatch(
      __mainMbtilist({
        userId: userId,
        mbtiCheck: mbtiCheck,
      }),
    );
  };

  const togglepick = async (feedId: number) => {
    await loggedIn.put(`api/feed/${feed_id}/pick`).then(response => {
      if (response.data.data.message === '찜목록에 추가되었습니다.') {
        dispatch(__mainFeedlist({ userId }));
        dispatch(
          __mainMbtilist({
            userId: userId,
            mbtiCheck: mbtiCheck,
          }),
        );
        alert('마이페이지 찜 목록에 저장되었습니다.');
      } else {
        dispatch(__mainFeedlist({ userId }));
        dispatch(
          __mainMbtilist({
            userId: userId,
            mbtiCheck: mbtiCheck,
          }),
        );
        alert('찜하기 취소되었습니다.');
      }
    });
  };

  // const togglepick = async (feedId: number) => {
  //   await loggedIn.put(`api/feed/${feed_id}/pick`);
  //   dispatch(__mainFeedlist({ userId }));
  //   dispatch(
  //     __mainMbtilist({
  //       userId: userId,
  //       mbtiCheck: mbtiCheck,
  //     }),
  //   );
  // };

  const deleteComment = async (commentId: string | number) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      await loggedIn.delete(`api/comment/${feed_id}/${commentId}`);
      dispatch(__mainFeedDetail({ feedId: feed_id, userId: userId }));
    } else {
      // alert('취소합니다.');
    }
  };

  const openRoutine = () => {
    setRouteOpen(!routeOpen);
  };

  const openModal = () => {
    setIsOpen(true);
    dispatch(__mainFeedDetail({ feedId: feed_id, userId: userId }));
  };

  // let modalParse: { place_group: string; place_group_name: string } = {
  //   place_group: '',
  //   place_group_name: '',
  // };
  // let placeName: [] = [];

  // if (mainFeedDetail.location === undefined) {
  //   modalParse = { place_group: '', place_group_name: '' };
  //   placeName = [];
  // } else if (mainFeedDetail.location === '{}') {
  //   modalParse = { place_group: '', place_group_name: '' };
  //   placeName = [];
  // } else {
  //   modalParse = JSON.parse(mainFeedDetail.location);
  //   placeName = JSON.parse(modalParse.place_group);
  // }

  // if (mainFeedDetail.location === undefined) {
  //   // console.log('undefined');
  // } else {
  //   modalParse = JSON.parse(mainFeedDetail.location);
  //   placeName = JSON.parse(modalParse.place_group);
  // }
  // // console.log(modalParse);

  const handlekeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      postComment();
    }
  };

  const saveRoute = () => {
    const saveData = {
      place_group: parsedLocation.place_group,
      place_group_name: parsedLocation.place_group_name,
    };

    if (saveData.place_group_name === '없음') {
      return alert('저장할 루트가 없습니다.');
    } else {
      dispatch(__RootMaker(saveData));
      alert('마이페이지 to-go-list 목록에 저장되었습니다.');
    }
  };

  return (
    <StGroupPost>
      <div className="post-container">
        <div onClick={openModal}>
          <div className="post-header">
            <div className="post-header-info">
              {post.profile_img === null ? (
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={require('../../마이페이지.png')}
                  alt="group-img"
                />
              ) : (
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={process.env.REACT_APP_IMG_SERVER + post.profile_img}
                  alt="group-img"
                />
              )}
              <h3>{nickname}</h3>
              <p>{mbti?.toUpperCase()}</p>
            </div>
            {parsedLocation.place_group_name !== '없음' ? (
              <div className="post-header-route">
                {parsedLocation.place_group_name}
              </div>
            ) : null}
          </div>

          <img
            src={process.env.REACT_APP_IMG_SERVER + thumbnail.split(',')[0]}
            alt="group-img"
          />
          <div className="post-desc">
            <p className="desc-title">{description}</p>
            <div className="post-bottom">
              <p className="post-date">{date}</p>
            </div>
          </div>
        </div>
        <div className="post-bottom-right">
          <div className="post-bottom-thumb">
            {isLike === 1 ? (
              <StIcon>
                <i
                  className="ri-thumb-up-fill"
                  style={{ color: 'blue', fontSize: '25px', cursor: 'pointer' }}
                  onClick={() => toggleThumb(feed_id)}
                ></i>
                <p className="thumb-number">{likeCount}</p>
              </StIcon>
            ) : (
              <StIcon>
                <i
                  className="ri-thumb-up-line"
                  onClick={() => toggleThumb(feed_id)}
                  style={{
                    color: 'blue',
                    fontSize: '25px',
                    cursor: 'pointer',
                  }}
                ></i>
                <p className="thumb-number">{likeCount}</p>
              </StIcon>
            )}
          </div>
          <div className="post-bottom-pin">
            {isPick === 1 ? (
              <StIcon>
                <i
                  className="ri-pushpin-2-fill"
                  style={{
                    color: '#644eee',
                    fontSize: '24px',
                    cursor: 'pointer',
                  }}
                  onClick={() => togglepick(feed_id)}
                ></i>
              </StIcon>
            ) : (
              <StIcon>
                <i
                  className="ri-pushpin-2-line"
                  style={{
                    color: '#644eee',
                    fontSize: '24px',
                    cursor: 'pointer',
                  }}
                  onClick={() => togglepick(feed_id)}
                ></i>
              </StIcon>
            )}
          </div>

          <div
            className="post-bottom-route"
            style={{ marginLeft: '5px', cursor: 'pointer' }}
          >
            <div onClick={saveRoute}>
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
          </div>
        </div>
      </div>

      <GroupDetailCardModal
        onClose={() => setIsOpen(false)}
        open={isOpen}
        id={mainFeedDetail?.feed_id}
      >
        <StXIcon onClick={() => setIsOpen(false)}>
          <i
            style={{ color: '#5B5B5B', fontSize: '20px' }}
            className="ri-close-line"
          ></i>
        </StXIcon>
        <StDetailContainer>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            style={{ width: '100%', aspectRatio: '1/1' }}
          >
            {thumbnailArray.map((thumbnail, index) => {
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
              {post.profile_img === null ? (
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={require('../../마이페이지.png')}
                  alt="group-img"
                />
              ) : (
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={process.env.REACT_APP_IMG_SERVER + post.profile_img}
                  alt="group-img"
                />
              )}
              <div className="detail-info">
                <div className="detail-top" style={{ display: 'flex' }}>
                  {/* <h2>{nickname}</h2> */}
                  <h2>{nickname}</h2>
                  <p>{mbti?.toUpperCase()}</p>
                </div>

                <StDiv>
                  {description}
                  {parsedLocation.place_group_name !== '없음' ? (
                    !toggleRoute ? (
                      <div className="route-open">
                        <p
                          className="route-open-button"
                          onClick={() => setToggleRoute(!toggleRoute)}
                        >
                          루트 펼치기
                        </p>{' '}
                        <div className="route-open-count">
                          <p>{parsedPlace?.length || 0}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="route-close">
                        <p
                          className="route-close-button"
                          onClick={() => setToggleRoute(!toggleRoute)}
                        >
                          루트 접기
                        </p>
                        {parsedPlace?.map((route: any, index: number) => {
                          return (
                            <div key={index} className="route-close-list">
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
                    <div className="post-bottom-heart">
                      {isLike === 1 ? (
                        <StIcon>
                          <i
                            className="ri-thumb-up-fill"
                            style={{
                              color: 'blue',
                              fontSize: '25px',
                              cursor: 'pointer',
                            }}
                            onClick={() => toggleThumb(feed_id)}
                          ></i>
                          <p className="modal-thumb-number">{likeCount}</p>
                        </StIcon>
                      ) : (
                        <StIcon>
                          <i
                            className="ri-thumb-up-line"
                            onClick={() => toggleThumb(feed_id)}
                            style={{
                              color: 'blue',
                              fontSize: '25px',
                              cursor: 'pointer',
                            }}
                          ></i>
                          <p className="modal-thumb-number">{likeCount}</p>
                        </StIcon>
                      )}
                    </div>
                    <div className="post-bottom-pin">
                      {isPick === 1 ? (
                        <StIcon>
                          <i
                            className="ri-pushpin-2-fill"
                            style={{
                              color: '#644eee',
                              fontSize: '24px',
                              marginRight: '6px',
                              cursor: 'pointer',
                            }}
                            onClick={() => togglepick(feed_id)}
                          ></i>
                        </StIcon>
                      ) : (
                        <StIcon>
                          <i
                            className="ri-pushpin-2-line"
                            style={{
                              color: '#644eee',
                              fontSize: '24px',
                              marginRight: '6px',
                              cursor: 'pointer',
                            }}
                            onClick={() => togglepick(feed_id)}
                          ></i>
                        </StIcon>
                      )}
                    </div>
                    <div
                      className="post-bottom-route"
                      style={{
                        color: '#8E8E8E',
                        fontSize: '25px',
                        marginRight: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <div onClick={saveRoute}>
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
                    </div>
                  </div>
                </div>
              </div>
            </StDetailDesc>
            <StDetailBorder></StDetailBorder>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                backgroundColor: ' white',
              }}
            >
              <StDetailComments>
                {mainFeedDetail?.comment?.map((comment: any) => {
                  return (
                    <StDetailComment key={comment.comment_id}>
                      {comment.profile_img === null ? (
                        <img
                          src={require('../../마이페이지.png')}
                          alt="detail-img"
                        />
                      ) : (
                        <img
                          src={
                            process.env.REACT_APP_IMG_SERVER +
                            comment.profile_img
                          }
                          alt="detail-img"
                        />
                      )}
                      <div className="detail-info">
                        <div className="detail-top" style={{ display: 'flex' }}>
                          <h2>{comment.nickname}</h2>

                          {userId === comment.user_id ? (
                            <div
                              onClick={() => deleteComment(comment.comment_id)}
                              className="detail-del"
                            >
                              <i
                                style={{ color: '#5B5B5B', fontSize: '15px' }}
                                className="ri-close-line hover-color"
                              ></i>
                            </div>
                          ) : null}
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
            </div>
          </StDetailInfo>
        </StDetailContainer>
      </GroupDetailCardModal>
    </StGroupPost>
  );
};

export default MainPostCard;

const StIcon = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  /* .ri-heart-3-fill {
    cursor: pointer;
  }
  .ri-heart-3-line {
    cursor: pointer;
  } */

  .thumb-number {
    position: absolute;
    top: -26px;
    right: 8px;
    color: #9e9e9e;
    font-size: 13px;
  }
  .modal-thumb-number {
    position: absolute;
    top: -13px;
    right: 9px;
    font-size: 13px;
    color: #9e9e9e;
  }
  .heart-position {
    top: -10px;
    right: 9px;
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

  @media screen and (max-width: 800px) {
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
  background-color: #f2f2f2;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const StDetailDesc = styled.div`
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  display: flex;
  background-color: white;
  img {
    margin-right: 10px;
    width: 29px;
    height: 29px;
    border-radius: 50%;
  }

  /* p {
    font-size: 14px;
  } */

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
      }
    }

    .detail-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;

      p {
        font-size: 13px;
        color: #9e9e9e;
      }

      .detail-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        background-color: #d9d9d9;
        color: black;
        margin-left: 10px;
      }
    }
  }
`;

const StDiv = styled.div`
  position: relative;
  font-size: 13px;
  margin-bottom: 10px;

  .route-open,
  .route-close {
    position: absolute;
    background-color: #f6f4fd;
    box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.25);
    margin-top: 10px;
    /* cursor: pointer;
    padding: 5px 10px; */
    border-radius: 5px;
    z-index: 10;
    /* left: -4px; */

    .route-open-button {
      cursor: pointer;
      padding: 5px 10px;
      font-size: 10px;
      color: gray;
    }

    .route-close-button {
      cursor: pointer;
      padding: 5px 10px;
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
      padding: 2px 5px;
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

const StDetailComments = styled.div`
  aspect-ratio: 1/1;
  overflow: auto;
  flex: 1;
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 800px) {
    aspect-ratio: 1/0.5;
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

  /* p {
    width: 90%;
    font-size: 13px;
  } */

  img {
    margin: 10px 10px 0 0;
    width: 29px;
    height: 29px;
    border-radius: 50%;
  }
  .detail-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 13px;

    p {
      margin: 0;
      /* width: 20ch; */
    }

    .detail-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      padding-top: 8px;
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
      width: 30px;
      height: 30px;
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

const StDetailBorder = styled.div`
  border-bottom: 1px solid #b6b6b6;
  /* margin-top: 10px; */
`;

const StXIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  width: 30px;
  height: 30px;
  background-color: #e1e2e8;
  border-radius: 50%;

  position: absolute;
  top: 25px;
  right: 20px;
  cursor: pointer;

  z-index: 1000;

  @media screen and (max-width: 800px) {
    top: 10px;
    right: 10px;

    z-index: 3;
  }
`;

const StGroupPost = styled.div`
  /* width: 100%; */

  .post-container {
    position: relative;
    /* margin: 20px; */
    width: 430px;

    /* height: 400px; */

    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

    img {
      aspect-ratio: 1/1;
      width: 100%;
      background-color: #f0f0f0;
      /* filter: brightness(50%); */
    }

    .post-header {
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.05);
      /* backdrop-filter: blur(5px); */

      .post-header-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          /* background-color: pink; */
          border-radius: 50%;
          margin-right: 10px;
        }

        h3 {
          text-shadow: 0px 0px 2px gray, 0px 0px 2px gray;
          color: white;

          margin: 0;
          font-size: 15px;
          margin-right: 10px;
        }

        p {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 20px;
          margin: 0;
          /* background-color: white; */
          border: 1px solid white;
          color: white;
          /* font-weight: bold; */
          letter-spacing: 1px;
          border-radius: 20px;
          padding: 1px 10px;
        }

        div {
          display: flex;
          flex-wrap: wrap;
          p {
            background-color: white;
            border-radius: 20px;
            font-size: 12px;
            padding: 5px 15px;
            margin: 5px 5px 5px 0;
          }
        }
      }

      .post-header-route {
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        color: white;
        font-size: 12px;
        font-weight: bold;
        padding: 10px 15px;
        /* margin-right: 20px; */
      }
    }

    .post-desc {
      word-break: break-all;
      margin: 15px 22px;
      p {
        max-width: 60%;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        margin: 0 0 40px 0;
        /* overflow: auto; */
      }

      .desc-title {
        font-family: 'Nanum_B';
        font-size: 18px;
      }

      .post-date {
        font-size: 14px;
        color: #9e9e9e;
        margin: 0;
      }
    }

    .post-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    @media screen and (max-width: 900px) {
      margin: 0 auto;
      width: 460px;
    }
    @media screen and (max-width: 500px) {
      width: 90%;
    }
  }
  .post-bottom-right {
    display: flex;
    position: absolute;
    bottom: 10px;
    right: 10px;

    .post-bottom-thumb {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
    }

    .post-bottom-icon {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: pink;

      /* border-radius: 50%; */
      margin: 0 5px;
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;
