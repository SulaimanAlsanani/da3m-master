interface LayoutProps {
  params: Promise<{ locale: string | any }>; 
}
import { getTranslations } from "next-intl/server";

import { getHomeData, getProfileData } from "@/lib/serverActions";
import Hero from "@/components/hero/Hero";
import N from "@/components/n/N";
import Sections from "@/components/sections/Sections";
import KingdomDiscounts from "@/components/kingdom-discounts/KingdomDiscounts";
import Ads from "@/components/ads/Ads";
import OurServices from "@/components/our-services/OurServices";
import JoinUs from "@/components/join-us/JoinUs";
import ContactUs from "@/components/contact-us/ContactUs";
import VedioSlider from "@/components/vedieosSlider/VedioSlider";
import Container from "@/components/shared/formcomponents/Container";
import Gallary from "@/components/vedieosSlider/Gallary";
import { cookies } from "next/headers";
import { Icon } from "@iconify/react";

export default async function Home({ params }: LayoutProps) {
  const { locale } = await params;
  const { data } = await getHomeData(locale);
  const homeData = data?.data;
  console.log("homeData", homeData);
  const t = await getTranslations("navigation");

  console.log("locale", locale);
  console.log("t", t);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let profile :any = [];
  if (token) {
    profile = await getProfileData(locale);
  }
  

  return (
    <>
      <div className="flex min-h-screen flex-col  ">
        <div></div>
        <div>
          <Hero banner={homeData?.banner} />
        </div>
        <div data-aos="zoom-in-left" data-aos-duration="1300" id="sections">
          <Sections
            categories={homeData?.categories}
            categoriesDesc={homeData?.categories_desc}
          />
        </div>

        <div>
          <Ads adsList={homeData?.ads} />
        </div>
        <div data-aos="fade-up" id="services">
          {/* @ts-ignore */}
          <OurServices locale={locale} profileData={profile} />
        </div>
        <div data-aos="fade-up">
          <JoinUs home join={homeData?.join} locale={locale} />
        </div>
        <div data-aos="zoom-in" id="contactUs">
          <ContactUs locale={locale} />
        </div>
      </div>
    </>
  );
}
