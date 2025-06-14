"use client"
import React, { useState } from 'react';
import Container from '../shared/formcomponents/Container';
import ads from '@/public/images/ads.svg';
import Image from 'next/image';
import AdsCards from './AdsCards';
import { useTranslations } from 'next-intl';
import MainLink from '../shared/formcomponents/MainLink';

const Ads = ({adsList}:any) => {
    console.log(adsList, "adsList")
    const [open, setOpen] = useState(false)
      const t = useTranslations("home.ads");
       const [activeSectionIndex, setActiveSection] = useState<number|null>(null)
    return (
        <>
        {adsList?.map((ad:any,index:number)=>{

            return(
            <Container key={ad.id}>
                <div data-aos="fade-left"  className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-3 sm:gap-5">
                    <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-center sm:justify-start">
                        <Image src={ads} alt="ads" />
                        <span className="text-[28px] sm:text-[33px] text-[#9F7A32] font-bold text-center sm:text-right">
    {ad.title}                    </span>
                    </div>
                    <div className="w-full sm:w-auto flex justify-center">
                        <MainLink href={`/ads`}  className="w-full sm:w-[285.47px] h-[61px] flex justify-center items-center bg-[#9F7A32] rounded-[14px] text-white">
                        {t("showAllAds")}  {ad.title}   
                        </MainLink>
                    </div>
                </div>
                <AdsCards activeSectionIndex={activeSectionIndex} setActiveSection={setActiveSection} sectionIndex={index +1} open={open} items={ad.items} setOpen={setOpen} key={index}  />
            </Container>
            
        )
        })}
           
        </>
     
    );
}

export default Ads;
