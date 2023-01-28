import React, { useState } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import { GroupDetailCardModal } from '../../components/modal/GroupDetailCardModal';
import { MyFeedDetailModal } from '../../components/modal/MyFeedDetailModal';
import {
  useAppDispatch,
  useAppSelector,
} from '../../components/hooks/typescripthook/hooks';
import { __groupFeedDetail } from '../../redux/modules/groupSlice';
import loggedIn from '../../api/loggedIn';
import { __mainFeedDetail } from '../../redux/modules/postSlice';
import { __modalOpen } from '../../redux/modules/mySlice';
import { __RootMaker } from '../../redux/modules/mapSlice';

interface Props {
  post: {
    created_at: string;
    description: string;
    feed_id: number;
    like_count: number;
    location: string;
    mbti: string;
    thumbnail: string;
    updated_at: string;
    user_id: number;
  };
}
interface IAppState {
  show: boolean;
}
type RootType = {
  place_group: [];
  place_group_name: string;
};

const FeedDetailModal: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [routeOpen, setRouteOpen] = useState(false);
  const dispatch = useAppDispatch();
  const myGroupShow = () => {
    setRouteOpen(!routeOpen);
  };

  const mainFeedDetail: any = useAppSelector(store => store.mypage.myData);
  const userId = sessionStorage.getItem('userId');

  const date = mainFeedDetail?.created_at
    ?.replace('T', '. ')
    .split(' ')[0]
    .split('-')
    .join('.')
    .replace('.', '년 ')
    .replace('.', '월 ')
    .replace('.', '일');
  const [comment, setComment] = useState('');
  const accessToken = sessionStorage.getItem('accessToken');
  const thumbnailArray = mainFeedDetail?.thumbnail?.split(',');
  const imgLink = process.env.REACT_APP_IMG_SERVER;
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

  const openModal = () => {
    setIsOpen(true);
    dispatch(
      __mainFeedDetail({ feedId: mainFeedDetail.feed_id, userId: userId }),
    );
  };

  const modalOpen = useAppSelector((store: any) => store.mypage.modalOpen);

  let modalParse: { place_group: string; place_group_name: string } = {
    place_group: '',
    place_group_name: '',
  };
  let placeName: [] = [];

  if (mainFeedDetail.location === undefined) {
    console.log('undefined');
  } else {
    modalParse = JSON.parse(mainFeedDetail.location);
    placeName = JSON.parse(modalParse.place_group);
  }
  console.log(placeName);

  const saveRoute = () => {
    const saveData = {
      place_group: modalParse.place_group,
      place_group_name: modalParse.place_group_name,
    };

    dispatch(__RootMaker(saveData));
    alert('저장성공');
  };

  return (
    <MyFeedDetailModal
      onClose={() => dispatch(__modalOpen(false))}
      open={modalOpen}
      id={mainFeedDetail?.feed_id}
    >
      <StXIcon onClick={() => dispatch(__modalOpen(false))}>X</StXIcon>
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
            <img src={require('../../빡빡이1.png')} alt="detail-img" />
            <div className="detail-info">
              <div className="detail-top" style={{ display: 'flex' }}>
                <p>{mainFeedDetail.mbti?.toUpperCase()}</p>
              </div>
              <p>{mainFeedDetail.description}</p>
              <RouteButton style={{ marginTop: '20px' }}>루트</RouteButton>
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
                  <div className="detail-btn">좋</div>
                  <div className="detail-btn">댓</div>
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
              {mainFeedDetail?.comment?.map((comment: any) => {
                return (
                  <StDetailComment key={comment.comment_id}>
                    <img src={require('../../빡빡이1.png')} alt="detail-img" />
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
    </MyFeedDetailModal>
  );
};

export default FeedDetailModal;

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
const RouteButton = styled.div`
  cursor: pointer;
`;
const RouteShow = styled.div<IAppState>`
  display: ${props => (props.show ? 'none' : '')};
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
        background-color: #d9d9d9;
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
  height: 403px;
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
    right: -10px;
  }
`;
