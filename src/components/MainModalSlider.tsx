import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';

interface Props {
  id: number;
  imageData: string[];
  children?: React.ReactNode;
  // src?: string | undefined;
}

export const MainModalSlider: React.FC<Props> = ({ id, imageData }) => {
  return (
    <>
      <StSwiper>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {imageData.map((image, index) => (
            <SwiperSlide style={{ width: '100%' }} key={index}>
              <img
                src={process.env.REACT_APP_IMG_SERVER + image}
                alt="main-imgs"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </StSwiper>
    </>
  );
};

export default MainModalSlider;

const StSwiper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  img {
    width: 100%;
  }
  .swiper {
    width: 100%;
    /* max-width: 625px; */
    /* width: 625px; */
    aspect-ratio: '1/1.2';
    border-radius: 20px 0 0 20px;
    @media screen and (max-width: 1024px) {
      max-width: 290px;
      border-radius: 20px 20px 0 0;
    }
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-family: swiper-icons;
    font-size: medium;
    color: gray;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
  }

  .swiper-button-next,
  .swiper-rtl .swiper-button-prev {
    right: 10px;
    left: auto;
    width: 40px;
    height: 40px;
    background-color: #d9d9d9;
    opacity: 0.5;
    border-radius: 50%;
  }

  .swiper-button-prev,
  .swiper-rtl .swiper-button-next {
    left: 10px;
    right: auto;
    width: 40px;
    height: 40px;
    background-color: #d9d9d9;
    opacity: 0.5;
    border-radius: 50%;
  }

  .swiper-button-next:after,
  .swiper-rtl .swiper-button-prev:after {
    content: 'next';
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    color: white;
    background: black;
    border-radius: 20px 0 0 20px;
    @media screen and (max-width: 1024px) {
      border-radius: 20px 20px 0 0;
    }
  }

  .swiper-slide img {
    aspect-ratio: 1/1;
    display: block;
    width: 100%;
    /* height: 625px; */
    border-radius: 20px 0 0 20px;
    @media screen and (max-width: 1024px) {
      height: 290px;
      border-radius: 20px 20px 0 0;
    }
  }

  .swiper-pagination-bullet-active {
    opacity: var(--swiper-pagination-bullet-opacity, 1);
    background-color: #d9d9d9;
  }
`;
