// src/components/Slide.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slide = ({ children }) => {
  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-7xl">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            // when window width is >= 640px
            640: { slidesPerView: 2 },
            // when window width is >= 768px
            768: { slidesPerView: 3 },
            // when window width is >= 1024px
            1024: { slidesPerView: 4 },
            // when window width is >= 1280px
            1280: { slidesPerView: 5 },
          }}
        >
          {React.Children.map(children, (child) => (
            <SwiperSlide>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;