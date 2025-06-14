import Container from '@/components/shared/formcomponents/Container'
import Image from 'next/image'
import React from 'react'
import img from '@/public/images/appointment.svg';
import AppointmentForm from './AppointmentForm';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { getProfileData } from '@/lib/serverActions';
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
const page = async({ params }: LayoutProps) => {
  const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
  const t  = await getTranslations("appointment")
  const { locale } = await params;
    let profileData= await getProfileData(locale)
    profileData = profileData.data?.data?.user
    console.log("profiledata",profileData.data?.data?.user)
  return (
    <Container className=' mt-[80px] lg:[120px] xl:mt-[180px]'>
      <div className='text-center'>
      <Image src={img} alt='government-contracts' className='w-[54.15px] h-[54.15px] mx-auto'/>
      <h2 className='text-[#9F7A32] font-bold text-[25px] w-fit mx-auto mt-2'>{t("title")}</h2>
      <p className='text-sm text-[#9F7A32] mt-2'> {t("subtitle")}</p>
      </div>
      <AppointmentForm token={token} locale={locale} profileData={profileData}/>
    </Container>
  )
}

export default page
