import React, { useState } from 'react'
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import kingdomCheck from "@/public/images/kingdom-check.svg";
import person from "@/public/images/person.webp";
import adsLocation from '@/public/images/ads-location.svg';
import Image from 'next/image';
import resturant from '@/public/images/resturant.svg';
import { ArrowLeft } from 'lucide-react';
import MainLink from '@/components/shared/formcomponents/MainLink';
import { useTranslations } from 'next-intl';
import CustomModal from '@/components/shared/reusableComponents/CustomModal';
import MyMap from '@/components/shared/Map/Map';
interface CardProps {
  image?: string;
  desc?: string;
  name?: string;
  date?: string;
  rating?: string;
  personImage?: string;
  is_verified?:boolean
  is_video?:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  id:number
  pathName:string;
  setOpenMap?:React.Dispatch<React.SetStateAction<boolean>>
  handleOpenModale?:(item:any) => void

}
const AdsLeft = ({ item ,handleOpenModale, pathName}:CardProps) => {

  
        const t = useTranslations("allAds");
  console.log("item in ads........",item)
  return (

    <>
   
    <div className='flex px-4 lg:px-0 flex-col items-start justify-between gap-1 w-full '>

  
      
         
             <div className="flex items-center w-full gap-1">
                {!pathName?.includes("profile-details") ? <MainLink href={`/profile-details/${item?.advertiser?.id}`} >
                  <Image src={item?.advertiser?.image|| person} alt="person" width={49} height={49} className="!w-[30px] !h-[30px] lg:!w-[49px] lg:!h-[49px] rounded-full" />
                  </MainLink> :  <Image src={item?.advertiser?.image|| person} alt="person" width={49} height={49} className="!w-[30px] !h-[30px] lg:!w-[49px] lg:!h-[49px] rounded-full" />}
               <div>
                   <div className="flex items-center gap-1">
                     <h2 className='text-[#333C52] text-[10px] font-semibold lg:text-[17px] lg:font-bold'> {item?.advertiser?.name}</h2>
                    {item?.advertiser?.verified &&  <Image src={kingdomCheck} alt="kingdomCheck" className="!w-[19.25px] !h-[19.25px]" />}
                       <div className="text-[#F68223] flex items-center gap-1 mx-1">
                         <FaStar />
                         <span className="text-[15px] font-bold">{item?.advertiser?.avg_rate}</span>
                       </div>
                   </div>
                   <div className="flex items-center gap-2 text-gray-400">
                     <FaCalendarAlt />
                     <span className='text-[10px] lg:text-[15px]'>{item?.created_at}  </span>
                   </div>
               </div>
             </div>
        



          <div onClick={()=>{
            if(handleOpenModale){
              handleOpenModale(item)
            }
          }} className='bg-[#faf8f5] w-fit cursor-pointer  md:w-[80%] h-[54px] flex items-center p-3 gap-2 mt-2 lg:mt-4 rounded-[14px]'>
         <Image src={adsLocation} width={19} height={19} className='!w-4 !h-4 lg:!w-7 lg:!h-7' alt='adsLocation' />
         <div>
            <h2 className='text-[10px] text-[#8B8B4C]  font-bold'>{item?.advertiser?.area}</h2>
            <h4 className='text-[10px] font-bold' > {item?.advertiser?.location}</h4>
         </div>
       
          </div>


          <h2 className='text-[12px] font-semibold lg:text-[18px] lg:font-bold text-[#333C52] my-1  lg:mt-3 lg:w-[213px] '>
{item?.title}         </h2>
         <p className='text-[12px]  lg:text-[16px] text-[#333C52]  lg:mt-2 lg:w-[80%] line-clamp-2 '>
{item?.description}         </p>
         <div className="mt-2 flex items-center gap-2">
        <Image src={resturant} alt='resturant' width={19} height={19} className='!w-7 !h-7' />
        <h3 className='text-[#2EA044] text-[15px]'>{item?.category}</h3>
         </div>
{!pathName?.includes("profile-details") &&   <MainLink
         href={`/profile-details/${item?.advertiser?.id}`} 
  className="bg-transparent border w-full md:w-[80%] border-[#ccc] 
             text-[#9F7A32] md:font-semibold rounded-md 
             px-2 py-2 text-sm sm:text-base lg:px-4 lg:py-2 
             transition duration-300 hover:bg-[#9F7A32] flex items-center justify-center gap-2 mt-3 hover:text-white"
                    >
             {t("viewAdvertiserDetails")}
             <div className='hidden md:block'>  
             <ArrowLeft/>   
             </div>
         </MainLink> }
       
    </div>
    </>
  )
}

export default AdsLeft
