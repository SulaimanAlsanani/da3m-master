"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {
  FaCalendarAlt,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import person from "@/public/images/profileImg.png";
import { useTranslations } from "next-intl";

type Rate = {
  username: string;
  created_at:string,
  comment:string,
  rate:number,
  image:string,
  id:string
}


const MyRating = ({rates}:{rates:Rate[]}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const t = useTranslations("myProfile")

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();

      swiperInstance.on("slideChange", () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });
    }
  }, []);
  return (
    <>
      <div className="flex gap-2 justify-start items-center mt-[43px]">
        <Image src="/images/starBig.svg" alt="star" width={34} height={34} />
        <p className="text-[20px] font-extrabold text-[#9F7A32]">{t("myRatings")}</p>
      </div>
      <div className=" relative w-full mt-[40px]">
        <button
          ref={prevRef}
          className={`absolute -left-20 top-1/2 transform -translate-y-1/2 z-10 bg-[#9F7A32] shadow-lg p-3 rounded-full transition-opacity ${
            isBeginning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isBeginning}
        >
          <FaChevronLeft className="text-white w-6 h-6" />
        </button>
        <button
          ref={nextRef}
          className={`absolute -right-20 top-1/2 transform -translate-y-1/2 z-10 bg-[#9F7A32] shadow-lg p-3 rounded-full transition-opacity ${
            isEnd ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isEnd}
        >
          <FaChevronRight className="text-white w-6 h-6" />
        </button>

        <Swiper
          ref={swiperRef}
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {rates.length === 0 ?  (
            <div className="text-center">{t("noRatings")}</div>
          ): (

            rates.map((rate) => (
              <SwiperSlide key={rate.id}>
                <div className=" xl:w-[560px] lg:h-[174px] bg-[#9F7A32]/[0.04] rounded-[19px] flex-col px-10 items-center justify-center flex gap-5">
                  <div className="flex flex-col lg:flex-row p-5 lg:p-0 justify-between w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                      <Image
                        src={rate.image || person}
                        alt="person"
                        width={50}
                        height={50}
                        className="w-[50.57px] h-[50.57px] rounded-full"
                      />
                      <div>
                        <h2 className="text-[#333C52] font-bold text-[18px] text-center">
                          {rate.username}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <FaCalendarAlt className="text-gray-400" />
                          <h2>{rate.created_at}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3 lg:mt-0">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-[20.3px] h-[20.3px] ${
                            i < rate.rate ? "text-[#F68223]" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h2 className="mb-5 lg:mb-0 text-center lg:text-right text-[#333C52] font-bukraRegular text-[18px] ">
                    {rate.comment}
                  </h2>
                </div>
              </SwiperSlide>
            ))

          )}
        </Swiper>
      </div>
    </>
  );
};

export default MyRating;
