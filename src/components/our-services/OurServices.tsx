import React from 'react'
import Container from '../shared/formcomponents/Container'
import ourServices from '@/public/images/our-services.svg';
import Image from 'next/image';
import OurServicesCards from './OurServicesCards';
import { useTranslations } from 'next-intl';
const OurServices = ({locale }:{locale:string }) => {
        const t = useTranslations("home.services");
  
  return (
    <div id='services' className='bg-[#9F7A32]/[0.04]  mt-20'>
      <Container className='flex flex-col gap-[50px] '>
        <div className='flex justify-center lg:justify-start items-center gap-3'>
            <Image src={ourServices} alt='ourServices' />
            <h2 className='text-[#9F7A32] text-[33px] font-bold'> {t("title")}</h2>
        </div>
       <OurServicesCards locale={locale} />
      </Container>
    </div>
  )
}

export default OurServices
