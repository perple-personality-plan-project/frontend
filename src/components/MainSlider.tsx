import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import { EffectCards, Navigation, Pagination } from 'swiper';
import 'swiper/css/effect-cards';

const MainSlider = () => {
  return (
    <StSwiper>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[EffectCards, Navigation, Pagination]}
        className="mySwiper"
      >
        {/* <SwiperSlide>
          <img
            src={
              'https://w7.pngwing.com/pngs/109/756/png-transparent-disney-inside-out-characters-illustration-youtube-pixar-animation-film-inside-out-fictional-character-film-good-dinosaur-thumbnail.png'
            }
          />
        </SwiperSlide> */}
        <SwiperSlide>ALL</SwiperSlide>
        <SwiperSlide>ISTJ</SwiperSlide>
        <SwiperSlide>ISTP</SwiperSlide>
        <SwiperSlide>ISFJ</SwiperSlide>
        <SwiperSlide>ISFP</SwiperSlide>
        <SwiperSlide>INTJ</SwiperSlide>
        <SwiperSlide>INTP</SwiperSlide>
        <SwiperSlide>INFJ</SwiperSlide>
        <SwiperSlide>INFP</SwiperSlide>
        <SwiperSlide>ESTJ</SwiperSlide>
        <SwiperSlide>ESTP</SwiperSlide>
        <SwiperSlide>ESFJ</SwiperSlide>
        <SwiperSlide>ESFP</SwiperSlide>
        <SwiperSlide>ENTJ</SwiperSlide>
        <SwiperSlide>ENTP</SwiperSlide>
        <SwiperSlide>ENFJ</SwiperSlide>
        <SwiperSlide>ENFP</SwiperSlide>
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
