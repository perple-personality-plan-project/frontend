import React, { useState } from 'react';
import ImageServerMultiHook from '../hooks/ImageServerMultiHook';
import ImagePreviewMultiHook from '../hooks/ImagePreviewMultiHook';
import styled from 'styled-components';

import GroupModalTemplate from './GroupModalTemplate';
import { nanoid } from 'nanoid';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import { groupPostPreset } from '../../pages/GroupDetail';

interface tagPreset {
  id: string;
  tag: string;
}

interface Props {
  setGroupPosts: React.Dispatch<any>;
  groupPosts: groupPostPreset[];
}

const GroupDetailCreateModal: React.FC<Props> = ({
  setGroupPosts,
  groupPosts,
}) => {
  const { thumbnail, handleFileAWS } = ImageServerMultiHook();
  const { imageSrc, setImageSrc, handleImagePreview } = ImagePreviewMultiHook();

  const [picIndex, setPicIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [tagSet, setTagSet] = useState<tagPreset[]>([]);
  const [groupInfos, setgroupInfos] = useState<groupPostPreset>({
    locationId: 1,
    locationName: '',
    locationRoute: '',
    postTag: '',
    postDetail: '',
    thumbnail: [],
    index: 0,
  });

  console.log(imageSrc);

  const tagSetToString = tagSet.map(tag => tag.tag).join('');

  const closeModal = () => {
    setIsOpen(false);
    setImageSrc([]);
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
      thumbnail[0] !== '' &&
      groupInfos.locationName &&
      groupInfos.postDetail
    ) {
      setIsOpen(false);
      setImageSrc([]);
      setTag('');
      setTagSet([]);
      //백엔드 서버에 ...groups정보랑 tagSetToString, thumbnail 보내주면 됌
      setGroupPosts([
        ...groupPosts,
        {
          ...groupInfos,
          postTag: tagSetToString,
          thumbnail: thumbnail,
          index: picIndex,
        },
      ]);

      alert('게시글 작성 완료!');
    } else {
      alert('형식을 모두 작성해주세요');
    }
  };

  //버튼을 클릭 했을 때 ImagePreviewMultiHook에서 이미지와 함께 포함시킨 id값과 클릭한 id값을
  //비교해서 일치하면 이미지와 함께 포함시킨 toggle값을 true로 만들어주고 나머지는 false로 만들어줌
  //(하나만 선택되고 나머지는 선택해제)
  //ImagePreviewMultiHook에서 id값을 0부터 했기 때문에 (이미지 프리뷰에서 보이는 이미지의 순서와 같음)
  //setPicIndex에 id값을 넣어 이미지 순서와 맞추고 그 값을 sendData에 저장시켜 GroupDetail에 보내줌
  //sendData에 저장된 index값을 GroupDetailCard에서 메인 이미지를 보여주기 위해 thumbnail[index]로 보여줌
  const selectMainPic = (id: number) => {
    imageSrc.map((img, index) => (img.id === id ? setPicIndex(id) : null));

    setImageSrc(prev =>
      prev.map(img =>
        img.id === id ? { ...img, toggle: true } : { ...img, toggle: false },
      ),
    );
    alert('메인 사진으로 등록되었습니다!');
  };

  return (
    <div>
      <StModalIcon onClick={() => setIsOpen(true)}>
        <p>+</p>
      </StModalIcon>

      <GroupModalTemplate closeModal={closeModal} open={isOpen}>
        <StGroupContainer>
          <StCloseIcon onClick={closeModal}>X</StCloseIcon>
          <h1>게시글 생성하기</h1>
          <StGroup>
            {imageSrc.length !== 0 ? (
              <StGroupImgSwiper>
                <p>사진 등록</p>
                <label htmlFor="img">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    style={{ width: '100%' }}
                    // style={{ width: '300px' }}
                  >
                    {imageSrc.map(img => {
                      return (
                        <SwiperSlide style={{ aspectRatio: '1/1' }}>
                          <img src={img.data} alt="swiper-img" />
                          {/* toggle이 true일 때 click된 버튼 보여줌 */}
                          {img.toggle ? (
                            <button
                              className="V-button-clicked"
                              onClick={() => selectMainPic(img.id)}
                            >
                              V
                            </button>
                          ) : (
                            <button
                              className="V-button"
                              onClick={() => selectMainPic(img.id)}
                            >
                              V
                            </button>
                          )}
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </label>
                <input
                  multiple
                  accept="image/*"
                  onChange={e => {
                    handleImagePreview(e);
                    handleFileAWS(e);
                  }}
                  id="img"
                  type="file"
                />
              </StGroupImgSwiper>
            ) : (
              <StGroupImg>
                <p>사진 등록</p>
                <label htmlFor="img">사진 등록</label>
                <input
                  multiple
                  accept="image/*"
                  onChange={e => {
                    handleImagePreview(e);
                    handleFileAWS(e);
                  }}
                  id="img"
                  type="file"
                />
              </StGroupImg>
            )}

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

const StGroupImgSwiper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 100%;

  p {
    margin: 0 0 10px 0;
  }
  img {
    width: 100%;
    height: 100%;

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
    /* height: 100%; */
    /* background-color: #f5f5f5; */
    cursor: pointer;
    /* border: 1px solid #d9d9d9; */
    border-radius: 10px;
  }

  input {
    display: none;
  }

  .V-button {
    /* font-size: 200px; */
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #c6dcf3;
    border: 0;
    cursor: pointer;

    /* &:hover {
      background-color: dodgerblue;
    } */
  }
  .V-button-clicked {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: dodgerblue;
    border: 0;
    cursor: pointer;
  }

  @media screen and (max-width: 1400px) {
    max-width: 300px;
  }

  @media screen and (max-width: 1024px) {
    max-width: 250px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    max-width: 250px;
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

  p {
    position: absolute;
    top: -22px;
  }

  @media screen and (max-width: 500px) {
    bottom: 60px;
    right: 60px;
  }
`;
