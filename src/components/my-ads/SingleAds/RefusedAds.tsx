import { useTranslations } from 'next-intl';
import React from 'react'

const RefusedAds = ({locale,reason}:{locale:string,reason:string}) => {
  const t = useTranslations("myAds");
  return (
    <div>
        <p className='text-[#EE0028] text-[14px] font-bold mt-[37px] mb-[22px]'> {t("reason-refused")}</p>
        <p className='text-[#EE0028] text-[12px] font-normal'>{reason}</p>
    </div>
  )
}

export default RefusedAds