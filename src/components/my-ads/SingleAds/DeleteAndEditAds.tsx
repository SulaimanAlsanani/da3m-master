import MainLink from "@/components/shared/formcomponents/MainLink";
import { useTranslations } from "next-intl";
import React from "react";
type props = {
    id:string,
    mutate:(id:string)=> void
    locale:string
}
const DeleteAndEditAds = ({id,mutate,locale}:props) => {
    const t = useTranslations("myAds");
  return (
    <div className=" grid grid-cols-5 gap-2">
      <MainLink
        href={`/add-ads?id=${id}`}
        className="bg-[#9F7A32]  rounded-[14px]   text-center py-[18px] mt-[37px] col-span-3 flex items-center justify-center gap-1"
      >
        <svg
          id="vuesax_linear_edit-2"
          data-name="vuesax/linear/edit-2"
          xmlns="http://www.w3.org/2000/svg"
          width="28.007"
          height="28.007"
          viewBox="0 0 28.007 28.007"
        >
          <g id="edit-2">
            <path
              id="Vector"
              d="M10.81,1.679,1.229,11.82a3.559,3.559,0,0,0-.782,1.669L.015,17.27A1.782,1.782,0,0,0,2.2,19.335l3.758-.642a3.351,3.351,0,0,0,1.622-.875L17.158,7.677c1.657-1.75,2.4-3.746-.175-6.185C14.416-.923,12.467-.071,10.81,1.679Z"
              transform="translate(4.664 2.522)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              id="Vector-2"
              data-name="Vector"
              d="M0,0A7.149,7.149,0,0,0,6.36,6.01"
              transform="translate(13.875 5.893)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              id="Vector-3"
              data-name="Vector"
              d="M0,0H21.005"
              transform="translate(3.501 25.673)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              id="Vector-4"
              data-name="Vector"
              d="M0,0H28.007V28.007H0Z"
              fill="none"
              opacity="0"
            />
          </g>
        </svg>

        <p className="text-white text-[14px] font-normal">  {t("edit-ad")}</p>
      </MainLink>
      <button onClick={()=> mutate(id)} className="bg-[#EE0028]  rounded-[14px] w-full  lg:w-[65%] text-center py-[18px] mt-[37px] col-span-2 flex items-center justify-center gap-1">
        <svg
          id="vuesax_linear_group"
          data-name="vuesax/linear/group"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g id="group">
            <path
              id="Vector"
              d="M12.9,0H7.1A3.475,3.475,0,0,0,4.98.88L.88,4.98A3.475,3.475,0,0,0,0,7.1v5.8a3.475,3.475,0,0,0,.88,2.12l4.1,4.1A3.475,3.475,0,0,0,7.1,20h5.8a3.475,3.475,0,0,0,2.12-.88l4.1-4.1A3.475,3.475,0,0,0,20,12.9V7.1a3.475,3.475,0,0,0-.88-2.12L15.02.88A3.475,3.475,0,0,0,12.9,0Z"
              transform="translate(2 2)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              id="Vector-2"
              data-name="Vector"
              d="M0,14.14,14.14,0"
              transform="translate(4.94 4.94)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              id="Vector-3"
              data-name="Vector"
              d="M0,0H24V24H0Z"
              fill="none"
              opacity="0"
            />
          </g>
        </svg>

        <p className="text-white text-[14px] font-normal">  {t("delete-ads")}</p>
      </button>
    </div>
  );
};

export default DeleteAndEditAds;
