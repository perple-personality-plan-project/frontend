import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import { useAppDispatch, useAppSelector } from '../hooks/typescripthook/hooks';
import { __FeedPost, __myFeed } from '../../redux/modules/mySlice';
import GroupModalTemplate from './GroupModalTemplate';
import ImagePreviewMultiHook from '../hooks/ImagePreviewMultiHook';

interface detailCreatePreset {
  location: string;
  thumbnail: [];
  description: string;
}

interface tnumbnailPreset {
  thumbnail: any;
}

const FeedModal: React.FC = () => {
  const { imageSrc, setImageSrc, handleImagePreview } = ImagePreviewMultiHook();
  const [toggle, setToggle] = useState(false);
  const [route, setRoute] = useState<any>();
  const [routeName, setRouteName] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<tnumbnailPreset['thumbnail']>();
  const [groupInfos, setgroupInfos] = useState<detailCreatePreset>({
    description: '',
    location: '',
    thumbnail: [],
  });
  const dispatch = useAppDispatch();

  const mapList = useAppSelector((store: any) => store.mypage.maplist);

  const closeModal = () => {
    setIsOpen(false);
    setImageSrc([]);
  };

  const handleGroupInfo = (e: any) => {
    const { name, value } = e.target;
    setgroupInfos({ ...groupInfos, [name]: value });
  };

  const handleSetThumbnail = (e: any) => {
    const tumbnailArr = [];
    for (let i = 0; i < e.target.files.length; i++) {
      tumbnailArr[i] = e.target.files[i];
    }
    setThumbnail([...tumbnailArr]);
  };

  const fetchData = async (formData: any) => {
    // await nonTokenClient.post(`api/group/${paramId.id}/feed`, formData);
    await dispatch(__FeedPost(formData));
    await dispatch(__myFeed());
  };

  const sendData = async () => {
    if (thumbnail === undefined || thumbnail?.length === 0) {
      alert('이미지를 넣어 주세요');
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < thumbnail?.length; i++) {
      formData.append('thumbnail', thumbnail[i]);
    }
    formData.append(
      'location',
      JSON.stringify({
        place_group_name: routeName,
        place_group: route,
      }),
    );

    formData.append('description', groupInfos.description);

    if (groupInfos.description && route !== '') {
      fetchData(formData);
      setIsOpen(false);
      setImageSrc([]);
      setRoute('');
      setThumbnail([]);
      alert('게시글 작성 완료!');
    } else if (thumbnail === undefined || thumbnail?.length === 0) {
      alert('이미지를 넣어 주세요');
    } else {
      alert('형식을 모두 작성해주세요');
    }
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
                  >
                    {imageSrc.map((img, index) => {
                      return (
                        <SwiperSlide key={index} style={{ aspectRatio: '1/1' }}>
                          <img src={img.data} alt="swiper-img" />
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
                    handleSetThumbnail(e);
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
                    handleSetThumbnail(e);
                  }}
                  id="img"
                  type="file"
                />
              </StGroupImg>
            )}
            <StGroupInfo>
              <StGroupInput>
                <p>루트 추가</p>
                {toggle ? (
                  <div style={{ display: 'flex' }}>
                    <StCategoryGroup>
                      <StCategory
                        onClick={() => {
                          setRoute('없음');
                          setRouteName('없음');
                          setToggle(prev => !prev);
                        }}
                      >
                        없음
                      </StCategory>
                      {mapList.map((map: any, index: any) => {
                        return (
                          <StCategory
                            key={index}
                            onClick={() => {
                              setRoute(map.place_group);
                              setRouteName(map.place_group_name);
                              setToggle(prev => !prev);
                            }}
                          >
                            {map.place_group_name}
                          </StCategory>
                        );
                      })}
                    </StCategoryGroup>
                    <div
                      onClick={() => setToggle(prev => !prev)}
                      className="tag-btn"
                    >
                      -
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StCategoryGroup
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <StCategory
                        onClick={() => {
                          setToggle(prev => !prev);
                        }}
                      >
                        {routeName}
                      </StCategory>
                    </StCategoryGroup>
                    <div
                      onClick={() => setToggle(prev => !prev)}
                      className="tag-btn"
                    >
                      +
                    </div>
                  </div>
                )}
              </StGroupInput>
              <StGroupTextArea>
                <p>내용 작성</p>
                <textarea
                  name="description"
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

export default FeedModal;

const StGroupContainer = styled.div`
  position: relative;
  padding: 40px;
  width: 100%;
  max-width: 880px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 0 auto;

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
  p {
    /* display: block; */
    font-size: 14px;
    margin: 0 0 5px 0;
  }

  label {
    /* display: block; */
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

  .tag-btn {
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

const StCategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0 15px 20px; */
  height: 100%;
  flex: 1;
  border: 1px solid gray;
  border-radius: 20px;
  overflow: hidden;
  /* position: absolute; */

  @media screen and (max-width: 800px) {
    left: 0;
  }
`;

const StCategoryHead = styled.button`
  width: 100%;
  height: 30px;
  border: 0;
  font-size: 15px;
  background-color: white;
  cursor: pointer;
`;

const StCategory = styled.button`
  width: 100%;
  height: 30px;
  border: 0;
  font-size: 15px;
  background-color: white;
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
  font-size: 34px;
  width: 60px;
  height: 60px;
  background-color: #644eee;
  color: white;
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 100;

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
