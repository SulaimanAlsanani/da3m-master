

import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import MainLink from "../formcomponents/MainLink";
import ProfileCard from "./ProfileCard";
import Customsearch from "../reusableComponents/CustomSearch";
import { usePathname } from "next/navigation";
import Language from "./Language";
import { useTranslations } from "next-intl";
import apiServiceCall from "@/lib/apiServiceCall";
import { useQuery } from "@tanstack/react-query";
import CustomModal from "../reusableComponents/CustomModal";
import play from "@/public/images/play.svg";
import Gallary from "@/components/vedieosSlider/Gallary";
import Card from "../Card";
import SearchCard from "../reusableComponents/SearchCard";

type Props = {
  menuItems: Record<string, string>[];
  icons: string[];
  iconsActive: string[];
  lang: "ar" | "en";
  locationText: string;
  isLogedIn: boolean;
  setIsLogedIn: (value: boolean) => void;
  userData:{name:string, image:string}
  areaName:string,
  setSearchTerm: Dispatch<SetStateAction<string>>
};

const DesktopNav = ({
  menuItems,
  areaName,
  icons,
  setSearchTerm,
  iconsActive,
  lang,
  userData,
 
  isLogedIn,
  setIsLogedIn,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [openGallary, setOpenGallary] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const t = useTranslations("login");
  const [isClicked, setIsclicked] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null); // Ref for the profile section (button + card)
  const pathname = usePathname();
  const pagePathName = pathname.replace(/^\/(ar|en)/, "") || "/";
 
// console.log(searchTerm)
  // Close ProfileCard when clicking outside
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

  console.log("userData nav bar", userData);
  
  return (
    <div className="hidden h-[130px] lg:flex items-center justify-between w-full  relative  ">
    <div className="relative w-[74px] h-[86px] me-[64px]">
     
     <Image
        src="/images/logo.png"
        alt="Logo"
        fill
        className="object-contain"
      />
 
    </div>

      {menuItems.map((item, index) => (
        <div key={index} className="flex items-center gap-[28px]">
          
          <MainLink
            href={item.path}
            className={`hover:text-[#9F7A32] text-[#333C52] flex gap-1 text-[16px] font-bold transition-colors ${
              pagePathName === item.path ? "text-[#9F7A32]" : ""
            }`}
          >
            <Image
            width={18}
            height={18}
            src={pagePathName === item.path ? `/images/${iconsActive[index]}`:`/images/${icons[index]}`}
            alt="icons"
          />
            {item.value}
          </MainLink>
        </div>
      ))}
      {!isClicked ? (
        <Image
          width={24}
          height={24}
          src="/images/search.svg"
          alt="icons"
          onClick={() => setIsclicked(true)}
        />
      ) : (
        <Customsearch
          setIsclicked={setIsclicked}
          isClicked={isClicked}
          onChange={(e) => setSearchTerm(e.target.value)}
          lang={lang}
        />
      )}
     
    {areaName &&   <div className="flex gap-2 ms-[-16px] py-[8px] px-[14px] justify-center items-center rounded-[14px] bg-[#9F7A32]/[0.05]">
        <Image
          width={18}
          height={18}
          src="/images/location.svg"
          alt="icons"
          className=""
        />
        <div className="flex flex-col text-[10px] ">
          <p className=" text-[#8B8B4C] font-bold">{areaName}</p>
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
      {/* Profile */}
      {isLogedIn ? (
        <div
          ref={profileRef} // Attach the ref here
          className="flex gap-1 ms-[-16px] items-center relative"
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
          className="ms-[-16px] px-6 py-3 rounded-[14px] !bg-[#9F7A32] text-white  min-w-fit"
        >
          <div className="flex gap-1 items-center">
            <Image
              src="/images/profile.png"
              width={24}
              height={24}
              className="w-6 h-6"
              alt="user icon "
            />
            <span className="text-[12px]">{t('title')}</span>
          </div>
        </MainLink>
      )}

      <div className="ms-[-16px]">
        <Language />
      </div>
      
    </div>
  );
};

export default DesktopNav;