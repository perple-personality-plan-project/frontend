import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import { EffectCards } from 'swiper';
import 'swiper/css/effect-cards';

const MainSlider = () => {
  return (
    <StSwiper>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>ENFP</SwiperSlide>
        <SwiperSlide>ENFP</SwiperSlide>
        <SwiperSlide>ENFP</SwiperSlide>
        <SwiperSlide>ENFP</SwiperSlide>
        <SwiperSlide>ENFP</SwiperSlide>
        <SwiperSlide>ENFP</SwiperSlide>
      </Swiper>
    </StSwiper>
  );
};

export default MainSlider;

const StSwiper = styled.div`
  .swiper {
    width: 650px;
    height: 450px;
    margin-right: 20%;
  }

  @media screen and (max-width: 800px) {
    .swiper {
      width: 300px;
      height: 250px;
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
    color: #fff;
  }

  .swiper-slide:nth-child(1n) {
    background-color: rgb(213, 211, 211);
  }

  .swiper-slide:nth-child(2n) {
    background-color: rgb(213, 211, 211);
  }

  .swiper-slide:nth-child(3n) {
    background-color: rgb(213, 211, 211);
  }

  .swiper-slide:nth-child(4n) {
    background-color: rgb(213, 211, 211);
  }

  .swiper-slide:nth-child(5n) {
    background-color: rgb(213, 211, 211);
  }

  .swiper-slide:nth-child(6n) {
    background-color: rgb(213, 211, 211);
  }

  .swiper-slide:nth-child(7n) {
    background-color: rgb(213, 211, 211);
  }

  .swiper-slide:nth-child(8n) {
    background-color: rgb(213, 211, 211);
  }
  .swiper-slide:nth-child(9n) {
    background-color: rgb(213, 211, 211);
  }
  .swiper-slide:nth-child(10n) {
    background-color: rgb(213, 211, 211);
  }
`;
