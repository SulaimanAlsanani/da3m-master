import JoinUs from '@/components/join-us/JoinUs'
import React from 'react'
import JoinUsForm from './JoinUsForm'
import { formLayoutProps } from '@/components/shared/formcomponents/types/types';
import { getAreas, getHomeData } from '@/lib/serverActions';
import { cookies } from 'next/headers';
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
const page = async({ params }: LayoutProps) => {
  const { locale } = await params;
  const {data} = await getHomeData(locale);
  const homeData = data?.data;
  const areas = await  getAreas(locale);
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  console.log("homeData form join us page",homeData)
  return (
    <div className='mt-[90px]'>
      <JoinUs join={homeData?.join} locale={locale}/>
      <JoinUsForm areas={areas?.data?.data?.areas} locale={locale} token={token}/>
    </div>
  )
}

export default page
