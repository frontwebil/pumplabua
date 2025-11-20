"use client";

import "swiper/css";
import "@/components/TopSellers/TopSellers.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ProductCard } from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef, useState } from "react";
import { Swiper as SwiperCore } from "swiper";
import Link from "next/link";
import { SITE_LINKS } from "@/site-config/site.config";

export function TopSellers() {
  // const products = [1, 2, 3, 4, 5, 6, 7];
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const swiperRef = useRef<SwiperCore | null>(null);
  // const slidesPerView = 4;

  // const handlePrev = () => {
  //   if (swiperRef.current) swiperRef.current.slidePrev();
  // };

  // const handleNext = () => {
  //   if (swiperRef.current) swiperRef.current.slideNext();
  // };

  // const handleBulletClick = (index: number) => {
  //   if (swiperRef.current) swiperRef.current.slideToLoop(index);
  // };
  return (
    // <section className="topSellers">
    //   <div className="container">
    //     <div className="top-Sellers-header">
    //       <h2 className="fs-xxl uppercase font-bold">
    //         <span style={{ color: "#0339F4" }}>Top</span> Sellers
    //       </h2>
    //       <Link href={SITE_LINKS.CATALOG} className="topSellers-see-all">
    //         <p className="fs-md font-semibold">Переглянути усе</p>
    //         <MdKeyboardArrowRight className="topSellers-see-all-icon" />
    //       </Link>
    //     </div>
    //     <div className="goods-slider w-full">
    //       <Swiper
    //         spaceBetween={20}
    //         slidesPerView={slidesPerView}
    //         loop={true}
    //         onSwiper={(swiper) => (swiperRef.current = swiper)}
    //         onSlideChange={(swiper) =>
    //           setCurrentSlide(swiper.realIndex % products.length)
    //         }
    //         breakpoints={{
    //           320: { slidesPerView: slidesPerView - 3 },
    //           480: { slidesPerView: slidesPerView - 2 },
    //           780: { slidesPerView: slidesPerView - 1 },
    //           1024: { slidesPerView: slidesPerView },
    //         }}
    //       >
    //         {products.map((item, index) => (
    //           <SwiperSlide key={index}>
    //             <ProductCard />
    //           </SwiperSlide>
    //         ))}
    //       </Swiper>

    //       <div className="swiper-nav">
    //         <button className="swiper-nav-button" onClick={handlePrev}>
    //           <IoIosArrowBack />
    //         </button>

    //         <div className="swiper-nav-pagination">
    //           {products.map((_, index) => (
    //             <div
    //               key={index}
    //               className={`swiper-bullet ${
    //                 currentSlide === index ? "active" : ""
    //               }`}
    //               onClick={() => handleBulletClick(index)}
    //             ></div>
    //           ))}
    //         </div>

    //         <button className="swiper-nav-button" onClick={handleNext}>
    //           <IoIosArrowForward />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <></>
  );
}
