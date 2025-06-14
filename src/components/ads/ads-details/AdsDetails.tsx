"use client";
import React, { useState } from "react";
import Container from "@/components/shared/formcomponents/Container";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import ContactModal from "./ContactModal"; 
import AttachmentsModal from "./AttachmentsModal";
import adsDetails from "@/public/images/ads.svg";
import check from "@/public/images/kingdom-check.svg";
import location from "@/public/images/ads-location.svg";
import adsPhone from "@/public/images/ads-phone.svg";
import adslicence from "@/public/images/ads-licenses.svg";
import adsFlag from "@/public/images/ads-flag.svg";

import AdsRaiting from "./AdsRaiting";
import ReportModal from "./ReportModal";
import AdsCards from "../AdsCards";
import ads from '@/public/images/ads.svg';
import { useTranslations } from "next-intl";
import CustomModal from "@/components/shared/reusableComponents/CustomModal";
import MyMap from "@/components/shared/Map/Map";

const AdsDetails = ({userData, token} : {userData: any, token:string}) => {
  const user = userData?.user
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAttachmentsModalOpen, setIsAttachmentsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
 const [open, setOpen] = useState(false)
 const [openMap, setOpenMap] = useState(false)
 
 const t = useTranslations("advertiser")
 console.log("user form modal",userData);
 const [locationn, setLocation] = useState<{
     lat: null | number;
     lng: null | number;
     name: string;
   }>({ lat: 24.628053928453202, lng: 46.681521298473854 , name: ''});
 
  return (
    <>
      {openMap && (
          <CustomModal close className="!w-[100%] lg:!w-[40%] " openCloseModal={setOpenMap}>
            <MyMap destination={{lat:Number(user?.map_info?.lat), lng:Number(user?.map_info?.lng)}} setLocation={setLocation} />
          </CustomModal>
        )}
     <Container >
      <div className="flex flex-col lg:flex-row mt-[70px] lg:mt-[150px] flex-wrap items-center justify-center lg:justify-between w-full gap-5 lg:gap-0">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-8">
          <Image src={user?.image || adsDetails} width={80} height={80} alt="adsDetails" className=" w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-full" />
          <div className="flex flex-col gap-1 ">
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] sm:text-[24px] text-[#333C52] font-bold"> {user?.name}</h2>
             {user?.verified &&<Image src={check} alt="adsDetails" /> } 
              <FaStar className="text-[#F68223] w-[16px] sm:w-[20.3px] h-[16px] sm:h-[20.3px]" />
              <span className="text-[20px] sm:text-[24px] font-bold text-[#F68223]">{user?.avg_rate}</span>
            </div>
            <div onClick={()=>setOpenMap(true)} className="flex  cursor-pointer items-center mb-5  lg:mt-0 lg:mb-0 gap-2">
              <Image src={location} alt="location" />
              <div>
                <h2 className="text-sm sm:text-base">{user?.area}</h2>
                <h4 className="text-xs sm:text-sm"> {user?.location}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="flex  justify-start md:justify-start gap-4 sm:gap-5">
          <div 
            className=" px-5 h-[90px] sm:h-[100px] bg-[#f9f9fa] flex flex-col items-center justify-center gap-2 rounded-[14px] cursor-pointer"
            onClick={() => setIsContactModalOpen(true)}
          >
            <Image src={adsPhone} alt="adsPhone" />
            <h3 className="text-[#333C52] text-xs sm:text-sm"> {t("contact_advertiser")}</h3>
          </div>

          <div 
            className="px-5  h-[90px] sm:h-[100px] bg-[#f9f9fa] flex flex-col items-center justify-center gap-2 rounded-[14px] cursor-pointer"
            onClick={() => setIsAttachmentsModalOpen(true)}
          >
            <Image src={adslicence} alt="adslicence" />
            <h3 className="text-[#333C52] text-xs sm:text-sm"> {t("attachments")} </h3>
          </div>

          <div  onClick={() => setIsReportModalOpen(true)}
                className=" px-5 cursor-pointer  h-[90px] sm:h-[100px] bg-[#fdf6f7] flex flex-col items-center justify-center gap-2 rounded-[14px]">
            <Image src={adsFlag} alt="adsFlag" />
            <h3 className="text-[#EE0028] font-bold text-xs sm:text-sm"> {t("complaint")}</h3>
          </div>
        </div>
      </div>

      <div className="  mt-14 text-center lg:text-right">
        <h2 className="text-[#333C52] font-bold text-lg sm:text-md"> {t("about_advertiser")}</h2>
        <p className="mt-2 text-[#333C52] text-sm sm:text-base">
{user?.brief}        </p>
      </div>

      <div className="flex flex-col gap-10 mt-10">
      <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-center lg:justify-start">
                        <Image src={ads} alt="ads" />
                        <span className="text-[28px] sm:text-[33px] text-[#9F7A32] font-bold text-center sm:text-right">
     {t("ads_title")}                   </span>
                    </div>
          <AdsCards  open={open} items={userData?.ads} setOpen={setOpen}  />
        </div>

      <div className="mt-10 sm:mt-14">
        <AdsRaiting   token={token} providerId={user?.id} rateData={userData?.rates} />
      </div>

      <ContactModal socials={user?.socials.slice(0,5)}  isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <AttachmentsModal licence={user?.licence} isOpen={isAttachmentsModalOpen} onClose={() => setIsAttachmentsModalOpen(false)} />
      <ReportModal token={token} providerId={user?.id} isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />

    </Container>
    </>
   
  );
};

export default AdsDetails;
