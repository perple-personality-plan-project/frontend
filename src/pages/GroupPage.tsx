import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/GroupModal';
import { useNavigate } from 'react-router';
import { nanoid } from 'nanoid';

interface tagPreset {
  tagSet: string[];
  tag: {
    id: string;
    tag: string;
  };
}

const GroupPage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [tag, setTag] = useState('');
  const [tagSet, setTagSet] = useState<tagPreset['tag'][]>([]);
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

  const closeModal = () => {
    setIsOpen(false);
    setImageSrc('');
    setTagSet([]);
  };

  const addTag = () => {
    setTagSet([...tagSet, { id: nanoid(), tag: `#${tag}` }]);
    setTag('');
  };

  const deleteTag = (id: number | string) => {
    const filtered = tagSet.filter(tag => tag.id !== id);
    setTagSet(filtered);
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
              <img src={require('../빡빡이1.png')} alt="group-img" />
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
          <StCloseIcon onClick={() => closeModal()}>X</StCloseIcon>
          <StFlexCentered>
            <StModalImgContainer>
              {imageSrc ? (
                <StModalImgLabel htmlFor="roomImg">
                  <img src={imageSrc} alt="roomImg" />
                </StModalImgLabel>
              ) : (
                <StModalImgLabel htmlFor="roomImg">사진 등록</StModalImgLabel>
              )}
              <StModalImgInput
                onChange={e => handleImagePreview(e)}
                type="file"
                accept="image/*"
                id="roomImg"
              />
            </StModalImgContainer>

            <StModalInputComponent style={{ width: '100%' }}>
              <label>그룹 이름</label>
              <StModalInput />
            </StModalInputComponent>
            <StModalInputComponent style={{ width: '40%' }}>
              <label>태그 작성</label>
              <StModalTag>
                <StModalInput
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                  style={{ width: '60%', margin: '0 10px 0 0' }}
                />
                <div className="tagBtn" onClick={addTag}>
                  +
                </div>
              </StModalTag>
            </StModalInputComponent>
            <StModalTagLists>
              {tagSet.map(tag => {
                return (
                  <div className="tag-lists" key={tag.id}>
                    <div className="tag-list">{tag.tag}</div>
                    <div
                      onClick={() => deleteTag(tag.id)}
                      className="tag-delete"
                    >
                      <p className="tag-X">x</p>
                    </div>
                  </div>
                );
              })}
            </StModalTagLists>
            <StModalInputComponent style={{ width: '100%' }}>
              <label>내용 작성</label>
              <StModalTextArea />
            </StModalInputComponent>
          </StFlexCentered>

          <StModalButtonContainer style={{ marginTop: '10px' }}>
            <StModalButton>모두 작성했어요!</StModalButton>
            {/* <StModalButton onClick={() => closeModal()}>닫기</StModalButton> */}
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
  /* min-width: 350px; */
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`;

const StModalInputComponent = styled.div`
  font-size: 13px;
  color: #8e8e8e;

  label {
    display: block;
    margin-bottom: 5px;
  }
`;

const StModalTagLists = styled.div`
  display: flex;
  flex-wrap: wrap;

  .tag-lists {
    display: flex;
    align-items: center;
    margin-right: 10px;
    background-color: gray;
    border-radius: 10px;
    padding: 5px;
    margin: 0 5px 10px 0;

    cursor: pointer;
  }

  .tag-list {
    text-indent: 5px;
    font-size: 13px;
    color: white;
  }

  .tag-delete {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    /* background-color: white; */
    border-radius: 100%;
    width: 20px;
    height: 20px;

    font-size: 13px;

    :hover {
      background-color: white;
    }
  }

  .tag-X {
    position: absolute;
    bottom: -10px;
  }
`;

const StModalTag = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .tagBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 30px;
    height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 40%;

    cursor: pointer;
  }
`;

const StCloseIcon = styled.button`
  position: absolute;
  border-radius: 50%;
  border: 0;
  width: 24px;
  height: 24px;

  top: 20px;
  right: -15px;

  cursor: pointer;
`;

const StFlexCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 100%;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

const StModalButtonContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const StModalButton = styled.button`
  width: 100%;
  padding: 10px;

  border-radius: 20px;
  border: 0;
  color: gray;
  border: 1px solid gray;
  background-color: white;

  cursor: pointer;

  :hover {
    color: white;
    background-color: gray;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const StModalImgContainer = styled.div`
  img {
    width: 100%;

    /* height: 120px; */
    border-radius: 10px;
    /* margin-bottom: 10px; */
  }
`;

const StModalImgLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5b5b5b;

  box-sizing: border-box;
  width: 350px;
  height: 120px;
  background-color: #f5f5f5;
  cursor: pointer;

  border: 1px solid #d9d9d9;
  border-radius: 10px;

  margin-bottom: 20px;

  img {
    height: 120px;
    object-fit: contain;
  }

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const StModalImgInput = styled.input`
  width: 100%;
  /* height: 100%; */
  display: none;
`;

const StModalInput = styled.input`
  width: 100%;
  height: 20px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 15px;
`;

const StModalTextArea = styled.textarea`
  text-indent: 10px;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  box-sizing: border-box;
  resize: none;
  border: 1px solid #d9d9d9;
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

  @media screen and (max-width: 500px) {
    bottom: 60px;
    right: 60px;
  }
`;
