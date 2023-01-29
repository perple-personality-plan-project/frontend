import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import { MyPickDetailModal } from '../modal/MyPickDetailModal';
import {
  useAppDispatch,
  useAppSelector,
} from '../../components/hooks/typescripthook/hooks';
import loggedIn from '../../api/loggedIn';
import { __groupFeedDetail } from '../../redux/modules/groupSlice';
import { __mainFeedDetail } from '../../redux/modules/postSlice';
import { __modalOpen, __myFeed } from '../../redux/modules/mySlice';
import { __RootMaker } from '../../redux/modules/mapSlice';
import { __getPicked, __getMap } from '../../redux/modules/mySlice';

type Props = {
  state: React.ReactNode;
  close: any;
};
interface IAppState {
  show: boolean;
}

const MyPickModal: React.FC<Props> = ({ state, close }) => {
  const dispatch = useAppDispatch();

  // const [isOpen, setIsOpen] = useState(false);
  const [routeOpen, setRouteOpen] = useState(false);
  const [comment, setComment] = useState('');

  const mainFeedDetail: any = useAppSelector(store => store.mypage.myData);
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');
  const thumbnailArray = mainFeedDetail?.thumbnail?.split(',');
  const imgLink = process.env.REACT_APP_IMG_SERVER;
  const profileInfo = useAppSelector((store: any) => store.mypage.profileInfo);
  const myPick = useAppSelector((store: any) => store.mypage.myPick);

  const mainFeedComment: any = useAppSelector(
    store => store.post.mainFeedDetail,
  );
  console.log(mainFeedComment);

  const openRoutine = () => {
    setRouteOpen(!routeOpen);
  };

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
    await loggedIn.delete(`api/comment/${mainFeedDetail.feed_id}/${commentId}`);
    dispatch(
      __mainFeedDetail({ feedId: mainFeedDetail.feed_id, userId: userId }),
    );
  };

  // const openModal = () => {
  //   setIsOpen(true);
  //   dispatch(
  //     __mainFeedDetail({ feedId: mainFeedDetail.feed_id, userId: userId }),
  //   );
  // };

  const modalOpen = useAppSelector((store: any) => store.mypage.modalOpen);

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
    } else {
      await dispatch(__RootMaker(saveData));
      await dispatch(__getMap());
      alert('저장성공');
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
    const x = await loggedIn.put(`/api/feed/${mainFeedDetail.feed_id}/like`); //좋아요 / 좋아요 취소 api
  };

  const pick = async () => {
    await loggedIn
      .put(`api/feed/${mainFeedDetail.feed_id}/pick`)
      .then(response => {
        if (response.data.data.message === '찜하기가 취소되었습니다.') {
          alert('찜 취소');
          dispatch(__getPicked());
          close();
        } else {
          alert('찜!');
          dispatch(__getPicked());
        }
      });
  };

  return (
    <MyPickDetailModal
      onClose={() => close()}
      open={state}
      id={mainFeedDetail?.feed_id}
    >
      <StXIcon onClick={() => close()}>X</StXIcon>
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
            <img
              src={
                profileInfo[0]?.profile_img === undefined
                  ? require('../../마이페이지.png')
                  : process.env.REACT_APP_IMG_SERVER +
                    profileInfo[0].profile_img
              }
              alt="detail-img"
            />
            <div className="detail-info">
              <div className="detail-top" style={{ display: 'flex' }}>
                {/* <p>{profileInfo[0].nickname}</p> */}
                <p>{mainFeedDetail.mbti?.toUpperCase()}</p>
                <PostDelete onClick={deletePost}>X</PostDelete>
              </div>
              <p>{mainFeedDetail.description}</p>
              <NumberOfPlace>{placeName?.length}</NumberOfPlace>
              <RouteFoldButton
                show={routeOpen}
                onClick={openRoutine}
                style={{ marginTop: '20px' }}
              >
                루트 접기
              </RouteFoldButton>
              <RouteButton
                show={routeOpen}
                onClick={openRoutine}
                style={{ marginTop: '20px' }}
              >
                루트 펼치기
              </RouteButton>
              <RouteShow show={routeOpen}>
                {placeName?.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        color="#644EEE"
                        fill="currentColor"
                        className="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                      <div
                        style={{ display: 'inline-block', marginTop: '10px' }}
                      >
                        {item.place_name}
                      </div>
                    </div>
                  );
                })}
              </RouteShow>
              <div className="detail-bottom">
                <p>{date}</p>
                <div style={{ display: 'flex' }}>
                  {mainFeedDetail.isLike === 1 ? (
                    <StIcon>
                      <i
                        className="ri-heart-3-fill"
                        style={{ color: 'red', fontSize: '25px' }}
                        onClick={() => toggleHeart()}
                      ></i>
                      <p className="heart-number heart-position">
                        {mainFeedDetail.likeCount}
                      </p>
                    </StIcon>
                  ) : (
                    <StIcon>
                      <i
                        className="ri-heart-3-line"
                        style={{ color: 'red', fontSize: '25px' }}
                        onClick={() => toggleHeart()}
                      ></i>
                      <p className="heart-number heart-position">
                        {mainFeedDetail.like_count}
                      </p>
                    </StIcon>
                  )}
                  <div onClick={pick} className="detail-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3z"
                        fill="rgba(100,78,238,1)"
                      />
                    </svg>
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
                        profileInfo[0].profile_img === null
                          ? require('../../빡빡이1.png')
                          : process.env.REACT_APP_IMG_SERVER +
                            profileInfo[0].profile_img
                      }
                      alt="detail-img"
                    />
                    <div className="detail-info">
                      <div className="detail-top" style={{ display: 'flex' }}>
                        <h2>{comment.nickname}</h2>
                        <div
                          onClick={() => deleteComment(comment.comment_id)}
                          className="detail-del"
                        >
                          X
                        </div>
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
              />
              <button onClick={postComment}>완료</button>
            </StDetailInput>
          </CommentBox>
        </StDetailInfo>
      </StDetailContainer>
    </MyPickDetailModal>
  );
};

export default MyPickModal;

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
  background-color: #f2f2f2;
  border-top: 1px solid #b6b6b6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 30px 20px;

  input {
    outline: 0;
  }

  @media screen and (max-width: 1024px) {
    padding: 10px 20px;
  }
  input {
    border: 1px solid gray;
    border-radius: 20px;
    text-indent: 10px;
    width: 100%;
    height: 30px;
  }

  button {
    width: 80px;
    height: 30px;
    border: 0;
    background-color: #f2f2f2;

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
  margin-left: 60px;
`;
const RouteButton = styled.div<IAppState>`
  color: #9e9e9e;
  cursor: pointer;
  font-size: 13px;
  display: ${props => (props.show ? '' : 'none')};
`;

const RouteFoldButton = styled.div<IAppState>`
  color: #9e9e9e;
  cursor: pointer;
  font-size: 13px;
  display: ${props => (props.show ? 'none' : '')};
`;
const RouteShow = styled.div<IAppState>`
  display: ${props => (props.show ? 'none' : '')};
`;

const StIcon = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .heart-number {
    position: absolute;
    top: -35px;
    right: 9px;
    /* font-size: 20px; */
  }

  .heart-position {
    top: -13px;
    right: 9px;
  }
`;

const PostDelete = styled.button`
  background-color: transparent;
  border: transparent;
  font-size: 20px;
  margin-left: 170px;
  cursor: pointer;
`;

const StDetailDesc = styled.div`
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  display: flex;

  background-color: white;
  img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  p {
    font-size: 14px;
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
      /* justify-content: center; */
      align-items: center;
      margin: 0 0 10px 0;
      font-size: 15px;

      h2 {
        font-size: 18px;
        margin: 0 10px 0 0;
        color: #555555;
      }

      p {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        width: 60px;
        height: 20px;
        background-color: #d9d9d9;
        color: #9e9e9e;
        letter-spacing: 1px;
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
        background-color: transparent;
        color: black;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
`;

const StDetailComments = styled.div`
  aspect-ratio: 1/1;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: white;

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-top: 0px;
  }
`;

const StDetailComment = styled.div`
  width: 100%;
  /* max-width: 30ch; */
  display: flex;
  margin-bottom: 15px;
  position: relative;

  p {
    font-size: 14px;
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
        font-size: 18px;
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
        background-color: #f54e4e;
        color: white;

        cursor: pointer;
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
  @media screen and (max-width: 1024px) {
    height: 200px;
  }
  @media screen and (max-width: 390px) {
    height: 150px;
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
  @media screen and (max-width: 390px) {
    right: 0px;
  }
`;
