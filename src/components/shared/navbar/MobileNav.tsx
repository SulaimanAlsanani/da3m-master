import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Customsearch from "../reusableComponents/CustomSearch";
import MainLink from "../formcomponents/MainLink";
import ProfileCard from "./ProfileCard";
import { useTranslations } from "next-intl";

type Props = {
  lang: "ar" | "en";
  isLogedIn: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogedIn: (value: boolean) => void;
  userData:{name:string, image:string};
};
const MobileNav = ({ lang, isLogedIn, setIsLogedIn, setOpen ,userData}: Props) => {
  const t = useTranslations('login')
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    // Add event listener when the profile card is open
    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);
  return (
   <div className="flex flex-col gap-5 ">
   
     <div className="flex  items-center justify-between w-full  lg:hidden">
      {/* Logo - Mobile */}
      <div className=" relative ">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={53} height={53}
          className="object-contain h-[53px] w-[53px]  rounded-full"
        />
      </div>

      
{/* 
      {isLogedIn ? (
        <div
          ref={profileRef} // Attach the ref here
          className=" col-span-3 flex gap-1 items-center relative"
        >
          <Image
            width={52}
            height={52}
            src={userData.image|| "/images/arrow-down.svg"}
            alt="icons"
            className="w-[28px] h-[28px] md:w-[52px] md:h-[52px] rounded-full"
          />
          <div className="flex flex-col">
          <p className="text-[#6F7C82] text-[12px] font-normal">{lang === "ar" ?"مرحيا":"Welcome"}</p>
            <div className="flex gap-1 text-[#333C52] text-[16px] font-bold">
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
              isLogedIn={isLogedIn}
            />
          )}
        </div>
      ) : (
        <MainLink
          href="/login"
          className="col-span-3  px-2 py-1 rounded-[10px] !bg-[#9F7A32] text-white   w-fit  "
        >
          <div className="flex gap-1 items-center">
            <Image
              src="/images/profile.png"
              width={20}
              height={20}
              className="w-5 h-5"
              alt="user icon "
            />
            <span className="text-[10px] md:text-[12px]">{t('title')} </span>
          </div>
        </MainLink>
      )} */}

      {/* Right Side */}
      <button onClick={() => setOpen(true)} className=" flex items-center justify-center    ">
        {/* icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34px"
          height="38px"
          viewBox="0 0 24 24"
        >
          <path
            fill="#9F7A32"
            d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
          ></path>
        </svg>
      </button>
    </div>
   
   </div>
  );
};

export default MobileNav;
