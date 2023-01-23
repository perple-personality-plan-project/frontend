import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import { EffectCards, Navigation, Pagination } from 'swiper';
import 'swiper/css/effect-cards';

interface props {
  setMbtiCheck: any;
}

const MainSlider: React.FC<props> = ({ setMbtiCheck }) => {
  const mbtiCategory = [
    'All', //0
    'ISTJ', //1
    'ISTP', //2
    'ISFJ',
    'INTJ',
    'INTP',
    'INFJ',
    'INFP',
    'ESTJ',
    'ESTP',
    'ESFJ',
    'ESFP',
    'ENTJ',
    'ENTP',
    'ENFJ',
    'ENFP',
  ];
  const mbti = localStorage.getItem('mbti');
  let mbtiIdx: number;
  if (mbti) {
    mbtiIdx = mbtiCategory.indexOf(mbti);
  } else {
    mbtiIdx = 0;
  }

  return (
    <StSwiper>
      <Swiper
        effect={'cards'}
        slidesPerView={1}
        grabCursor={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        initialSlide={mbtiIdx}
        onSlideChange={swiperCore => {
          const { activeIndex, snapIndex, previousIndex, realIndex } =
            swiperCore;
          setMbtiCheck(mbtiCategory[activeIndex]);
        }}
        modules={[EffectCards, Navigation, Pagination]}
        className="mySwiper"
      >
        {mbtiCategory.map((mbti: any, index) => {
          return (
            <SwiperSlide key={index}>
              <div>
                <img src={require('../../src/빡빡이1.png')} />
              </div>
              {mbti}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </StSwiper>
  );
};

export default MainSlider;

const StSwiper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-right: 120px;
  .swiper {
    aspect-ratio: 4.5/5;
    max-width: 460px;
    min-width: 400px;
    /* height: 500px; */
    /* width: 100%; */
    margin-right: 20%;
    transform: translate3d(0px, 0px, 0px) rotateZ(0deg) scale(1);

    @media screen and (max-width: 1024px) {
      max-width: 350px;
      margin: 50px auto;
      width: 100%;
    }

    @media screen and (max-width: 600px) {
      max-width: 280px;
      min-width: 0;
      width: 100%;
    }
  }

  .swiper-button-prev {
    background-image: url('/asset/rightArrow.png') !important;
    transform: rotate(180deg);
    z-index: 1000;
    background-size: cover;
    left: -50px;
    top: 60%;
    width: 59px;
    height: 59px;
    color: transparent;
    /* display: hidden; */
    /* visibility: hidden; */
  }

  .swiper-button-next {
    background-image: url('/asset/rightArrow.png') !important;
    background-size: cover;
    right: -50px;
    top: 60%;
    width: 59px;
    height: 59px;
    color: transparent;
  }

  /* @media screen and (max-width: 800px) {
    .swiper {
      width: 300px;
      height: 300px;
      margin: auto;
    }
  } */

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 40px;
    font-weight: bold;
    color: #151414;
  }

  .swiper-wrapper {
    transform: translate3d(calc(0%), -30px, -100px) rotateZ(0deg) scale(1);
  }

  .swiper-slide.swiper-slide-visible.swiper-slide-active {
    z-index: 2;
    transform: translate3d(0px, 0px, 0px) rotateZ(0deg) scale(1);
  }
  .swiper-slide .swiper-slide-next {
    z-index: 1;
    transform: translate3d(calc(-500px + 10%), 0px, -100px) rotateZ(0deg)
      scale(1);
    transition-duration: 0ms;
  }
  .swiper-slide.swiper-slide-prev {
    z-index: 1;
    transform: translate3d(calc(0px + 10%), 0px, -100px) rotateZ(0deg) scale(1);
    transition-duration: 0ms;
  }

  .swiper-slide:nth-child(1n) {
    border: 1px gray;
    background-color: white;
  }

  .swiper-slide:nth-child(2n) {
    border: 1px gray;
    background-color: white;
  }

  .swiper-slide:nth-child(2n) {
    border: 1px gray;
    background-color: white;
  }

  //버튼
  .swiper-button-next:after,
  .swiper-rtl .swiper-button-prev:after {
    content: 'prev';
    content: 'next';
  }

  /* .swiper-button-next:after {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    color: gray;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
    position: absolute;
    margin-left: 100px;
  } */

  /* .swiper-button-prev:after {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    color: gray;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
    position: absolute;
    margin-right: 100px;
  } */

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;
