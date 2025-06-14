"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaCalendarAlt, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import adsDetailsIcon from "@/public/images/ads-details-icon.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import person from "@/public/images/person.webp";

// const reviews = [
//   {
//     name: "خالد السالمي",
//     date: "05 مايو 2025",
//     text: "هنا يظهر رأي المقيم في المعلن بناء على تجربته معه",
//     rating: 5,
//     image: person,
//   },
//   {
//     name: "أحمد العتيبي",
//     date: "12 يونيو 2025",
//     text: "تجربة رائعة جدًا مع المعلن، أنصح الجميع به!",
//     rating: 4,
//     image: person,
//   },
//   {
//     name: "سارة الجهني",
//     date: "20 يوليو 2025",
//     text: "الخدمة كانت ممتازة واستجاب بسرعة!",
//     rating: 5,
//     image: person,
//   },
//   {
//     name: "محمد الدوسري",
//     date: "10 أغسطس 2025",
//     text: "كان هناك بعض التأخير، لكن التجربة جيدة بشكل عام.",
//     rating: 3,
//     image: person,
//   },
//   {
//     name: "أحمد العتيبي",
//     date: "12 يونيو 2025",
//     text: "تجربة رائعة جدًا مع المعلن، أنصح الجميع به!",
//     rating: 4,
//     image: person,
//   },
// ];

const AdsRaitingSlider = ({reviews}:{reviews:any[]}) => {
  console.log(reviews)
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    //@ts-ignore
    if (swiperRef.current && swiperRef.current.swiper) {
      //@ts-ignore
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
    <div className="relative w-full mt-14">
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
        spaceBetween={0}
        slidesPerView={2}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        breakpoints={{
          768: { slidesPerView: 2 },
        }}
      >
        {reviews?.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="lg:w-[536px] lg:h-[174px] bg-[#fbfaf7] rounded-[19px] flex-col px-10 items-center justify-center flex gap-5">
              <div className="flex flex-col lg:flex-row p-5 lg:p-0 justify-between w-full">
                <div className="flex flex-col lg:flex-row items-center gap-5">
                  <Image
                    src={review.image || adsDetailsIcon}
                    alt="person"
                    width={50}
                    height={50}
                    className="w-[50.57px] h-[50.57px] rounded-full"
                   
                  />
                  <div>
                    <h2 className="text-[#333C52] font-bold text-[18px]">
                      {review.username}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <h2>{review.created_at}</h2>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 lg:mt-0">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-[20.3px] h-[20.3px] ${
                        i < review.rate ? "text-[#F68223]" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h2 className="mb-5 lg:mb-0 text-center lg:text-right">{review.comment}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsRaitingSlider;