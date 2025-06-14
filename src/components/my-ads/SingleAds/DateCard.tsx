import { useTranslations } from "next-intl";
import React from "react";

const DateCard = ({
  started_at,
  finished_at,
  locale
}: {
  started_at?: string;
  finished_at?: string;
  locale:string
}) => {
  const t = useTranslations("myAds");
  return (
    <div className="bg-[#9F7A32]/[0.05] rounded-[14px] flex items-center gap-1 ps-[15px] pe-[54px] pt-[8px] py-[11px]">
      <svg
        id="vuesax_broken_calendar-2"
        data-name="vuesax/broken/calendar-2"
        xmlns="http://www.w3.org/2000/svg"
        width="25.699"
        height="25.699"
        viewBox="0 0 25.699 25.699"
      >
        <g id="calendar-2">
          <path
            id="Vector"
            d="M0,0V3.212"
            transform="translate(8.566 2.142)"
            fill="none"
            stroke="#9f7a32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M0,0V3.212"
            transform="translate(17.132 2.142)"
            fill="none"
            stroke="#9f7a32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
          />
          <path
            id="Vector-3"
            data-name="Vector"
            d="M0,0H18.2"
            transform="translate(3.748 9.733)"
            fill="none"
            stroke="#9f7a32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
          />
          <path
            id="Vector-4"
            data-name="Vector"
            d="M0,0H25.7V25.7H0Z"
            fill="none"
            opacity="0"
          />
          <path
            id="Vector-5"
            data-name="Vector"
            d="M0,10.183V5.354C0,2.142,1.606,0,5.354,0H13.92c3.748,0,5.354,2.142,5.354,5.354v9.1c0,3.212-1.606,5.354-5.354,5.354H5.354C1.606,19.809,0,17.668,0,14.455"
            transform="translate(3.212 3.748)"
            fill="none"
            stroke="#9f7a32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
          />
          <path
            id="Vector-6"
            data-name="Vector"
            d="M.495.5H.5"
            transform="translate(12.35 14.17)"
            fill="none"
            stroke="#9f7a32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
          />
          <path
            id="Vector-7"
            data-name="Vector"
            d="M.495.5H.5"
            transform="translate(8.387 14.17)"
            fill="none"
            stroke="#9f7a32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
          />
          <path
            id="Vector-8"
            data-name="Vector"
            d="M.495.5H.5"
            transform="translate(8.387 17.382)"
            fill="none"
            stroke="#9f7a32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
          />
        </g>
      </svg>
      <div className="flex flex-col justify-center items-start gap-1">
        {!!started_at && (
          <>
            <p className="text-[#9F7A32] text-[14px] font-bold">
              {t("start-date")}
            </p>
            <p className="text-[#333C52] text-[11px] font-normal">
              {started_at}
            </p>
          </>
        )}
        {!!finished_at && (
          <>
            <p className="text-[#9F7A32] text-[14px] font-bold">
            {t("end-date")}
            </p>
            <p className="text-[#333C52] text-[11px] font-normal">
              {finished_at}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DateCard;
