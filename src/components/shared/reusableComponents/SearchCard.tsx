"use client";
import Image from "next/image";
import React from "react";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import play from "@/public/images/play.svg";
import starCircle from "@/public/images/star-circle.svg";
import kingdomCheck from "@/public/images/kingdom-check.svg";
import resturant from "@/public/images/resturant.svg";
import { usePathname } from "next/navigation";
import MainLink from "../formcomponents/MainLink";


// جميع الخصائص اختيارية
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
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  setAdData: React.Dispatch<React.SetStateAction<{}>>;
  userId: string;
  locally?:string
  title:string
}

const SearchCard: React.FC<CardProps> = ({
  setAdData,
  category,
 
  image,
  
  is_video,
  title,
  setActiveIndex,
  id,
  setOpen,
  
  locally
}) => {
  const pathName = usePathname();
  return (
    <div className="w-full">
      <div className="relative  min-h-[100px]   w-full  rounded-[19px]">
        {image && ( // شرط: إذا لم يتم تمرير الصورة، لا يتم عرض العنصر
          <div className="relative w-full h-[174px] rounded-[19px]">
            <Image
              src={image}
              alt="kingdom"
              fill
              className="object-cover rounded-[19px]"
            />
          </div>
        )}
        <div
          onClick={() => {
            setActiveIndex(id);
            setOpen(true);
            setAdData({});
          }}
          className="absolute cursor-pointer inset-0 bg-black/50 rounded-[19px]"
        ></div>
        {is_video && (
          <div
            onClick={() => {
              setActiveIndex(id);
              setOpen(true);
              setAdData({});
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
          <div className="absolute bg-[#FFFFFF]/[0.16] px-[18px] py-[8] rounded-[18px] top-2 right-2 z-10 text-[#FFFFFF]/[0.8] text-[15px] font-normal">{locally}</div>
        )}


      </div>

      <div className="mt-4 flex flex-col">
        <div className="flex flex-col   gap-2">
          
          {/* {desc && (
            <p className="text-[18px] text-[#333C52] break ">
              {desc.length > 50 ? `${desc.slice(0, 50)}....`: desc}
            </p>
          )} */}
          <div className="mt-3 flex justify-between  items-center mx-4 gap-2">
          <h2 className="text-black text-center">{title}</h2>
            {!!category && (
              <div className="flex gap-2 items-center">
                {/* <Image
                  src={resturant}
                  alt="resturant"
                  width={19}
                  height={19}
                  className="!w-7 !h-7"
                /> */}
                <h3 className="text-[#2EA044] text-[15px]">{category}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
