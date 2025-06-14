import EditProfile from '@/components/edit-profile/EditProfile'
import { getAreas, getCategories, getProfileData, getProfileDataSocials } from '@/lib/serverActions';
import { cookies } from "next/headers";
 import React from 'react'
 interface LayoutProps {
   params: Promise<{ locale: string | any }>; // Handle both promise and object
 }

const page = async({ params }: LayoutProps) => {
  const { locale } = await params;
   const {data: profileDataResponse} = await getProfileData(locale);
   const profileData = profileDataResponse?.data

   const {data: areasResponse} = await getAreas(locale);
   const areas = areasResponse?.data

   const {data: categoriesResponse} = await getCategories(locale);
   const categories = categoriesResponse?.data
  //  const {data: socilasProfile} = await getProfileDataSocials(locale);
  //  console.log("socials profile edit", socilasProfile);
   const cookieStore = await cookies()
     const token = cookieStore.get('token')?.value
   console.log("profile data from page parent", profileData)
  return (
    <>
    
    <EditProfile profileData={profileData} areas={areas.areas} categories={categories.categories}  locale={locale} token={token || ""}/>
    </>
  )
}

export default page