import React, { useState } from 'react';
import ImageServerHook from '../ImageServerHook';
import ImagePreviewHook from '../ImagePreviewHook';
import styled from 'styled-components';

import GroupModalTemplate from './GroupModalTemplate';
import { nanoid } from 'nanoid';

interface tagPreset {
  tag: {
    id: string;
    tag: string;
  };
}

interface groupPreset {
  postInfo: {
    locationId: number;
    locationName: string;
    locationRoute: string;
    postTag: string;
    postDetail: string;
    thumbnail: string;
  };
}

interface Props {
  setGroupPosts: React.Dispatch<any>;
  groupPosts: {
    locationId: number;
    locationName: string;
    locationRoute: string;
    postTag: string;
    postDetail: string;
    thumbnail: string;
  }[];
}

const GroupDetailCreateModal: React.FC<Props> = ({
  setGroupPosts,
  groupPosts,
}) => {
  const { thumbnail, handleFileAWS } = ImageServerHook();
  const { imageSrc, setImageSrc, handleImagePreview } = ImagePreviewHook();

  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [tagSet, setTagSet] = useState<tagPreset['tag'][]>([]);
  const [groupInfos, setgroupInfos] = useState<groupPreset['postInfo']>({
    locationId: 1,
    locationName: '',
    locationRoute: '',
    postTag: '',
    postDetail: '',
    thumbnail: '',
  });

  const tagSetToString = tagSet.map(tag => tag.tag).join('');
  console.log(groupInfos, tagSet, imageSrc);

  const closeModal = () => {
    setIsOpen(false);
    setImageSrc('');
    setTagSet([]);
  };

  const addTag = () => {
    if (tagSet.length < 3) {
      setTagSet([...tagSet, { id: nanoid(), tag: `#${tag}` }]);
      setTag('');
    } else {
      alert('최대 3개까지만 등록 가능 합니다.');
      setTag('');
    }
  };

  console.log(tagSet);

  const deleteTag = (id: number | string) => {
    const filtered = tagSet.filter(tag => tag.id !== id);
    setTagSet(filtered);
  };

  const handleGroupInfo = (e: any) => {
    const { name, value } = e.target;
    setgroupInfos({ ...groupInfos, [name]: value });
  };

  const sendData = () => {
    if (
      tagSet.length > 0 &&
      thumbnail !== '' &&
      groupInfos.locationName &&
      groupInfos.postDetail
    ) {
      setIsOpen(false);
      setImageSrc('');
      setTag('');
      setTagSet([]);
      //백엔드 서버에 ...groups정보랑 tagSetToString, thumbnail 보내주면 됌
      setGroupPosts([
        ...groupPosts,
        { ...groupInfos, postTag: tagSetToString, thumbnail: thumbnail },
      ]);
      // setGroups([
      //   ...groups,
      //   { ...groupInfos, groupTag: tagSetToString, thumbnail: thumbnail },
      // ]);
      alert('게시글 작성 완료!');
    } else {
      alert('형식을 모두 작성해주세요');
    }
  };

  return (
    <div>
      <StModalIcon onClick={() => setIsOpen(true)}>+</StModalIcon>

      <GroupModalTemplate closeModal={closeModal} open={isOpen}>
        <StGroupContainer>
          <StCloseIcon onClick={closeModal}>X</StCloseIcon>
          <h1>게시글 생성하기</h1>
          <StGroup>
            <StGroupImg>
              <p>사진 등록</p>
              {imageSrc ? (
                <label htmlFor="img">
                  <img src={imageSrc} alt="group-img" />
                </label>
              ) : (
                <label htmlFor="img">사진 등록</label>
              )}

              {/* <label htmlFor="img">사진 등록</label> */}
              <input
                onChange={e => {
                  handleImagePreview(e);
                  handleFileAWS(e);
                }}
                id="img"
                type="file"
              />
            </StGroupImg>
            <StGroupInfo>
              <StGroupInput>
                <label>장소 이름</label>
                <input
                  name="locationName"
                  onChange={e => handleGroupInfo(e)}
                  placeholder="내용을 작성해주세요."
                />
              </StGroupInput>
              <StGroupInput>
                <label>태그 작성</label>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <input
                    onChange={e => setTag(e.target.value)}
                    value={tag}
                    placeholder="태그를 추가해주세요. (최대 3개)"
                  />
                  <div onClick={addTag} className="tag-plus">
                    +
                  </div>
                </div>
              </StGroupInput>
              <StTagSet>
                {tagSet.map(tag => {
                  return (
                    <div className="tag-icon" key={tag.id}>
                      {tag.tag}
                      <div
                        onClick={() => deleteTag(tag.id)}
                        className="tag-delete-btn"
                      >
                        X
                      </div>
                    </div>
                  );
                })}
              </StTagSet>
              <StGroupTextArea>
                <p>내용 작성</p>
                <textarea
                  name="postDetail"
                  onChange={e => handleGroupInfo(e)}
                ></textarea>
              </StGroupTextArea>
              <StGroupBtn onClick={sendData}>모두 작성했어요!</StGroupBtn>
            </StGroupInfo>
          </StGroup>
        </StGroupContainer>
      </GroupModalTemplate>
    </div>
  );
};

export default GroupDetailCreateModal;

const StGroupContainer = styled.div`
  position: relative;
  padding: 40px;
  width: 100%;
  max-width: 880px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;

  h1 {
    margin-top: 0;
    font-size: 18px;

    @media screen and (max-width: 800px) {
      max-width: 250px;
      margin: 0 auto 10px;
    }
  }
`;

const StGroup = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 800px) {
    max-width: 250px;

    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    /* justify-content: center; */
  }
`;

const StGroupImg = styled.div`
  position: relative;
  width: 100%;
  max-width: 450px;

  p {
    margin: 0 0 10px 0;
  }
  img {
    width: 100%;
    border-radius: 10px;
    background-color: #f5f5f5;
    //max-width: 500px;
  }

  label {
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5b5b5b;

    box-sizing: border-box;
    width: 100%;
    /* height: 120px; */
    background-color: #f5f5f5;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
  }

  input {
    display: none;
  }

  @media screen and (max-width: 800px) {
    max-width: 250px;
  }
`;

const StGroupInfo = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 450px;
  margin-left: 30px;

  @media screen and (max-width: 800px) {
    margin: 10px 0 0 0;
  }
`;

const StGroupInput = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    text-indent: 5px;
  }

  .tag-plus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    color: black;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
      background-color: #d9d9d9;
      color: white;
    }
  }
`;

const StTagSet = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;

  .tag-icon {
    background-color: #eeeeee;
    border-radius: 10px;
    margin: 0 5px 5px 0;
    font-size: 13px;
    padding: 3px 5px;

    display: flex;
    align-items: center;

    .tag-delete-btn {
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 3px;
      width: 20px;
      height: 20px;
      font-size: 10px;
      background-color: white;

      &:hover {
        color: white;
        background-color: gray;
        cursor: pointer;
      }
    }
  }
`;

const StGroupTextArea = styled.div`
  p {
    font-size: 14px;
    margin: 0 0 5px 0;
  }
  textarea {
    aspect-ratio: 5/3;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    margin: 0;
    width: 100%;
    height: 100%;
    text-indent: 5px;
    resize: none;
  }
`;

const StGroupBtn = styled.div`
  width: 100%;
  background-color: #636363;
  border-radius: 20px;
  color: white;
  font-size: 13px;
  padding: 10px 5px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
`;

const StCloseIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  position: absolute;
  border-radius: 50%;
  border: 0;
  width: 24px;
  height: 24px;

  top: -25px;
  right: -25px;

  cursor: pointer;
`;

const StModalIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 30px;

  width: 60px;
  height: 60px;
  background-color: #565656;
  color: white;

  position: fixed;
  bottom: 50px;
  right: 50px;

  cursor: pointer;

  @media screen and (max-width: 500px) {
    bottom: 60px;
    right: 60px;
  }
`;
