import React, { useState, useEffect } from 'react';
import ImagePreviewHook from '../hooks/ImagePreviewHook';
import styled from 'styled-components';

import GroupModalTemplate from './GroupModalTemplate';
import { nanoid } from 'nanoid';

import { groupPreset } from '../../pages/GroupPage';
import { useAppDispatch, useAppSelector } from '../hooks/typescripthook/hooks';
import { __groupGetDate, __groupGetRank } from '../../redux/modules/groupSlice';
import { useNavigate } from 'react-router';
import loggedIn from '../../api/loggedIn';

interface tagPreset {
  id: string;
  tag: string;
}

interface Props {
  setGroupByfilter: React.Dispatch<any>;
  // groupByfilter: groupPreset[];
  filterGroup: string;
}

interface infoProps {
  description: string;
  group_name: string;
  thumbnail?: any;
}

const GroupCreateModal: React.FC<Props> = ({
  setGroupByfilter,
  filterGroup,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { thumbnail, handleFileAWS } = ImageServerHook();
  const [thumbnail, setThumbnail] = useState('');
  const { imageSrc, setImageSrc, handleImagePreview } = ImagePreviewHook();
  const [toggle, setToggle] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [tagSet, setTagSet] = useState<tagPreset[]>([]);
  const [groupInfos, setgroupInfos] = useState<infoProps>({
    description: '',
    group_name: '',
  });

  const tagSetJSON = JSON.stringify(tagSet.map(tag => tag.tag));

  const { groupRank } = useAppSelector(store => store.group);
  const { groupDate } = useAppSelector(store => store.group);

  useEffect(() => {
    if (filterGroup === '인기순') {
      dispatch(__groupGetRank());
    }
    if (filterGroup === '날짜순') {
      dispatch(__groupGetDate());
    }
  }, [toggle]);

  useEffect(() => {
    setGroupByfilter(groupRank);
  }, [groupRank]);

  useEffect(() => {
    setGroupByfilter(groupDate);
  }, [groupDate]);

  const closeModal = () => {
    setIsOpen(false);
    setImageSrc('');
    setTagSet([]);
    setThumbnail('');
  };

  const addTag = () => {
    if (tagSet.length < 5) {
      setTagSet([...tagSet, { id: nanoid(), tag: `#${tag}` }]);
      setTag('');
    } else {
      alert('최대 5개까지만 등록 가능 합니다.');
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

  const handleSetThumbnail = (e: any) => {
    setThumbnail(e.target.files[0]);
  };

  const postDataToServer = async () => {
    try {
      const formData = new FormData();
      formData.append('group_name', groupInfos.group_name);
      formData.append('thumbnail', thumbnail);
      formData.append('description', groupInfos.description);
      formData.append('hashtag', tagSetJSON);
      await loggedIn.post(`api/group`, formData);
      await alert('그룹 작성 완료!');
      if (filterGroup === '인기순') {
        dispatch(__groupGetRank());
      }
      if (filterGroup === '날짜순') {
        dispatch(__groupGetDate());
      }
      // navigate('/group');
    } catch (e: any) {
      if (e.response.status === 400) {
        alert(e.response.data.message);
      }
    }
  };

  const sendData = () => {
    if (groupInfos.group_name === '') {
      alert('그룹명을 작성해주세요!');
    } else if (groupInfos.description === '') {
      alert('그룹 소개를 작성해주세요!');
    } else if (groupInfos.group_name && groupInfos.description) {
      // console.log(thumbnail);
      postDataToServer();
      setIsOpen(false);
      setImageSrc('');
      setTagSet([]);
      setThumbnail('');
    }
    // else {
    //   alert('형식을 모두 작성해주세요');
    // }
  };

  const accessToken = sessionStorage.getItem('accessToken');

  return (
    <div>
      {accessToken !== null ? (
        <StModalIcon onClick={() => setIsOpen(true)}>
          <i
            className="ri-add-circle-fill"
            style={{ fontSize: '69px', color: '#644eee' }}
          ></i>
        </StModalIcon>
      ) : null}

      <GroupModalTemplate closeModal={closeModal} open={isOpen}>
        <StGroupContainer>
          <StCloseIcon onClick={closeModal}>
            <i
              style={{ color: 'white', fontSize: '17px' }}
              className="ri-close-line"
            ></i>
          </StCloseIcon>
          <h1>그룹 생성하기</h1>
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
              <input
                accept="image/*"
                onChange={e => {
                  handleImagePreview(e);
                  handleSetThumbnail(e);
                }}
                id="img"
                type="file"
              />
            </StGroupImg>
            <StGroupInfo>
              <StGroupInput>
                <label>그룹 이름</label>
                <input
                  name="group_name"
                  onChange={e => handleGroupInfo(e)}
                  placeholder="내용을 작성해주세요."
                  maxLength={20}
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
                    maxLength={8}
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
                <p>그룹 소개</p>
                <textarea
                  name="description"
                  onChange={e => handleGroupInfo(e)}
                  maxLength={100}
                ></textarea>
              </StGroupTextArea>
              <StGroupBtn
                onClick={() => {
                  sendData();
                  setToggle(!toggle);
                }}
              >
                모두 작성했어요!
              </StGroupBtn>
            </StGroupInfo>
          </StGroup>
        </StGroupContainer>
      </GroupModalTemplate>
    </div>
  );
};

export default GroupCreateModal;

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

const StGroupImg = styled.div`
  /* position: relative; */
  width: 100%;
  max-width: 450px;

  p {
    margin: 0 0 10px 0;
    font-size: 13px;
    color: gray;
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
    color: gray;
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
  }
  input {
    outline: none;
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    text-indent: 5px;
  }

  .tag-plus {
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    /* color: black; */
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
    color: gray;
    font-size: 13px;
    margin: 0 0 5px 0;
  }
  textarea {
    outline: none;
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
  background-color: #5f4cd2;
  border-radius: 10px;
  color: white;
  font-size: 13px;
  padding: 10px 5px;
  margin-top: 10px;
  /* height: 20px; */
  text-align: center;
  cursor: pointer;
`;

const StCloseIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: #e1e2e8;

  position: absolute;
  border-radius: 50%;
  border: 0;
  width: 25px;
  height: 25px;
  font-weight: bold;

  top: 10px;
  right: 10px;

  cursor: pointer;
`;

const StModalIcon = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 20000;

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
