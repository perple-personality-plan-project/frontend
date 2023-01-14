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
    width: 600px;
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
    box-shadow: 3px;
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
`;
