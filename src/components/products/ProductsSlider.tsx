"use client";
import React from 'react'
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const swiperOptions = {
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet !size-4 !bg-gray-700 border-2",
      bulletActiveClass:
        "swiper-pagination-bullet-active !bg-red-500 border-white",
    },
  
    modules: [Pagination],
  };

export default function ProductsSlider({images}:{images : string[]}) {
  return (
    <Swiper {...swiperOptions}>
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={"Product"}
                width={500}
                height={500}
                className="mx-auto w-full h-[37.5rem] object-contain mb-4"
                unoptimized
              />
            </SwiperSlide>
          ))}
        </Swiper>
  )
}
