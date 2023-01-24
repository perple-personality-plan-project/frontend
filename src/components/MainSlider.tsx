import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import { EffectCards, EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/css/bundle';

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
        // slidesPerView={1}
        grabCursor={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        cardsEffect={{
          perSlideOffset: 15,
          rotate: false,
          //   slideShadows: true,
        }}
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
            <SwiperSlide
              className="slide-style"
              style={{ boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}
              key={index}
            >
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
  /* .swiper-slide:nth-child(1n) {
    background-color: rgb(206, 17, 17);
  }
  .swiper-slide:nth-child(2n) {
    background-color: rgb(0, 140, 255);
  }

  .swiper-slide:nth-child(3n) {
    background-color: rgb(10, 184, 111);
  }

  .swiper-slide:nth-child(4n) {
    background-color: rgb(211, 122, 7);
  }

  .swiper-slide:nth-child(5n) {
    background-color: rgb(118, 163, 12);
  }

  .swiper-slide:nth-child(6n) {
    background-color: rgb(180, 10, 47);
  }

  .swiper-slide:nth-child(7n) {
    background-color: rgb(35, 99, 19);
  }

  .swiper-slide:nth-child(8n) {
    background-color: rgb(0, 68, 255);
  }

  .swiper-slide:nth-child(9n) {
    background-color: rgb(218, 12, 218);
  }

  .swiper-slide:nth-child(10n) {
    background-color: rgb(54, 94, 77);
  } */
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
      max-width: 350px;
      min-width: 0;
      width: 100%;
    }

    @media screen and (max-width: 500px) {
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
    background-color: white;
  }

  .swiper-wrapper {
    transform: translate3d(calc(0%), -30px, -100px) rotateZ(0deg) scale(1);
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
