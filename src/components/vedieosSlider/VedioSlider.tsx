"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css";
import "./VedioSlider.css";
import AdsLeft from "../../../app/[locale]/ads/AdsLeft";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MainLink from "../shared/formcomponents/MainLink";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import kingdomCheck from "@/public/images/kingdom-check.svg";
import person from "@/public/images/person.webp";



export default function VedioSlider({items,activeIndex=1}:{items:any,activeIndex:number}) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const swiperRef = useRef<any>(null); // hold swiper instance

const pathName = usePathname()
  const handleSlideChange = (swiper: any) => {
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
    }
  };

  return (
    <Swiper
    initialSlide={activeIndex}
      direction="vertical"
      slidesPerView={1}
      spaceBetween={30}
    //   loop
      mousewheel
      pagination={{ clickable: true }}
      modules={[Mousewheel]}
      className="mySwiper vedios"
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      
        setTimeout(() => {
          const targetVideo = videoRefs.current[activeIndex];
          if (targetVideo) targetVideo.play().catch(() => {});
        }, 0);
      }}
      onSlideChange={handleSlideChange}
    >
 {items?.map((item, idx) => {
  const isVideo = item.is_video;
  const isAudio = !item.is_video && item.file;
  const isImageOnly = !item.is_video && !item.file;

  return (
    <SwiperSlide key={idx}>
      <div className="hidden lg:flex gap-3 items-center w-[40%] h-full">
        <AdsLeft pathName={pathName} item={item} />
      </div>

      <div className="relative h-full w-full lg:w-[60%] overflow-hidden rounded-[12px]">
        
      <div className="flex lg:hidden items-center w-full gap-1 z-[999] absolute left-2 bottom-[100px]">
                {!pathName?.includes("profile-details") ? <MainLink href={`/profile-details/${item?.advertiser?.id}`} >
                  <Image src={item?.advertiser?.image|| person} alt="person" width={49} height={49} className="!w-[49px] !h-[49px] rounded-full" />
                  </MainLink> :  <Image src={item?.advertiser?.image|| person} alt="person" width={49} height={49} className="!w-[49px] !h-[49px] rounded-full" />}
               <div>
                   <div className="flex items-center gap-1">
                     <h2 className=' text-[17px] font-bold'> {item?.advertiser?.name}</h2>
                    {item?.advertiser?.is_verified &&  <Image src={kingdomCheck} alt="kingdomCheck" className="!w-[19.25px] !h-[19.25px]" />}
                       <div className="text-[#F68223] flex items-center gap-1 mx-1">
                         <FaStar />
                         <span className="text-[15px] font-bold">{item?.advertiser?.avg_rate}</span>
                       </div>
                   </div>
                   <div className="flex items-center gap-2 text-gray-400">
                     <FaCalendarAlt />
                     <span>{item?.created_at}  </span>
                   </div>
               </div>
             </div>
          
         
          
          
        {isVideo && (
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            src={item.file}
            loop={false}
            playsInline
            controls
            // muted
            onEnded={() => handleVideoEnded(idx)}
            className="w-full h-full object-cover object-center rounded-[12px]"
          />
        )}

        {isAudio && (
          <>
            <Image
              src={item.image}
              alt="audio image"
              width={300}
             height={300}
              className="absolute top-0 left-0 !w-full !h-[70vh] object-cover object-center rounded-[12px]"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/50 p-2 z-10">
              <audio
                ref={(el) => (videoRefs.current[idx] = el)}
                src={item.file}
                controls
                // muted
                onEnded={() => handleVideoEnded(idx)}
                className="w-full"
              />
            </div>
          </>
        )}

        {isImageOnly && (
          <>
            <Image
              src={item.image}
              alt="image only"
             width={300}
             height={300}
              className="absolute top-0 left-0 !w-full !h-[70vh] object-cover object-center rounded-[12px]"
              onLoad={() => {
                // Set timeout only when image loads
                setTimeout(() => {
                  handleVideoEnded(idx);
                }, 30000); // 30 seconds
              }}
            />
          </>
        )}
      </div>
    </SwiperSlide>
  );
})}

    </Swiper>
  );
}
