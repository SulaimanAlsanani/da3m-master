import Container from '@/components/shared/formcomponents/Container'
import Image from 'next/image'
import React from 'react'
import img from '@/public/images/appointment.svg';
import GovernmentContractsForm from './GovernmentContractsForm';
import { cookies } from 'next/headers';
import { getAreas, getProfileData } from '@/lib/serverActions';
import { getTranslations } from 'next-intl/server';
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
const page = async({ params }: LayoutProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { locale } = await params;
  const {data} = await getProfileData(locale);  
  const profileData = data?.data;
  const areas = await  getAreas(locale)
  console.log("profileData from project", profileData);
  const t = await getTranslations("Contract");
  return (
    <Container className='mt-[100px] mb-[100px] lg:mb-[150px] lg:mt-[150px]'>
      <div className='text-center'>
      <Image src={img} alt='government-contracts' className='w-[55px] h-[55px] mx-auto'/>
      <h2 className='text-[#9F7A32] font-bold text-[25px] lg:w-[244px] mx-auto mt-2'> {t("title")}</h2>
      <p className='text-sm text-[#9F7A32] mt-2'>     {t("subtitle")}</p>
      </div>
      <GovernmentContractsForm token={token} user={profileData?.user} locale={locale} areas={areas?.data?.data?.areas}/>
    </Container>
  )
}

export default page
