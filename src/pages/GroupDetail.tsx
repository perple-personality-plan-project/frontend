import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import GroupDetailCreateModal from '../components/modal/GroupDetailCreateModal';
import GroupDetailCard from './subpages/GroupDetailCard';

export interface groupPostPreset {
  locationId: number;
  locationName: string;
  locationRoute: string;
  postTag: string;
  postDetail: string;
  thumbnail: string[];
  index: number;
}

const GroupDetail = () => {
  const id = useParams();
  const [groupPosts, setGroupPosts] = useState<groupPostPreset[]>([
    {
      locationId: 1,
      locationName: '닉네임',
      locationRoute: '왕십리',
      postTag: '["ENFP", "ENFP"]',
      postDetail: '오랜만에 왕십리 곱창!! 왕십리 필수 코스!!',
      thumbnail: [
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
      ],
      index: 0,
    },
    {
      locationId: 2,
      locationName: '닉네임',
      postTag: '["INTJ", "ENFP"]',
      locationRoute: '왕십리',
      postDetail: '오랜만에 왕십리 곱창!! 왕십리 필수 코스!!',
      thumbnail: [
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
      ],
      index: 0,
    },
    {
      locationId: 3,
      locationName: '닉네임',
      postTag: '["INFP", "ENFP"]',
      locationRoute: '왕십리',
      postDetail: '오랜만에 왕십리 곱창!! 왕십리 필수 코스!!',
      thumbnail: [
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
      ],
      index: 0,
    },
    {
      locationId: 4,
      locationName: '닉네임',
      postTag: '["ESFJ", "ENFP"]',
      locationRoute: '왕십리',
      postDetail: '오랜만에 왕십리 곱창!! 왕십리 필수 코스!!',
      thumbnail: [
        'https://sblawsimage.s3.ap-northeast-2.amazonaws.com/%EB%B9%A1%EB%B9%A1%EC%9D%B4.PNG',
      ],
      index: 0,
    },
  ]);
  return (
    <div>
      <StBgImages></StBgImages>
      <StContainer>
        <StMainContainer>
          <StGroupInfo>
            <div className="group-info">
              <img src={require('../빡빡이1.png')} alt="group-img" />
              <div className="group-text">
                <h1>미친 텐션의 술집 정보</h1>
                <p>게시물 ?개 / ?명이 소통중이에요 </p>
              </div>
            </div>
            <div className="group-tag-container">
              <div className="group-tag"># 태그</div>
              <div className="group-tag"># 태그</div>
              <div className="group-tag"># 태그</div>
              <div className="group-tag"># 태그</div>
              <div className="group-tag"># 태그</div>
              <div className="group-tag"># 태그</div>
              <div className="group-tag"># 태그</div>
              <div className="group-tag"># 태그</div>
              <div className="group-tag"># 태그</div>
            </div>
            <div className="group-horizontal-line" />
            <div className="group-intro">
              <h2>그룹 소개</h2>
              <p>
                E 들의 집합소❤️❤️❤️❤️❤ 신나는 분위기의 술집 정보 공유방입니다. ️
                마음에 쏙 드는 곳이 있다면 게시글로 남겨주세요!
              </p>
            </div>
          </StGroupInfo>
        </StMainContainer>
        <StPostContainer>
          <h2>그룹 게시글</h2>
          <StGroupPosts>
            {/* <div className="post-add-btn">+</div> */}
            {groupPosts.map(post => (
              <GroupDetailCard key={post.locationId} post={post} />
            ))}
          </StGroupPosts>
        </StPostContainer>

        <GroupDetailCreateModal
          setGroupPosts={setGroupPosts}
          groupPosts={groupPosts}
        />
      </StContainer>
    </div>
  );
};

export default GroupDetail;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
  }
`;

const StPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  h2 {
    width: 150px;
    margin-left: 50px;
    font-size: 13px;
    color: #a9a9a9;
  }

  @media screen and (max-width: 900px) {
    h2 {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const StBgImages = styled.div`
  background-color: #f3f3f3;
  height: 250px;
`;

const StMainContainer = styled.div`
  width: 400px;
  min-width: 400px;

  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: 100%;
  }
`;

const StGroupInfo = styled.div`
  img {
    width: 100px;
    height: 100px;
  }
  .group-info {
    display: flex;
    align-items: center;
  }

  .group-text {
    display: flex;
    flex-direction: column;

    h1,
    p {
      margin: 0;
      padding: 0;

      font-size: 13px;
    }

    h1 {
      margin-bottom: 10px;
      font-size: 25px;
    }
  }

  .group-tag-container {
    display: flex;
    flex-wrap: wrap;

    .group-tag {
      background-color: #eeeeee;
      color: #888888;
      padding: 5px 15px;
      border-radius: 10px;

      margin: 0 10px 10px 0;
      font-size: 13px;
    }
  }

  .group-horizontal-line {
    border-bottom: 2px solid #eeeeee;
    margin: 30px 0;
  }

  .group-intro {
    h2,
    p {
      font-size: 13px;
    }

    h2 {
      color: #a9a9a9;
    }

    p {
      color: #5b5b5b;
    }
  }
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
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

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
    margin-left: 0px;
  }
`;

const StGroupPosts = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 50px;
  position: relative;
  width: 100%;

  .post-add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #565656;
    color: white;
    position: fixed;
    z-index: 1;

    bottom: 80px;
    right: 60px;

    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
    margin-left: 0px;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;
