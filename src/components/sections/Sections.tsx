"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import sectionsBg from "@/public/images/sections-bg.png";
import sectionsImg from "@/public/images/secions.svg";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "../shared/formcomponents/Container";
import { useTranslations } from "next-intl";
import MainLink from "../shared/formcomponents/MainLink";

type SectionsProps = {
  id: number;
  title: string;
  brief: string;
  image: string;
};

const Sections = ({
  categories,
  categoriesDesc,
}: {
  categories: SectionsProps[];
  categoriesDesc: string;
}) => {
  const swiperRef = useRef<any>(null);
  const t = useTranslations("home.sections");

  return (
    <div className="bg-[#9F7A32] w-full mt-4 lg:mt-0 overflow-hidden relative">
      <div className="absolute z-[0] right-0 bottom-0">
            <Image  src={sectionsBg} alt="sectionsBg" />
          </div>
      <Container className="w-full lg:!pe-0 flex flex-col lg:justify-start">
        <div className="lg:h-[491px] gap-[36px] bg-[#9F7A32] flex flex-col lg:flex-row py-10 lg:py-0 items-center relative">
          {/* Left Text */}
          <div className="w-full lg:w-[40%] flex flex-col gap-5">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <Image src={sectionsImg} alt="sectionsImg" className="opacity-60" />
              <h2 className="text-[33px] font-bold text-white">{t("title")}</h2>
            </div>
            <h2 className="text-white text-center w-[90%] lg:text-start lg:w-[276px]">
              {categoriesDesc}
            </h2>

            <div className="flex items-center justify-center lg:justify-start gap-4 mt-4">
              <MainLink href={`/sections`} className="w-[70%] px-3 h-[61px] bg-[#FFFFFF] flex items-center justify-center text-[#333C52] text-sm rounded-[14px]">
                {t("showAllSections")}
              </MainLink>
              <button
                className="prev-btn !bg-transparent border border-white w-[40.51px] hidden lg:flex items-center justify-center h-[61px] rounded-[14px] text-white"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ArrowRight className="text-3xl" />
              </button>
              <button
                className="next-btn !bg-transparent border border-white w-[40.51px] hidden lg:flex items-center justify-center h-[61px] rounded-[14px] text-white"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ArrowLeft className="text-3xl" />
              </button>
            </div>
          </div>

          {/* Swiper */}
          <div className="w-full lg:w-[60%] mt-10 lg:mt-0 overflow-x-hidden">
            <Swiper
              spaceBetween={16}
              loop={true}
              slidesPerView="auto"
              freeMode={true}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Pagination, FreeMode, Navigation]}
              className="mySwiper"
            >
              {[...categories].map((section, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <MainLink href={`/ads?sec_id=${section.id}`} className="w-[200px]   lg:w-[300px] p-3 h-[258px] group duration-700 hover:bg-[#2EA044] border-[3px] text-center border-white border-opacity-35 bg-[#a4803c] rounded-[19px] flex flex-col items-center justify-center gap-3">
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={70}
                      height={70}
                      className="w-[70px] h-[70px] mb-3"
                    />
                    <h2 className="text-[21px] text-white font-bold w-[130px] break-words">
                      {section.title}
                    </h2>
                    <p className="text-white text-sm duration-700 translate-y-[70px] h-0 group-hover:translate-y-0 group-hover:h-full">
                      {section.brief}
                    </p>
                  </MainLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Background Image */}
          
        </div>
      </Container>
    </div>
  );
};

export default Sections;
