"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import play from "@/public/images/play.svg";
import starCircle from "@/public/images/star-circle.svg";
import kingdomCheck from "@/public/images/kingdom-check.svg";
import resturant from "@/public/images/resturant.svg";
import { usePathname } from "next/navigation";
import MainLink from "./formcomponents/MainLink";


interface CardProps {
  image?: string;
  desc?: string;
  name?: string;
  date?: string;
  rating?: string;
  personImage?: string;
  is_verified?: boolean;
  is_video?: boolean;
  is_audio?: boolean;
  category?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
  setActiveSection?: React.Dispatch<React.SetStateAction<number | null>>;
  id: number;
  setAdData: React.Dispatch<React.SetStateAction<{}>>;
  userId: string;
  locally?: string;
  sectionIndex?: number;
}

const HomeCard: React.FC<CardProps> = ({
  setAdData,
  category,
  is_audio,
  image,
  userId,
  sectionIndex,
  setActiveSection,
  is_video,
  setActiveIndex,
  id,
  setOpen,
  desc,
  name,
  date,
  rating,
  personImage,
  locally,
}) => {
  const pathName = usePathname();
  const [seeMore, setSeeMore] = useState(false);
  // console.log(sectionIndex)
  return (
    <div className="w-full">
      <div className="relative  min-h-[300px]   w-full  rounded-[19px]">
        {image && ( // شرط: إذا لم يتم تمرير الصورة، لا يتم عرض العنصر
          <div className="relative w-full h-[474px] rounded-[19px]">
            <Image
              src={image}
              alt="kingdom"
              fill
              className="object-fill w-full h-full rounded-[19px]"
            />
          </div>
        )}
        <div
          onClick={() => {
              if(setActiveSection){
            


              setActiveSection(sectionIndex)
               setActiveIndex(id);
              setOpen(true);
              setAdData({});
            }else{
              setActiveIndex(id);
              setOpen(true);
              setAdData({});
            }
           
            }}
          className="absolute cursor-pointer inset-0 bg-black/50 rounded-[19px]"
        ></div>
        {is_video && (
          <div
            onClick={() => {
              if(setActiveSection){
            


              setActiveSection(sectionIndex)
               setActiveIndex(id);
              setOpen(true);
              setAdData({});
            }else{
              setActiveIndex(id);
              setOpen(true);
              setAdData({});
            }
           
            }}
            className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
          >
            <Image src={play} alt="play" className="" />
            {/* <h2 className="text-[18px] text-white">00:37</h2> */}
          </div>
        )}
        {/* <div className="absolute flex flex-col items-center top-2 right-2 z-10">
          <Image src={starCircle} alt="star" />
        </div> */}
        {locally && (
          <div className="absolute bg-[#FFFFFF]/[0.16] px-[18px] py-[8] rounded-[18px] top-2 right-2 z-10 text-[#FFFFFF]/[0.8] text-[15px] font-normal">
            {locally}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col">
        <div className="flex flex-col   gap-2">
          <div className="flex gap-2 items-center ">
            {/* {pathName?.includes("profile-details") ?
           personImage && ( // شرط: إذا لم يتم تمرير صورة الشخص، لا يتم عرضها
            <Image src={personImage|| "/images/ads.svg"} width={44} height={44} alt="person" className="w-[44px] h-[44px] rounded-full" />
          
        ):(<MainLink href={`/profile-details/${userId}`} >   <Image src={personImage || "/images/ads.svg"} width={44} height={44} alt="person" className="w-[44px] h-[44px] rounded-full" /></MainLink>)} */}

            {pathName?.includes("profile-details") ? (
              personImage ? (
                <Image
                  src={personImage}
                  width={44}
                  height={44}
                  alt="person"
                  className="w-[44px] h-[44px] rounded-full"
                />
              ) : null
            ) : (
              personImage && (
                <MainLink href={`/profile-details/${userId}`}>
                  <Image
                    src={personImage}
                    width={44}
                    height={44}
                    alt="person"
                    className="w-[44px] h-[44px] rounded-full"
                  />
                </MainLink>
              )
            )}

            <div className="">
              {name && ( // شرط: إذا لم يتم تمرير الاسم، لا يتم عرضه
                <div className="flex items-center gap-1">
                  <h2>{name}</h2>
                  <Image
                    src={kingdomCheck}
                    alt="kingdomCheck"
                    className="w-[19.25px] h-[19.25px]"
                  />
                  {rating && ( // شرط: إذا لم يتم تمرير التقييم، لا يتم عرضه
                    <div className="text-[#F68223] flex items-center gap-1">
                      <FaStar />
                      <span className="text-[15px] font-bold">{rating}</span>
                    </div>
                  )}
                </div>
              )}
              {date && ( // شرط: إذا لم يتم تمرير التاريخ، لا يتم عرضه
                <div className="flex items-center gap-2 text-gray-400">
                  <FaCalendarAlt />
                  <span>{date}</span>
                </div>
              )}
            </div>
          </div>
          {desc && (
            <div className="transition-all duration-500">
              <span className="text-[18px] text-[#333C52] break transition-all duration-500">
                {seeMore ? desc : desc.slice(0, 50) }
              </span>
              {desc.length > 50 && (
                <span
                  className="text-gray-600/[0.3] cursor-pointer mt-1 inline-block mx-2 transition-all duration-500 "
                  onClick={() => setSeeMore(!seeMore)}
              >
                {seeMore ? "رؤية أقل" : "رؤية المزيد"}
              </span>
              )}
            </div>
          )}
          <div className="mt-3 flex items-center gap-2">
            {!!category && (
              <>
                <Image
                  src={resturant}
                  alt="resturant"
                  width={19}
                  height={19}
                  className="!w-7 !h-7"
                />
                <h3 className="text-[#2EA044] text-[15px]">{category}</h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
