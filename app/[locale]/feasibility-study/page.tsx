import Container from "@/components/shared/formcomponents/Container";
import Image from "next/image";
import React from "react";
import img from "@/public/images/feasibility-study.svg";
import FeasibilityStudyCard from "./FeasibilityStudyCard";
import { getFeasibilityData } from "@/lib/serverActions";
import { getTranslations } from "next-intl/server";

interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
const page = async ({ params }: LayoutProps) => {
  const { locale } = await params;
  const feasibilityData = await getFeasibilityData(locale);
  const t = await getTranslations("feasibility");

  return (
    <Container className=" mt-[120px] lg:mt-[180px]">
      <div className="text-center">
        <Image
          src={img}
          alt="feasibility-study"
          className="w-[54.15px] h-[54.15px] mx-auto"
        />
        <h2 className="text-[#9F7A32] font-bold text-[25px] lg:w-[175px] mx-auto mt-2">
          {t("title")}
        </h2>
        <p className="text-sm text-[#9F7A32] mt-2">{t("description")}</p>
      </div>
      <FeasibilityStudyCard
        feasibilityData={feasibilityData?.data?.data?.page}
      />
    </Container>
  );
};

export default page;
