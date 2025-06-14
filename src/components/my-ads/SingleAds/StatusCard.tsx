import { useTranslations } from 'next-intl';
import React from 'react'

const StatusCard = ({accepted,locale}:{accepted:string,locale:string}) => {
  const refused = accepted === "refused";
  const t = useTranslations("myAds");
  console.log("refused", refused);
  
  return (
    <div className={`border-[1px] px-[22px] py-[9px] ${refused ? "border-[#EE0028]/[0.13]" : "border-[#9F7A32]/[0.24]"} rounded-[14px] flex items-center gap-2`}>
    <svg
      id="vuesax_broken_mouse-circle"
      data-name="vuesax/broken/mouse-circle"
      xmlns="http://www.w3.org/2000/svg"
      width="22.44"
      height="22.44"
      viewBox="0 0 22.44 22.44"
    >
      <g id="mouse-circle">
        <path
          id="Vector"
          d="M7.433,4.509l-1.524.514a1.407,1.407,0,0,0-.9.9L4.5,7.445a1.418,1.418,0,0,1-2.7-.028L.065,1.854A1.421,1.421,0,0,1,1.842.068L7.415,1.8A1.427,1.427,0,0,1,7.433,4.509Z"
          transform="translate(12.165 12.171)"
          fill="none"
          stroke={`${refused ? "#EE0028" : "#9F7A32"}`}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M1.851,0a9.348,9.348,0,0,0,7.5,14.932"
          transform="translate(1.87 5.638)"
          fill="none"
          stroke={`${refused ? "#EE0028" : "#9F7A32"}`}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector-3"
          data-name="Vector"
          d="M13.315,9.35A9.356,9.356,0,0,0,0,.879"
          transform="translate(7.256 1.87)"
          fill="none"
          stroke={`${refused ? "#EE0028" : "#9F7A32"}`}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H22.44V22.44H0Z"
          fill="none"
          opacity="0"
        />
      </g>
    </svg>
    <p className="text-[#B5B5B5] text-[10px] font-bold">
      {t("status")}:{" "}
    </p>
    <p className={`text-[${refused ? "#EE0028" : "#9F7A32"}] text-[10px] font-bold`}>
      {accepted}
    </p>
  </div>
  )
}

export default StatusCard