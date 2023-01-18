import React from 'react';
import { groupPreset } from '../GroupPage';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

interface groupCardPreset {
  group: groupPreset;
}

const GroupCard: React.FC<groupCardPreset> = ({ group }): JSX.Element => {
  const navigate = useNavigate();
  const {
    group_id,
    group_name,
    thumbnail,
    description,
    feedCount,
    group_user_count,
    hashtags,
  } = group;

  return (
    <StGroupContainer>
      <StIcons>
        <button onClick={() => console.log('a')} className="icon">
          A
        </button>
        <button onClick={() => console.log('b')} className="icon">
          B
        </button>
      </StIcons>
      <StGroup key={group_id} onClick={() => navigate(`/${group_id}`)}>
        <div className="img-container">
          <img
            src={process.env.REACT_APP_IMG_SERVER + thumbnail}
            alt="group-img"
          />
        </div>
        <div className="info-vertical">
          <h2>{group_name}</h2>
          <p>
            게시글 {feedCount}개 / {group_user_count}명이 구독중이에요
          </p>
          <div className="btn-group">
            {hashtags?.length !== 0 ? (
              hashtags
                ?.split(',')
                ?.map((tag, index) => <button key={index}>{tag}</button>)
            ) : (
              <p>태그가 없습니다</p>
            )}
          </div>
        </div>
      </StGroup>
    </StGroupContainer>
  );
};

export default GroupCard;

const StGroupContainer = styled.div`
  position: relative;

  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 0 15px;
    /* height: 276px; */
  }
`;

const StIcons = styled.div`
  position: absolute;
  display: flex;
  top: 20px;
  right: 20px;

  z-index: 1;

  .icon:nth-of-type(2) {
    margin-left: 5px;
  }

  .icon {
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: pink;
  }
  @media screen and (max-width: 500px) {
    /* display: none; */
    top: 50%;
    transform: translate(0, -280%);
    left: 55px;
  }
`;

const StGroup = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 13.6122px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  cursor: pointer;
  width: 550px;
  position: relative;
  /* height: 276px; */

  h2 {
    font-size: 20px;
    margin: 15px 0 5px 0;
  }

  p {
    color: #8e8e8e;
    font-size: 13px;
    margin: 0 0 0 0;
  }

  .img-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;

    img {
      /* aspect-ratio: 1/1;
      width: 100%; */
      width: 130px;
      height: 130px;
      border-radius: 10px;
    }

    @media screen and (max-width: 500px) {
      height: 170px;
      flex-direction: row;
      align-items: flex-end;
    }
  }

  .btn-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;

    button {
      font-size: 12px;
      color: #888888;
      max-width: 20ch;
      border-radius: 20px;
      border: 0;
      padding: 5px 15px;
      cursor: pointer;
    }
  }

  .info-vertical {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    box-sizing: border-box;
  }
`;