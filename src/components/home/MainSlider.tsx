"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import slide1 from "@/assets/images/slide-1.jpeg";
import slide2 from "@/assets/images/slide-2.jpeg";
import slide3 from "@/assets/images/slide-3.jpeg";
import slide4 from "@/assets/images/slide-4.jpeg";

const images = [
  { path: slide1.src, label: "slide 1" },
  { path: slide2.src, label: "slide 2" },
  { path: slide3.src, label: "slide 3" },
  { path: slide4.src, label: "slide 4" },
];

const swiperOptions = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !w-4 !h-4 !bg-gray-400 transition-all duration-300",
    bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500 !scale-125",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  modules: [Pagination, Autoplay],
};

export default function MainSlider() {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Swiper {...swiperOptions} className="main-slider">
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={img.path}
                  alt={img.label}
                  width={1920}
                  height={400}
                  priority={idx === 0}
                  className="w-full h-[400px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .main-slider .swiper-pagination {
          bottom: 1.5rem;
        }
        
        .main-slider .swiper-pagination-bullet {
          margin: 0 4px;
          cursor: pointer;
        }
        
        .main-slider .swiper-pagination-bullet:hover {
          background: rgb(239 68 68) !important;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}