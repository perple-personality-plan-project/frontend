import React, { useState } from 'react';
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
import { __groupFeedDetail } from '../../redux/modules/groupSlice';
import nonTokenClient from '../../api/noClient';
import loggedIn from '../../api/loggedIn';

interface feedCardPreset {
  feed: groupFeedPreset;
  paramId: object;
  groupSubscribe: object;
}

const GroupDetailCard: React.FC<feedCardPreset> = ({
  feed,
  paramId,
  groupSubscribe,
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
  } = feed;

  const { groupFeedDetail }: any = useAppSelector(store => store.group);
  const [comment, setComment] = useState('');
  const created = created_at.split('T');

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
        dispatch(__groupFeedDetail({ groupId: groupId, feedId: feed_id }));
        setComment('');
      } else {
        alert('그룹을 구독해주세요!');
        setComment('');
      }
    } else {
      alert('댓글을 입력해주세요!');
    }
  };

  const deleteComment = async (commentId: string | number) => {
    await loggedIn.delete(
      `api/group-comment/group/${groupId}/feed/${feed_id}/${commentId}`,
    );
    dispatch(__groupFeedDetail({ groupId: groupId, feedId: feed_id }));
  };

  const openModal = () => {
    setIsOpen(true);
    dispatch(__groupFeedDetail({ groupId: groupId, feedId: feed_id }));
  };

  return (
    <StGroupPost>
      <div onClick={openModal} className="post-container">
        <div className="post-header">
          <div className="post-header-info">
            <img
              style={{ width: '40px', height: '40px' }}
              src={require('../../빡빡이1.png')}
              alt="group-img"
            />
            <h3>{nickname}</h3>
            <p>{mbti.toUpperCase()}</p>
          </div>
          <div className="post-header-route">{location}</div>
        </div>

        <img
          src={process.env.REACT_APP_IMG_SERVER + thumbnail.split(',')[0]}
          alt="group-img"
        />
        <div className="post-desc">
          <p>{description}</p>
          <div className="post-bottom">
            <p className="post-date">{date}</p>
            <div className="post-bottom-right">
              <div className="post-bottom-icon">A</div>
              <div className="post-bottom-icon">B</div>
              <div className="post-bottom-icon">C</div>
            </div>
          </div>
        </div>
      </div>

      <GroupDetailCardModal
        onClose={() => setIsOpen(false)}
        open={isOpen}
        id={groupFeedDetail?.feed_id}
      >
        <StXIcon onClick={() => setIsOpen(false)}>X</StXIcon>
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
              <img src={require('../../빡빡이1.png')} alt="detail-img" />
              <div className="detail-info">
                <div className="detail-top" style={{ display: 'flex' }}>
                  <h2>{nickname}</h2>
                  <p>{mbti.toUpperCase()}</p>
                </div>
                <p style={{ fontSize: '14px' }}>{description}</p>
                <div className="detail-bottom">
                  <p>{date}</p>
                  <div style={{ display: 'flex' }}>
                    <div className="detail-btn">좋</div>
                    <div className="detail-btn">댓</div>
                    <div className="detail-btn">저장</div>
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
                {groupFeedDetail?.comment?.map((comment: any) => {
                  return (
                    <StDetailComment key={comment.comment_id}>
                      <img
                        src={require('../../빡빡이1.png')}
                        alt="detail-img"
                      />
                      <div className="detail-info">
                        <div className="detail-top" style={{ display: 'flex' }}>
                          <h2 className="detail-nickname">
                            {comment.nickname}
                          </h2>
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
            </div>
          </StDetailInfo>
        </StDetailContainer>
      </GroupDetailCardModal>
    </StGroupPost>
  );
};

export default GroupDetailCard;

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
`;

const StDetailInput = styled.div`
  background-color: #f2f2f2;
  border-top: 1px solid #b6b6b6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 10%;
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
  background-color: white;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const StDetailDesc = styled.div`
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  display: flex;
  img {
    margin-right: 10px;
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

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 300px;
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

const StDetailBorder = styled.div`
  border-bottom: 1px solid #b6b6b6;
  margin-top: 10px;
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
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

    filter: brightness(100%);

    img {
      aspect-ratio: 1/1;
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
      margin: 15px;
      p {
        max-width: 25ch;
        margin: 0 0 40px 0;
        overflow: auto;
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

    .post-bottom-right {
      display: flex;

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
      width: 460px;
    }
    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;
