import React from "react";
import Image from "next/image";
import whatsapp from "@/public/images/whatsapp-img.svg";
import { getTranslations } from "next-intl/server";

const FeasibilityStudyCard = async ({ feasibilityData }: any) => {
  const t = await getTranslations("feasibility");
  return (
    <div className="mt-10 flex flex-col lg:flex-row justify- gap-6 lg:gap-[55px]">
      <div className="lg:w-1/2 flex justify-center max-w-[588.85px] h-auto lg:h-[331.6px] rounded-[19px] relative">
        <Image src={feasibilityData?.image} alt="feasibility-study-img" fill />
      </div>

      <div className="lg:w-[444px] flex flex-col justify-between">
        <div>
          <h2 className="text-[#333C52] text-[16px] font-bold">
            {feasibilityData?.title}
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: feasibilityData?.content }}
            className="text-gray-500 mt-7 leading-[30px]"
          />
        </div>
        <a
          href={`https://wa.me/${feasibilityData?.whatsapp}`}
          target="_blank"
          className="bg-[#9F7A32] text-white mt-5 lg:mt-10 flex items-center justify-center gap-3 w-full lg:w-[444px] h-[54px] rounded-[14px] "
        >
          <Image src={whatsapp} alt="whatsapp" />
          {t("whatsapp_request")}
        </a>
      </div>
    </div>
  );
};

export default FeasibilityStudyCard;
