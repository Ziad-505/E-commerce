"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { ICategory } from "@/interface/category.interface";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 28,
    },
    1600: {
      slidesPerView: 6,
      spaceBetween: 32,
    },
  },
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !w-3 !h-3 !bg-gray-300 !opacity-50 transition-all duration-300",
    bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500 !opacity-100 !scale-125",
  },
  navigation: {
    nextEl: ".categories-slider-next",
    prevEl: ".categories-slider-prev",
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
  modules: [Pagination, Autoplay, Navigation],
};

export default function CategoriesSlider({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-10">
        <Button
          variant="outline"
          size="icon"
          className="categories-slider-prev w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-gray-200 hover:border-red-200 hover:text-red-600 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-10">
        <Button
          variant="outline"
          size="icon"
          className="categories-slider-next w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-gray-200 hover:border-red-200 hover:text-red-600 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <Swiper {...swiperOptions} className="categories-slider pb-12">
        {categories &&
          categories.map((cat) => (
            <SwiperSlide key={cat._id}>
              <Link href={`/categories/${cat._id}`} className="block group">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-red-200 hover:-translate-y-2">
                  {/* Category Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-8 aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 group-hover:to-red-500/10 transition-all duration-300"></div>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-t-2xl"></div>
                    
                    {/* Arrow Icon on Hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-4 h-4 text-red-600" />
                      </div>
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-6 text-center">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                      Explore products
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Custom Styles for Better Pagination */}
      <style jsx global>{`
        .categories-slider .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        
        .categories-slider .swiper-pagination-bullet {
          margin: 0 4px;
          cursor: pointer;
        }
        
        .categories-slider .swiper-pagination-bullet:hover {
          background: rgb(239 68 68) !important;
          opacity: 0.7 !important;
        }
      `}</style>
    </div>
  );
}