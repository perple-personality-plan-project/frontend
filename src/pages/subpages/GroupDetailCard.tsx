import React, { useState } from 'react';
import styled from 'styled-components';

import { GroupDetailCardModal } from '../../components/modal/GroupDetailCardModal';

interface Props {
  post: {
    locationId: number;
    locationName: string;
    locationRoute: string;
    postTag: string;
    postDetail: string;
    thumbnail: string[];
  };
}

const GroupDetailCard: React.FC<Props> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StGroupPost key={post.locationId}>
      <div onClick={() => setIsOpen(true)} className="post-container">
        <div className="post-header">
          <div className="post-header-info">
            <img
              style={{ width: '40px', height: '40px' }}
              src={require('../../빡빡이1.png')}
              alt="group-img"
            />
            <h3>{post.locationName}</h3>
            <p>{post.postTag}</p>
          </div>
          <div className="post-header-route">{post.locationRoute}</div>
        </div>

        <img src={post.thumbnail[0]} alt="group-img" />
        <div className="post-desc">
          <p>{post.postDetail}</p>
          <div className="post-bottom">
            <p className="post-date">2022.12.29</p>
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
        id={post.locationId}
      >
        <StXIcon onClick={() => setIsOpen(false)}>X</StXIcon>
        <StDetailContainer>
          <img src={require('../../빡빡이1.png')} alt="detail-img" />
          <StDetailInfo>
            <StDetailDesc>
              <img src={require('../../빡빡이1.png')} alt="detail-img" />
              <div className="detail-info">
                <div className="detail-top" style={{ display: 'flex' }}>
                  <h2>{post.locationName}</h2>
                  <p>{post.postTag}</p>
                </div>
                <p>{post.postDetail}</p>
                <div className="detail-bottom">
                  <p>2012.12.29</p>
                  <div style={{ display: 'flex' }}>
                    <div className="detail-btn">좋</div>
                    <div className="detail-btn">댓</div>
                    <div className="detail-btn">저장</div>
                  </div>
                </div>
              </div>
            </StDetailDesc>
            <StDetailBorder></StDetailBorder>
            <StDetailComment></StDetailComment>
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

  img {
    max-width: 600px;
    width: 60%;
    background-color: #b6b6b6;
  }
`;

const StDetailInfo = styled.div`
  padding: 20px;
  max-width: 400px;
  width: 40%;
  background-color: #f0f0f0;
`;

const StDetailDesc = styled.div`
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

    p {
      margin: 0;
      /* width: 20ch; */
    }
  }

  .detail-top {
    display: flex;
    align-items: center;
    margin: 0 0 10px 0;
    font-size: 15px;
    h2 {
      font-size: 15px;
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

  .detail-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

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
`;

const StDetailComment = styled.div``;

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
  .post-container {
    position: relative;
    /* margin: 20px; */
    width: 330px;

    /* height: 400px; */

    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      background-color: #f0f0f0;
    }

    .post-header {
      background-color: pink;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* position: absolute; */
      width: 100%;
      padding: 10px;
      box-sizing: border-box;

      .post-header-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          background-color: pink;
          border-radius: 50%;
          margin-right: 10px;
        }

        h3 {
          margin: 0;
          font-size: 15px;
          margin-right: 10px;
        }

        p {
          background-color: white;
          border-radius: 20px;
          font-size: 12px;
          padding: 5px 15px;
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
      width: 400px;
    }
  }
`;
