import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/GroupModal';
import { useNavigate } from 'react-router';

const GroupPage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [groups, setGroups] = useState([
    {
      groupId: 1,
      title: '미친 텐션의 술집 정보',
    },
    {
      groupId: 2,
      title: '미친 텐션의 술집 정보',
    },
    {
      groupId: 3,
      title: '미친 텐션의 술집 정보',
    },
    {
      groupId: 4,
      title: '미친 텐션의 술집 정보',
    },
  ]);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  console.log(imageSrc);

  const closeModal = () => {
    setIsOpen(false);
    setImageSrc('');
  };

  return (
    <StContainer>
      <StInputContainer>
        <StUpperInput placeholder="원하는 그룹을 검색해 보세요!" />
      </StInputContainer>
      <StRecommend>검색이 어려우시다고요? 추천해 드릴게요!</StRecommend>
      <StRecommendLists>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
        <StRecommendList>카페</StRecommendList>
      </StRecommendLists>
      <StGroups>
        {groups.map(group => {
          return (
            <StGroup
              key={group.groupId}
              onClick={() => navigate(`/${group.groupId}`)}
            >
              <img src={require('../빡빡이1.png')} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <h2>{group.title}</h2>
                <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
              </div>
            </StGroup>
          );
        })}
      </StGroups>
      <StModalIcon
        onClick={() => setIsOpen(true)}
        src={require('../빡빡이1.png')}
      />

      <Modal closeModal={closeModal} open={isOpen}>
        <StModalContainer>
          <StFlexCentered>
            <StModalImgContainer>
              {imageSrc ? (
                <StModalImgLabel htmlFor="roomImg">
                  <img src={imageSrc} alt="roomImg" />
                </StModalImgLabel>
              ) : (
                <StModalImgLabel htmlFor="roomImg">이미지 추가</StModalImgLabel>
              )}
              <StModalImgInput
                onChange={e => handleImagePreview(e)}
                type="file"
                accept="image/*"
                id="roomImg"
              />
            </StModalImgContainer>
            <div style={{ width: '100%' }}>
              <div>
                <label style={{ display: 'block' }}>방 이름</label>
                <StModalInput />
              </div>
              <div>
                <label style={{ display: 'block' }}>방 설명</label>
                <StModalTextArea />
              </div>
            </div>
          </StFlexCentered>

          <StModalButtonContainer style={{ marginTop: '10px' }}>
            <StModalButton>생성하기</StModalButton>
            <StModalButton onClick={() => closeModal()}>닫기</StModalButton>
          </StModalButtonContainer>
        </StModalContainer>
      </Modal>
    </StContainer>
  );
};

export default GroupPage;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 100vh; */
  /* padding: 10px; */
  margin: 0 auto;
`;

const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`;

const StFlexCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    /* width: 100%; */

    /* justify-content: center; */
    /* align-items: center; */
  }
`;

const StModalButtonContainer = styled.div`
  @media screen and (max-width: 800px) {
    width: 100%;

    &:first-of-type {
      margin: 0 0 5px 0;
    }
  }
`;

const StModalButton = styled.button`
  width: 100px;
  padding: 10px;

  border-radius: 10px;
  border: 0;
  color: gray;
  border: 1px solid gray;
  background-color: white;

  cursor: pointer;

  :hover {
    color: white;
    background-color: gray;
  }
  &:first-of-type {
    margin-right: 5px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;

    &:first-of-type {
      margin: 0 0 5px 0;
    }
  }
`;

const StModalImgContainer = styled.div`
  img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    /* margin-right: 10px; */
  }
`;

const StModalImgLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;

  width: 120px;
  height: 120px;
  background-color: white;
  cursor: pointer;

  margin-right: 10px;
  border: 1px solid gray;
  border-radius: 10px;

  @media screen and (max-width: 800px) {
    margin: 0;
  }
`;

const StModalImgInput = styled.input`
  display: none;
`;

const StModalInput = styled.input`
  width: 100%;
  height: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 15px;
`;

const StModalTextArea = styled.textarea`
  text-indent: 10px;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  resize: none;
`;

//원하는 그룹을 검색해 보세요!
const StInputContainer = styled.div`
  margin: 20px 0 0 20px;
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    width: 100%;

    margin: 20px 0 0 0;
  }
`;

//원하는 그룹을 검색해 보세요!
const StUpperInput = styled.input`
  width: 95%;
  max-width: 50%;
  height: 20px;
  padding: 10px;
  border-radius: 20px;
  border: 0;
  background-color: #f1f1f1;

  text-indent: 12px;
  margin: 0 0 20px 0;

  @media screen and (max-width: 800px) {
    margin: 0 auto 20px auto;
    width: 100%;
  }
`;

//검색이 어려우시다고요? 추천해 드릴게요!
const StRecommend = styled.p`
  color: #7a7a7a;
  font-size: 12px;
  padding: 0 0 0 50px;
  margin-bottom: 20px;

  @media screen and (max-width: 800px) {
    padding: 0;
    text-align: center;
  }
`;

//해시태그 그룹
const StRecommendLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;

  div {
    &:first-of-type {
      margin-left: 45px;
    }
  }
  /* div {
    &:last-of-type {
      margin-right: 45px;
    }
  } */
`;

//해시태그
const StRecommendList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 30px;
  color: #7a7a7a;
  margin: 5px;

  border-radius: 20px;
  background-color: #f5f5f5;
`;

//그룹 컨테이너
const StGroups = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 0 15px;
  gap: 10px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

//그룹
const StGroup = styled.div`
  display: flex;
  padding: 20px;
  box-shadow: 0px 0px 13.6122px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  cursor: pointer;

  img {
    border-radius: 10px;
  }
  h2 {
    margin: 20px 0 0 0;
  }

  p {
    margin: 0 0 20px 0;
  }
`;

const StModalIcon = styled.img`
  width: 60px;
  height: 60px;

  position: fixed;
  bottom: 100px;
  right: 100px;

  cursor: pointer;
`;
