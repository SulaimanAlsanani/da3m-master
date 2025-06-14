"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "./AdsSlider.css";
import AdsLeft from "../AdsLeft";
import Image from "next/image";
import "swiper/css/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { DrawerDemo } from "@/components/ads/ads-details/Drawer";
import { useLocale } from "next-intl";

export default function AdsSlider({
  totalPages,
  page,
  handleOpenModale,
 open,
 setOpen,
  refetch,
  setPage,
  items,
}: {
  page: number;
  totalPages: number;
  refetch: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleOpenModale?:({item:any})
  items: any;
}) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const swiperRef = useRef<any>(null); // hold swiper instance
  const locale = useLocale();
  const handleSlideChange = (swiper: any) => {
    console.log(swiper.activeIndex);

    console.log(videoRefs.current.length - 1);

    if (swiper.activeIndex === videoRefs.current.length - 1) {
      console.log("fetch more data", totalPages);
      if (page < totalPages) {
        setPage((prev) => prev + 1);
        // refetch()
      }
    }
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === swiper.activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  const handleVideoEnded = (idx: number) => {
    if (!swiperRef.current) return;

    const isLast = idx === videoRefs.current.length - 1;
    if (!isLast) {
      swiperRef.current.slideNext();
    } else {
      console.log("please featch data ");
    }
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="relative flex  ">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={30}
        //   loop
        mousewheel
        pagination={{ clickable: true }}
        modules={[Mousewheel, Navigation]}
        className="mySwiper vedios"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          // autoplay first video
          setTimeout(() => {
            const firstVideo = videoRefs.current[0];
            if (firstVideo) firstVideo.play().catch(() => {});
          }, 0);
        }}
        onSlideChange={handleSlideChange}
      >
        {items?.map((item, idx) => {
          if (item.is_video) {
            return (
              <SwiperSlide key={idx}>
                <div className="flex w-full flex-col lg:flex-row justify-start  gap-5 lg:gap-10  ">
                  <div className="flex  rounded-[12px] w-[100%] lg:w-[50%]">
                    <video
                      ref={(el) => (videoRefs.current[idx] = el)}
                      src={item.file}
                      loop={false} // turn off loop to trigger `onEnded`
                      playsInline
                      controls
                      
                      onEnded={() => handleVideoEnded(idx)}
                      className="w-full  rounded-[12px] h-[50vh] lg:h-[60vh] object-cover"
                    />
                  </div>
                  <div className="flex lg:hidden w-full">
                    <DrawerDemo
                    open={open}
                    setOpen={setOpen}
                      button={
                        <div className="text-center cursor-pointer w-full flex justify-center font-semibold bg-primary text-white p-2 rounded-[4px]">
                          {locale === "ar" ? "عرض جميع التفاصيل" : "Show ALL Details"}
                        </div>
                      }
                    >
                      <div className=" col-span-1 lg:col-span-4  ">
                        <AdsLeft  handleOpenModale={handleOpenModale} item={item} />
                      </div>
                    </DrawerDemo>
                  </div>
                  <div className="hidden lg:flex gap-3 items-center w-full lg:w-[50%] h-full ">
                    <AdsLeft  handleOpenModale={handleOpenModale} item={item} />
                  </div>
                </div>
              </SwiperSlide>
            );
          } else {
            return (
              <SwiperSlide key={idx}>
                <div className="flex gap-10 items-center w-full h-full">
                  {" "}
                  {/* Add height here */}
                  <div className="relative w-[50%] h-full overflow-hidden rounded-[12px]">
                    <Image
                      src={item.image}
                      alt="audio image"
                      fill
                      className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-[12px]"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black/50 p-2 z-10">
                      <audio
                        ref={(el) => (videoRefs.current[idx] = el)}
                        src={item.file}
                        controls
                        onEnded={() => handleVideoEnded(idx)}
                        className="w-full h-[50vh] lg:h-[60vh]"
                        
                      />
                    </div>
                  </div>
                  <div className="flex lg:hidden w-full">
                    <DrawerDemo
                      button={
                        <div className="text-center w-full flex justify-center font-semibold bg-primary text-white p-2 rounded-[4px]">
                          {locale === "ar" ? "عرض جميع التفاصيل" : "Show ALL Details"}
                        </div>
                      }
                    >
                      <div className=" col-span-1 lg:col-span-4  ">
                        <AdsLeft  handleOpenModale={handleOpenModale} item={item} />
                      </div>
                    </DrawerDemo>
                  </div>
                  <div className="hidden lg:flex gap-3 items-center w-full lg:w-[50%] h-full ">
                    <AdsLeft  handleOpenModale={handleOpenModale} item={item} />
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
      {/* <div className=" flex flex-col justify-between  bg-red-500  ">
    <div className=" h-full w-full bg-blue-50">

    <div className="  !w-full rotate-90   "><ProgressBar value="90%"/></div>
    </div>
    
    <div className="flex flex-col gap-10 items-end w-full">
<button ref={prevRef} className="custom-prev   bg-primary  w-[54px] h-[54px] flex justify-center items-center rounded-full"><ChevronUp /></button>
    <button ref={prevRef} className="custom-next  bg-primary  w-[54px] h-[54px] flex justify-center items-center rounded-full"><ChevronDown /></button>
    </div>
    
    </div> */}
    </div>
  );
}
