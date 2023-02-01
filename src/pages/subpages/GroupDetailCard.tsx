import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import { GroupDetailCardModal } from '../../components/modal/GroupDetailCardModal';
import { groupFeedPreset, placePreset } from '../GroupDetail';
import {
  useAppDispatch,
  useAppSelector,
} from '../../components/hooks/typescripthook/hooks';
import { __groupFeedList } from '../../redux/modules/groupSlice';
import loggedIn from '../../api/loggedIn';
import nonTokenClient from '../../api/noClient';

interface feedCardPreset {
  feed: groupFeedPreset;
  paramId: object;
  groupSubscribe: object;
  places: placePreset[];
}

const GroupDetailCard: React.FC<feedCardPreset> = ({
  feed,
  paramId,
  groupSubscribe,
  places,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    created_at,
    description,
    feed_id,
    group_user_id,
    location,
    mbti,
    nickname,
    thumbnail,
    updated_at,
    likeCount,
    isLike,
    user_id,
    profile_img,
  } = feed;

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{}[]>([]);
  const [toggleRoute, setToggleRoute] = useState(false);
  const userId: number = Number(sessionStorage.getItem('userId'));
  const sessionMbti = sessionStorage.getItem('mbti');

  //place group name 찾기 위해 필터링 사용
  //전체 맵 데이터와 게시글 생성시 넣은 루트 데이터를 비교하여 같은걸 필터링 함
  //이게 안되네 ... 계정 바뀌면 맵도 달라져서 안됌...
  // const filtered = places.filter(place => place.place_group === location);

  // if (feed.location !== 'undefined') {
  //   const parsedData = JSON.parse(feed.location);
  //   const parsedPlace = JSON.parse(parsedData.place_group);
  // }

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
  if (feed.location !== 'undefined') {
    parsedData = JSON.parse(feed.location);
    parsedPlace = JSON.parse(parsedData.place_group);

    // console.log(JSON.parse(feed.location));
    parsedLocation = { ...JSON.parse(feed.location) };
  } else {
    parsedLocation = {
      created_at: '',
      map_id: 0,
      place_group: '',
      place_group_name: '없음',
      updated_at: '',
      user_id: 0,
    };
  }

  const date = created_at
    .replace('T', '. ')
    .split(' ')[0]
    .split('-')
    .join('.')
    .replace('.', '년 ')
    .replace('.', '월 ')
    .replace('.', '일');

  const param: any = paramId;
  const groupId = param.id;

  const thumbnailArray = thumbnail.split(',');
  const imgLink = process.env.REACT_APP_IMG_SERVER;

  //async/await로 동기처리 해줄 수 있음.
  //await가 끝난 후 다음 줄 실행함.
  const postComment = async () => {
    if (comment) {
      if (groupSubscribe) {
        await loggedIn.post(
          `api/group-comment/group/${groupId}/feed/${feed_id}`,
          {
            comment,
          },
        );
        fetchData();
        setComment('');
      } else {
        alert('그룹을 구독해주세요!');
        setComment('');
      }
    } else {
      alert('댓글을 입력해주세요!');
    }
  };

  const handlekeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      postComment();
    }
  };

  const deleteComment = async (commentId: string | number) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      await loggedIn.delete(
        `api/group-comment/group/${groupId}/feed/${feed_id}/${commentId}`,
      );
      fetchData();
      // alert('삭제되었습니다.');
    } else {
      // alert("취소합니다.");
    }
  };

  const fetchData = async () => {
    const { data } = await nonTokenClient.get(
      `/api/group-comment/group/${groupId}/feed/${feed_id}`,
    );
    setComments([...data.data]);
  };

  const openModal = () => {
    setIsOpen(true);
    fetchData();
  };

  const toggleHeart = async (feedId: number) => {
    await loggedIn.put(`/api/group/${groupId}/feed/${feedId}/like`); //좋아요 / 좋아요 취소 api
    dispatch(__groupFeedList({ id: groupId, userId: userId }));
  };

  const deletePost = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      await loggedIn.delete(`/api/group/${groupId}/feed/${feed_id}`); //좋아요 / 좋아요 취소 api
      dispatch(__groupFeedList({ id: groupId, userId: userId }));
      alert('게시글이 삭제되었습니다!');
    } else {
      // alert('취소합니다.');
    }
  };

  return (
    <StGroupPost>
      <div className="post-container">
        <div onClick={openModal} style={{ height: 'stretch' }}>
          <div className="post-header">
            <div className="post-header-info">
              {feed.profile_img === null ? (
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={require('../../마이페이지.png')}
                  alt="group-img"
                />
              ) : (
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={process.env.REACT_APP_IMG_SERVER + feed.profile_img}
                  alt="group-img"
                />
              )}

              <h3>{nickname}</h3>
              <p>{mbti.toUpperCase()}</p>
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
              <p className="post-date ">{date}</p>
            </div>
          </div>
        </div>
        <div className="post-bottom-right">
          <div className="post-bottom-icon">
            {isLike === 1 ? (
              <StIcon>
                <p>{likeCount}</p>
                <i
                  className="ri-heart-3-fill"
                  style={{ color: 'red', fontSize: '25px' }}
                  onClick={() => toggleHeart(feed_id)}
                ></i>
              </StIcon>
            ) : (
              <StIcon>
                <p>{likeCount}</p>
                <i
                  className="ri-heart-3-line"
                  onClick={() => toggleHeart(feed_id)}
                  style={{ color: 'red', fontSize: '25px' }}
                ></i>
              </StIcon>
            )}
          </div>
          {/* <div className="post-bottom-icon">B</div>
          <div className="post-bottom-icon">C</div> */}
          {userId === user_id ? (
            <div className="post-bottom-icon">
              <StIcon>
                <p style={{ visibility: 'hidden' }}>0</p>
                <i
                  onClick={() => deletePost()}
                  className="ri-delete-bin-line"
                  style={{ fontSize: '25px' }}
                ></i>
              </StIcon>
            </div>
          ) : null}
        </div>
      </div>

      <GroupDetailCardModal
        onClose={() => setIsOpen(false)}
        open={isOpen}
        id={feed_id}
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
              {feed.profile_img === null ? (
                <img src={require('../../마이페이지.png')} alt="detail-img" />
              ) : (
                <img
                  src={process.env.REACT_APP_IMG_SERVER + feed.profile_img}
                  alt="group-img"
                />
              )}
              {/* <img src={require('../../빡빡이1.png')} alt="detail-img" /> */}
              <div className="detail-info">
                <div className="detail-top" style={{ display: 'flex' }}>
                  <h2>{nickname}</h2>
                  <p>{mbti.toUpperCase()}</p>
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
                  <p style={{ paddingTop: '14px' }}>{date}</p>
                  <div style={{ display: 'flex' }}>
                    {isLike === 1 ? (
                      <StIcon>
                        <p>{likeCount}</p>
                        <i
                          className="ri-heart-3-fill"
                          style={{ color: 'red', fontSize: '25px' }}
                          onClick={() => toggleHeart(feed_id)}
                        ></i>
                      </StIcon>
                    ) : (
                      <StIcon>
                        <p>{likeCount}</p>
                        <i
                          className="ri-heart-3-line"
                          style={{ color: 'red', fontSize: '25px' }}
                          onClick={() => toggleHeart(feed_id)}
                        ></i>
                      </StIcon>
                    )}
                    {/* <div className="detail-btn">댓</div> */}
                    {userId === user_id ? (
                      <div className="post-bottom-icon">
                        <StIcon>
                          <p style={{ visibility: 'hidden' }}>0</p>
                          <i
                            onClick={() => deletePost()}
                            className="ri-delete-bin-line"
                            style={{ fontSize: '25px' }}
                          ></i>
                        </StIcon>
                      </div>
                    ) : null}
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
                {comments.map((comment: any) => {
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
                          <h2 className="detail-nickname">
                            {comment.nickname}
                          </h2>
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
                  max={100}
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

export default GroupDetailCard;

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

const StIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  margin-left: 5px;
  cursor: pointer;

  p {
    margin: 0;
  }
`;

const StDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
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
  background-color: white;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const StDetailDesc = styled.div`
  word-break: break-all;
  box-sizing: border-box;
  padding: 30px 22px 15px 22px;
  display: flex;
  img {
    margin-right: 10px;
    width: 29px;
    height: 29px;
    border-radius: 50%;
  }
  .detail-info {
    position: relative;
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
      }
    }

    .detail-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;

      p {
        font-size: 10px;
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

const StDetailComments = styled.div`
  aspect-ratio: 1/1;
  overflow: auto;
  /* height: 100%; */
  flex: 1;
  box-sizing: border-box;
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;

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
  /* align-items: center; */
  margin-bottom: 15px;
  position: relative;

  p {
    width: 90%;
    font-size: 13px;
  }

  img {
    margin: 10px 10px 0 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .detail-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;

    p {
      margin: 0;
      word-break: break-all;
      /* width: 20ch; */
    }

    .detail-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      height: 25px;
      h2 {
        font-family: 'Nanum_EB';
        font-size: 13px;
        height: 15px;
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

const StDetailBorder = styled.div`
  border-bottom: 1px solid #b6b6b6;
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

  @media screen and (max-width: 860px) {
    top: 10px;
    right: 10px;

    z-index: 3;
  }
`;

const StGroupPost = styled.div`
  box-sizing: border-box;
  /* width: 100%; */
  .post-container {
    position: relative;
    /* margin: 20px; */
    width: 419px;
    aspect-ratio: 4.2/5.6;
    /* height: 400px; */

    background-color: white;
    border: 1px solid #d9d9d9;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

    filter: brightness(100%);

    img {
      aspect-ratio: 4.2/4.3;
      width: 100%;
      background-color: #f0f0f0;
    }

    .post-header {
      /* background-color: pink; */
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.05);
      /* background-color: transparent; */
      /* backdrop-filter: blur(5px); */

      .post-header-info {
        text-shadow: 0px 0px 2px gray, 0px 0px 2px gray;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          background-color: pink;
          border-radius: 50%;
          margin-right: 10px;
        }

        h3 {
          color: white;
          filter: brightness(100%);
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
        background-color: white;
        border-radius: 5px;
        color: #5b5b5b;
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
        position: absolute;
        bottom: 11px;
        font-size: 13.61px;
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
      width: 460px;
    }
    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }

  .post-bottom-right {
    display: flex;
    position: absolute;
    bottom: 14px;
    right: 10px;

    .post-bottom-icon {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      /* background-color: pink; */

      /* border-radius: 50%; */
      /* margin: 0 5px; */
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;
