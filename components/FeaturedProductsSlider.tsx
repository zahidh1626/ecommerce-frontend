"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import type { Product } from "@/types/Product"
import React from 'react'; // Import React

interface FeaturedProductsSliderProps {
  products: Product[]
}

const FeaturedProductsSlider: React.FC<FeaturedProductsSliderProps> = ({ products }) => {
  return (
    <div className="bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 ">
        <div className="overflow-hidden py-12 bg-gradient-to-r from-primary to-primary-foreground border drop-shadow-lg border-primary/30 rounded-3xl">
          <div className="text-center mb-10 px-6">
            <h2 className="text-2xl lg:text-4xl font-bold text-primary-foreground">Featured Products</h2>
            <p className="text-sm lg:text-xl text-primary-foreground/80 mt-4">
              Discover our handpicked selection of top-quality products.
            </p>
          </div>

          {/* Featured Products Carousel */}
          <div className="mb-10 w-full mx-auto overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              freeMode={true}
              speed={3500}
              loop={true}
              autoplay={{ delay: 0, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="w-full swiper-wrapper"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="flex justify-center items-center w-full h-full">
                  <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 w-full max-w-[250px]">
                    <div className="relative h-48">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                      
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-300 hover:opacity-75"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
                      <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProductsSlider
