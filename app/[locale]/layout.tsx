import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import { headers } from "next/headers";

// import Footer from "@/components/shared/Footer";
import { NextIntlClientProvider } from "next-intl";
import Providers from "@/providers/providers";
import { notFound } from "next/navigation";
import { locales } from "../../navigation";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ToastContainer } from 'react-toastify';

import { cookies } from "next/headers";
import { getFooterSocials, getProfileData } from "@/lib/serverActions";
import { Suspense } from "react";
import Loading from "../loading";
import AOSInitializer, { AOSInit } from "../AOSInit";
import { getMessages } from "next-intl/server";
import { routing } from "../../routing";
import myCustomFont from "../fonts/MyCustomFont";
import {Icon} from "@iconify/react"
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: "منصة دعم الوطن",
  // description: "Your premier destination for real estate",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string | any }>;
}) {
 
    
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const { locale } = resolvedParams;
  if (!routing.locales.includes(locale as any)) {
    // notFound();
  }


  const messages = await getMessages();

 
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let profileData: { status: number; data: any } | null = null;
  let socials:{ status: number; data: any } | null = null;

  console.log('token:',token)
  socials = await getFooterSocials(locale);
if(token){
console.log('toekn')
   profileData= await getProfileData(locale);
   console.log("socials?.data?.data", socials?.data?.data)
   
  //  console.log("socials foooter" , socials)
}

console.log(profileData?.data?.data?.user)
  
  return (
    <NextIntlClientProvider
      // locale={currentLocale || routing.defaultLocale}
      locale={locale || "ar"}
      messages={messages}
      timeZone="Asia/Dubai"
    >
      <Providers locale={locale || "ar"}>
      <AOSInitializer />
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          lang={locale}
          
          className={`min-h-screen overflow-hidden  ${myCustomFont.className}`}
        >

          <Navbar 
            userData={{
              name: profileData?.data?.data?.user?.name || "", 
              image: profileData?.data?.data?.user?.image || "",
            areaName: profileData?.data?.data?.user?.area_name || "",
            location: profileData?.data?.data?.user?.location || "",

            }} 
            token={token || ""}  
          />
          < ToastContainer position="bottom-right" className="z-[9999999]"/>
          <Suspense fallback={<Loading/>}>

          {children}
          </Suspense>
          <Footer   footerData={socials?.data?.data || ""} />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
