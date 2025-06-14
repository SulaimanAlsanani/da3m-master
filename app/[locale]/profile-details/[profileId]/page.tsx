interface LayoutProps {
  params: Promise<{ locale: string , profileId:string}>; // Handle both promise and object
}


import { getUserProfileData } from "@/lib/serverActions";



import AdsDetails from "@/components/ads/ads-details/AdsDetails";
import { cookies } from "next/headers";



export default async function Page({ params }: LayoutProps) {
  const { locale,profileId } = await params;
  const {data} = await getUserProfileData(locale, profileId);
  const userData = data?.data;
 const cookiesStore = await cookies()
 const token = cookiesStore.get('token')?.value


console.log("data by id ..........................",data);


  return (
    <>
      <AdsDetails token={token || ''} userData={userData}/>
    </>
  );
}
