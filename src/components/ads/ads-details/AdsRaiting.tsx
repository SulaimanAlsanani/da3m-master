import React, { useState } from 'react';
import adsDetailsIcon from '@/public/images/ads-details-icon.svg';
import Image from 'next/image';
import AdsRaitingSlider from './AdsRaitingSlider';
import RatingModal from './RatingModal';
import { useTranslations } from 'next-intl';
const AdsRaiting = ({token,providerId,rateData}:{rateData:any,token:string,providerId:string}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("advertiser")

  return (
    <div>
      <div className='flex  items-center  gap-5 md:gap-0  justify-between w-full'>
        <div className='flex items-center gap-4'>
          <Image src={adsDetailsIcon} alt='adsDetailsIcon' />
          <h2 className='text-[#9F7A32] lg:font-bold lg:text-[26px] font-semibold text-[18px]'>{t("advertiser_reviews")}</h2>
        </div>
        <button
          className='w-[100px] lg:w-[168px] lg:h-[61px] h-10 rounded-[14px] cursor-pointer text-[12px] lg:text-sm text-white bg-[#9F7A32]'
          onClick={() => setIsModalOpen(true)}
        >
          {t("rate_advertiser")}
        </button>
      </div>

      <AdsRaitingSlider reviews={rateData} />

      <RatingModal token={token} providerId={providerId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AdsRaiting;
