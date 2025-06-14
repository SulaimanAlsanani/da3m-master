import ProfilePage from '@/components/ProfilePage/ProfilePage'
import { getProfileData } from '@/lib/serverActions';
import React from 'react'
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}

const page = async ({ params }: LayoutProps) => {
  const { locale } = await params;
  const {data} = await getProfileData(locale);
  // const {data:socilas} = await getProfileDataSocials(locale);
  const profileData = data.data
  // console.log("socilas data from page parent", socilas?.data?.socials )
 
  return (
    <ProfilePage locale={locale} profileData={profileData} />
  )
}

export default page