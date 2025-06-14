

"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Icon } from "@iconify/react";

import { useTranslations } from "next-intl";
import { NavbarMenueItem } from "@/types/shared";
import RadioGroup from "@/app/components/filter/components/RadioGroup";

import Image from "next/image";

import MainLink from "@/components/shared/formcomponents/MainLink";
import Language from "./Language";
import Customsearch from "../reusableComponents/CustomSearch";
import ProfileCard from "./ProfileCard";

function AsideMenu({
  lang,
  iconColor,
  setSearchTerm,
  isLogedIn,
  setIsLogedIn,
  open,
  setOpen,
  areaName,
  menuItems,
  userData
}: {
  lang: string;
  iconColor?: string;
  isLogedIn: boolean;
  areaName?: string;
  open: boolean;
  setIsLogedIn: Dispatch<SetStateAction<boolean>>
  setOpen: (open: boolean) => void;
  menuItems: Record<string, string>[];
  setSearchTerm: Dispatch<SetStateAction<string>>
  userData:{name:string, image:string, location:{text:string}}

}) {
  const t = useTranslations("navbar");
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  // const menuItems: any[] = [
  //   { value: t("homeLink"), path: "/" },
  //   { value: t("sections"), path: "/" },
  //   { value: t("ads"), path: "/" },
  //   { value: t("services"), path: "/" },
  //   { value: t("contactUs"), path: "/" },
  // ];

  return (
    <>
      {/* aside*/}

      <div
        className={` fixed top-0  left-0 w-[calc(100%-150px)] overflow-y-auto pb-4 max-w-[350px] h-dvh bg-[#00000026]/50 backdrop-blur-sm z-[100] flex flex-col  items-start duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 items-start w-full px-8 text-xl font-medium">
          <div
            className=" mt-12  flex gap-2 text-white items-center justify-start w-full cursor-pointer "
            onClick={() => setOpen(false)}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#fff"
                  d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"
                />
                <path
                  fill="#fff"
                  d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                />
              </svg>
            </span>{" "}
            {t("close")}
          </div>{" "}
          <ul className="flex flex-col gap-6 items-start pb-6 w-full ">
            {menuItems?.map((item, i) => (
              <li
                key={item?.value}
                className={`translate-x-[-100%] ${
                  open ? "!translate-x-0" : ""
                }`}
                style={{ transitionDuration: `${300 * (i + 1)}ms` }}
                onClick={() => setOpen(false)}
              >
                <MainLink
                  locale={lang}
                  href={item.path}
                  className="text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.value}
                </MainLink>
              </li>
            ))}
          </ul>
            <Language className=" h-full" />


        </div>
        {isLogedIn ? (
        <div
          ref={profileRef} // Attach the ref here
          className="flex gap-1 ps-4 my-1 items-center relative"
        >
          <MainLink href="profile">
          <Image
            width={52}
            height={52}
            src={userData.image|| "/images/arrow-down.svg"}
            alt="icons"
            className="rounded-full w-[52px] h-[52px]"
          />
          </MainLink>
          <div className="flex flex-col text-[white]">
            <p className=" text-[12px] font-normal">{lang === "ar" ?"مرحيا":"Welcome"}</p>
            <div className="flex gap-1  text-[16px] font-bold">
              {userData.name}
              <Image
                width={16}
                height={16}
                src="/images/arrow-down.svg"
                alt="icons"
                className="cursor-pointer"
                onClick={() => setOpenProfile(!openProfile)}
              />
            </div>
          </div>
          {openProfile && (
            <ProfileCard
              setOpenProfile={setOpenProfile}
              openProfile={openProfile}
              setIsLogedIn={setIsLogedIn}
              setOpen={setOpen}
              isLogedIn={isLogedIn}
              className="w-[190px] !text-black "
            />
          )}
        </div>
      ) : (
        <MainLink
          href="/login"
          onClick={() => setOpen(false)}
          className=" px-6 py-2 rounded-[4px] !bg-[#9F7A32] text-white w-[93%] !ms-2 "
        >
          <div className="flex gap-1 items-center">
            <Image
              src="/images/profile.png"
              width={24}
              height={24}
              className="w-6 h-6"
              alt="user icon "
            />
            <span className="text-[12px]">{lang === "ar" ? "تسجيل الدخول":"Login"}</span>
          </div>
        </MainLink>
      )}
      
            <div className="w-full px-2 mt-2">
        <Customsearch className="rounded-[4px] !py-2 !w-full" onChange={(e) => setSearchTerm(e.target.value)} lang={lang} isMobile />
      </div>
      {areaName &&   <div className="flex mt-2 gap-2 ms-2 py-[8px] px-[14px] justify-center  items-center rounded-[4px] w-[93%] bg-[white]">
        <Image
          width={18}
          height={18}
          src="/images/location.svg"
          alt="icons"
          className=""
        />
        <div className="flex flex-col text-[10px] !text-primary ">
          <span className=" !text-primary font-bold">{areaName}</span>
          {/* <p className=" text-[#333C52] font-normal">
            {(() => {
              const words = locationText.split(" ");
              if (words.length > 2) {
                return `${words.slice(0, 2).join(" ")} ${words[2].slice(
                  0,
                  2
                )}...`;
              }
              return locationText;
            })()}
          </p> */}
        </div>
        {/* <Image width={18} height={18} src="/images/refersh.svg" alt="icons" /> */}
      </div>}
      </div>
      {open && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-[#00000000]/20 z-10 duration-500`}
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}

export default AsideMenu;
