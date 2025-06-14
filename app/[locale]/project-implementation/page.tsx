import Container from '@/components/shared/formcomponents/Container'
import Image from 'next/image'
import React from 'react'
import img from '@/public/images/project-implementation.svg';
import ProjectImplementationForm from './ProjectImplementationForm';
import { cookies } from 'next/headers';
import { getAreas, getProfileData } from '@/lib/serverActions';
import Loading from '../../loading';
import { getTranslations } from 'next-intl/server';
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
const page = async ({ params }: LayoutProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { locale } = await params;
  const t = await getTranslations("implementation")

  if(!token){ 
    throw {status:401, message:"Unauthorized"}
  }
  const {data} = await getProfileData(locale);
  const profileData = data?.data;
  console.log("profileData from project", profileData);
  const areas = await  getAreas(locale)
 
  
  return (
    <Container className='lg:mt-24 mt-8'>
      <div className='text-center mt-12'>
      <Image src={img} alt='project-implementation' className='w-[54.15px] h-[54.15px] mx-auto'/>
      <h2 className='text-[#9F7A32] font-bold text-[25px]  mt-2'>{t("formTitle")}</h2>
      <p className='text-sm text-[#9F7A32] mt-2'>{t("formDescription")}</p>
      </div>
      <ProjectImplementationForm token={token} user={profileData?.user} locale={locale} areas={areas?.data?.data?.areas}/>
    </Container>
  )
}

export default page
