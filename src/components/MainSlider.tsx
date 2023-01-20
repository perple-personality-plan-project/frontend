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

  return (
    <StSwiper>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        onSlideChange={swiperCore => {
          const { activeIndex, snapIndex, previousIndex, realIndex } =
            swiperCore;
          setMbtiCheck(mbtiCategory[activeIndex]);
        }}
        modules={[EffectCards, Navigation, Pagination]}
        className="mySwiper"
      >
        {mbtiCategory.map((mbti: any, index) => {
          return <SwiperSlide key={index}>{mbti}</SwiperSlide>;
        })}
      </Swiper>
    </StSwiper>
  );
};

export default MainSlider;

const StSwiper = styled.div`
  .swiper {
    width: 500px;
    height: 500px;
    margin-right: 20%;
    transform: translate3d(0px, 0px, 0px) rotateZ(0deg) scale(1);
  }

  @media screen and (max-width: 800px) {
    .swiper {
      width: 300px;
      height: 300px;
      margin: auto;
    }
  }

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
  .swiper-slide.swiper-slide-next {
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

  .swiper-button-next:after {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    /* background-color: gray; */
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    color: gray;
    text-transform: none !important;
    letter-spacing: 0;
    /* font-feature-settings: ; */
    font-variant: initial;
    line-height: 1;
    position: absolute;
    margin-left: 100px;
  }

  .swiper-button-prev:after {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    /* background-color: gray; */
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    color: gray;
    text-transform: none !important;
    letter-spacing: 0;
    /* font-feature-settings: ; */
    font-variant: initial;
    line-height: 1;
    position: absolute;
    margin-right: 100px;
  }
`;
