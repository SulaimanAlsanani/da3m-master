import Container from '@/components/shared/formcomponents/Container'
import React from 'react'
import AllAdsPage from '@/components/ads/AllAds'
import { cookies } from 'next/headers';
import { getAreas, getCategories } from '@/lib/serverActions';
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}

export default async function Page({ params }: LayoutProps) {
  const { locale } = await params;
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
   const areas = await  getAreas(locale)
    const categories = await  getCategories(locale)
    console.log("catsss", categories)
  return (
    <Container >
     <div className="flex mt-[80px] lg:mt-[150px] 2xl:mt-[200px] lg:my-[140px]  flex-col sm:flex-row justify-center gap-10">
  {/* <AdsCenter />
  <AdsLeft />  */}

<AllAdsPage areas={areas?.data?.data?.areas} categories={categories?.data?.data?.categories} token={token}  locale={locale}/>
</div>

    </Container>
  )
}


