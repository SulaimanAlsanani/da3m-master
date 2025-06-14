import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const ToggleSection = ({
  checked,
  handleToggle,
  t,
}: {
  checked: boolean;
  handleToggle: () => void;
  t: any;
}) => {
  return (
    <>
      <div className="w-full flex items-center justify-start gap-[38px]">
        <div className="flex flex-col gap-[7px]">
          <p className="text-[14px] font-bold text-[#848484]">
            {t("toggleTitle")}
          </p>
          <p className="text-[12px] font-normal text-[#848484]">
            {t("toggleDescription")}
          </p>
        </div>

        <div
          className={`w-[37px] h-[22px] rounded-[14px] relative flex items-center transition-all duration-200 ${
            checked ? "bg-[#2EA044]" : "bg-gray-400"
          }`}
          onClick={handleToggle}
        >
          <input
            type="checkbox"
            className="invisible w-full h-full cursor-pointer"
          />
          <div
            className={`w-[15px] h-[15px] bg-white rounded-full absolute transition-all duration-200 ${
              checked ? "right-1" : "left-1"
            }`}
          ></div>
        </div>
      </div>
      <div className="w-full flex gap-[5px]">
        <Image src="/images/info.svg" alt="info" width={24} height={24} />
        <p className="text-[#EE0028] text-[12px] font-normal">
          {t("infoText")}
        </p>
      </div>
    </>
  );
};
