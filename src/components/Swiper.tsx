import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

const SwiperSlides = () => {
  return (
    <Swiper
      direction={'vertical'}
      autoHeight={true}
      // spaceBetween={0}
      // centeredSlides={true}
      autoplay={{
        delay: 2500,
        //   disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper"
      style={{ height: '20px' }}
    >
      <SwiperSlide>#성수동 샐러드 맛집1</SwiperSlide>
      <SwiperSlide>#성수동 샐러드 맛집2</SwiperSlide>
      <SwiperSlide>#성수동 샐러드 맛집3</SwiperSlide>
      <SwiperSlide>#성수동 샐러드 맛집4</SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlides;
