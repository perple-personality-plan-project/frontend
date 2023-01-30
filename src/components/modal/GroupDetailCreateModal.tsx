import React, { useState, useEffect } from 'react';
import ImagePreviewMultiHook from '../hooks/ImagePreviewMultiHook';
import styled from 'styled-components';
import GroupModalTemplate from './GroupModalTemplate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import { useAppDispatch, useAppSelector } from '../hooks/typescripthook/hooks';
import { __groupFeedList } from '../../redux/modules/groupSlice';
import loggedIn from '../../api/loggedIn';
import { __getMap } from '../../redux/modules/mySlice';

interface Props {
  paramId: any;
}

interface detailCreatePreset {
  location: string;
  thumbnail: [];
  description: string;
}

interface tnumbnailPreset {
  thumbnail: any;
}

interface mapPreset {
  created_at: string;
  map_id: number;
  place_group: string;
  place_group_name: string;
  updated_at: string;
  user_id: number;
}

const GroupDetailCreateModal: React.FC<Props> = ({ paramId }) => {
  const { imageSrc, setImageSrc, handleImagePreview } = ImagePreviewMultiHook();
  const [toggle, setToggle] = useState(false);
  const [route, setRoute] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<tnumbnailPreset['thumbnail']>([]);
  const [groupInfos, setgroupInfos] = useState<detailCreatePreset>({
    description: '',
    location: '',
    thumbnail: [],
  });

  const maplist: mapPreset[] = useAppSelector(store => store.mypage.maplist);
  const userId = sessionStorage.getItem('userId');

  const dispatch = useAppDispatch();

  const filtered = maplist.filter((map: any) => map.place_group_name === route);

  // console.log(JSON.stringify(filtered[0]));

  const closeModal = () => {
    setIsOpen(false);
    setImageSrc([]);
    setRoute('');
    setThumbnail([]);
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
    await loggedIn.post(
      `api/group/${paramId.id}/feed?user_id=${userId}`,
      formData,
    );
    await dispatch(__groupFeedList({ id: paramId.id, userId: userId }));
  };

  const sendData = async () => {
    const formData = new FormData();
    for (let i = 0; i < thumbnail?.length; i++) {
      formData.append('thumbnail', thumbnail[i]);
    }
    formData.append('location', JSON.stringify(filtered[0]));
    formData.append('description', groupInfos.description);

    if (groupInfos.description === '') {
      alert('게시글 내용을 작성해주세요!');
    } else if (route === '') {
      alert('루트를 추가해주세요!');
    } else if (thumbnail?.length < 1) {
      alert('사진을 최소 한장 이상 등록해주세요!');
    } else if (groupInfos.description && route !== '' && thumbnail) {
      fetchData(formData);
      setIsOpen(false);
      setImageSrc([]);
      setRoute('');
      setThumbnail([]);
      alert('게시글 작성 완료!');
    }
  };

  useEffect(() => {
    dispatch(__getMap());
  }, []);

  return (
    <div>
      <StModalIcon onClick={() => setIsOpen(true)}>
        <i
          className="ri-add-circle-fill"
          style={{ fontSize: '69px', color: '#644eee' }}
        ></i>
      </StModalIcon>

      <GroupModalTemplate closeModal={closeModal} open={isOpen}>
        <StGroupContainer>
          <StCloseIcon onClick={closeModal}>
            {/* <i style={{color: 'white'}} className="ri-close-circle-fill"></i> */}
            <i style={{ color: 'white' }} className="ri-close-line"></i>
          </StCloseIcon>
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
                          setToggle(prev => !prev);
                          setRoute('');
                        }}
                      ></StCategory>
                      {maplist.map((map: any, index: number) => {
                        return (
                          <StCategory
                            key={index}
                            onClick={() => {
                              setToggle(prev => !prev);
                              setRoute(map.place_group_name);
                            }}
                          >
                            {map.place_group_name}
                          </StCategory>
                        );
                      })}
                      <StCategory
                        onClick={() => {
                          setToggle(prev => !prev);
                          setRoute('없음');
                        }}
                      >
                        없음
                      </StCategory>
                    </StCategoryGroup>
                    {/* <div
                      onClick={() => setToggle(prev => !prev)}
                      className="tag-btn"
                    >
                      -
                    </div> */}
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
                        {route}
                      </StCategory>
                    </StCategoryGroup>
                    {/* <div
                      onClick={() => setToggle(prev => !prev)}
                      className="tag-btn"
                    >
                      +
                    </div> */}
                  </div>
                )}
              </StGroupInput>

              <StGroupTextArea>
                <p>내용 작성</p>
                <textarea
                  name="description"
                  onChange={e => handleGroupInfo(e)}
                  maxLength={100}
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
  margin: 0 auto;

  h1 {
    margin-top: 0;
    font-size: 18px;

    @media screen and (max-width: 800px) {
      max-width: 250px;
      /* margin: 0 auto 10px; */
    }
  }

  @media screen and (max-width: 800px) {
    max-width: 350px;
    width: 100%;
    /* margin: 0 auto 10px; */
  }
`;

const StGroup = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 800px) {
    /* max-width: 250px; */

    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    /* justify-content: center; */
  }
`;

const StGroupImgSwiper = styled.div`
  position: relative;
  width: 100%;
  max-width: 370px;
  height: 100%;

  p {
    font-size: 13px;
    color: gray;
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
    width: 100%;
    max-width: 300px;
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
    max-width: 270px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    max-width: 250px;
  }

  @media screen and (max-width: 970px) {
    width: 100%;
    max-width: 220px;
  }

  @media screen and (max-width: 850px) {
    width: 100%;
    max-width: 200px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    max-width: 270px;
  }
`;

const StGroupImg = styled.div`
  position: relative;
  width: 100%;
  max-width: 450px;

  p {
    margin: 0 0 10px 0;
    font-size: 13px;
    color: gray;
  }
  img {
    width: 100%;
    border-radius: 10px;
    background-color: #f5f5f5;
    //max-width: 500px;
  }

  label {
    /* max-width: 330px; */
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
    /* max-width: 250px; */
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
    font-size: 13px;
    color: gray;
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

  &:hover {
    background-color: #ada6d8;
    color: white;
  }

  &:first-of-type {
    &:hover {
      background-color: white;
      color: black;
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
  * {
    box-sizing: border-box;
  }
  p {
    color: gray;
    font-size: 13px;
    margin: 0 0 5px 0;
  }
  textarea {
    outline: none;
    aspect-ratio: 5/3.5;
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
  background-color: #5f4cd2;
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
  font-size: 17px;

  position: absolute;
  border-radius: 50%;
  border: 0;
  width: 25px;
  height: 25px;
  font-weight: bold;
  background-color: #e1e2e8;

  top: 10px;
  right: 10px;

  cursor: pointer;
`;

const StModalIcon = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;

  cursor: pointer;

  p {
    position: absolute;
    top: -22px;
  }

  @media screen and (min-width: 1440px) {
    bottom: 50%;
    left: 50%;
    transform: translate(600px, 400px);
  }

  @media screen and (max-width: 500px) {
    bottom: 60px;
    right: 60px;
  }
`;
