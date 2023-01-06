import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './styles.css';
import { EffectCards } from 'swiper';

const SliderContainer = () => {
  return (
    <>
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
    </>
  );
};

export default SliderContainer;
