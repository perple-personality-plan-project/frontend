import React, { useState } from 'react';
import styled from 'styled-components';
import MainSlider from '../components/MainSlider';
import MainPostCard from './subpages/MainPostCard';

export interface groupPostPreset {
  locationId: number;
  locationName: string;
  locationRoute: string;
  postTag: string;
  postDetail: string;
  thumbnail: string[];
  imageData: string[];
}

const MainPage = () => {
  const [groupPosts, setGroupPosts] = useState<groupPostPreset[]>([
    {
      locationId: 1,
      locationName: '닉네임',
      locationRoute: '왕십리',
      postTag: 'ESTP',
      postDetail: '오랜만에 왕십리 곱창!! 왕십리 필수 코스!!',
      thumbnail: [
        'https://w7.pngwing.com/pngs/943/774/png-transparent-tangled-the-video-game-rapunzel-flynn-rider-high-definition-television-rapunzel.png',
      ],
      imageData: [
        'https://th.bing.com/th/id/OIP.UuVJy97OVS97Vw7q39zKLgAAAA?pid=ImgDet&w=40&h=40&c=7',
        'https://previews.123rf.com/images/arcady31/arcady311504/arcady31150400016/38615063-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
      ],
    },
    {
      locationId: 1,
      locationName: '닉네임',
      locationRoute: '왕십리',
      postTag: 'ENFP',
      postDetail: '오랜만에 왕십리 곱창!! 왕십리 필수 코스!!',
      thumbnail: [
        'https://w7.pngwing.com/pngs/491/293/png-transparent-jessie-buzz-lightyear-sheriff-woody-toy-story-toy-story-characters-file-toys-story-characters-illustration-cartoons-cartoon-pixar-thumbnail.png',
      ],
      imageData: [
        'https://previews.123rf.com/images/arcady31/arcady311504/arcady31150400016/38615063-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
        'https://previews.123rf.com/images/arcady31/arcady311504/arcady31150400016/38615063-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
      ],
    },
    {
      locationId: 1,
      locationName: '닉네임',
      locationRoute: '왕십리',
      postTag: 'ENFP',
      postDetail: '오랜만에 왕십리 곱창!! 왕십리 필수 코스!!',
      thumbnail: [
        'https://w7.pngwing.com/pngs/997/638/png-transparent-buzz-lightyear-from-toy-story-illustration-disney-infinity-buzz-lightyear-jessie-lightning-mcqueen-toy-story-toy-story-buzz-s-cartoons-cartoon-fictional-character-thumbnail.png',
      ],
      imageData: [
        'https://images.velog.io/images/sdb016/post/47181c7c-1156-4182-a638-e0ad0b03a3d3/test.png',
        'https://previews.123rf.com/images/arcady31/arcady311504/arcady31150400016/38615063-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
      ],
    },
    {
      locationId: 1,
      locationName: '닉네임',
      locationRoute: '왕십리',
      postTag: 'ENFP',
      postDetail: '오랜만에 왕십리 곱창!! 왕십리 필수 코스!!',
      thumbnail: [
        'https://w7.pngwing.com/pngs/976/271/png-transparent-belle-beast-disney-princess-the-walt-disney-company-belle-belle-from-beauty-and-the-beast-fictional-character-doll-film-thumbnail.png',
      ],
      imageData: [
        'https://th.bing.com/th/id/OIP.wPyTNf7BMB4py3PiYPz9kwAAAA?pid=ImgDet&w=45&h=45&c=7',
        'https://previews.123rf.com/images/arcady31/arcady311504/arcady31150400016/38615063-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
      ],
    },
  ]);

  return (
    <Wrap>
      <Backgr>
        <TitleWrap>
          <div className="gathered">
            <MbtiTag>😀ENFP</MbtiTag>
            <MbtiTitle>뭐하고 놀까?</MbtiTitle>
          </div>
          <div>
            <MainSlider />
          </div>
        </TitleWrap>
      </Backgr>
      <PostListContainer>
        {groupPosts.map(post => (
          <MainPostCard key={post.locationId} post={post} />
        ))}
      </PostListContainer>
    </Wrap>
  );
};
export default MainPage;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12vh;
`;

const Backgr = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 550px;
  font-size: 50px;
  justify-content: center;
  left: 0;
  right: 0;

  @media screen and (max-width: 800px) {
    font-size: 1.5em;
    text-align: center;
    flex-direction: column;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  margin: auto;
  gap: 150px;

  .gathered {
    margin-top: 90px;
  }
  @media screen and (max-width: 800px) {
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 23px;
    .gathered {
      flex-direction: row;
      margin: auto;
    }
  }
`;

const MbtiTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  color: #474545;
  border-radius: 50px;
  background-color: #d2d1d1;

  @media screen and (max-width: 800px) {
    justify-content: center;
    /* margin-left: 15%; */
    width: 120px;
    height: 50px;
  }
`;

const MbtiTitle = styled.div`
  color: black;
  margin-left: 55px;
  @media screen and (max-width: 412px) {
    /* justify-content: center; */
    /* margin-left: 5%; */
    width: 100%;
    height: 100%;
  }
`;

const PostListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10vh;
  justify-content: center;
  gap: 25px;

  @media screen and (max-width: 412px) {
    flex-direction: column;
    justify-content: center;
  }
`;
