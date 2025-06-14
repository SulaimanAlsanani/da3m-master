import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import MainLink from "../formcomponents/MainLink";

type Props = {
  isLogedIn?: boolean;
  setIsLogedIn?: (value: boolean) => void;
  openProfile?: boolean;
  setOpenProfile?: (value: boolean) => void;
  className?: string;
  setOpen: (open: boolean) => void;

};
const ProfileCard = ({
  isLogedIn,
  setIsLogedIn,
  setOpen,
  className,
  openProfile,
  setOpenProfile,
}: Props) => {
  const t = useTranslations("navbar");
  const menuItems: any[] = [
    { value: t("profile"), path: "/profile" },
    { value: t("addAd"), path: "/add-ads" },
    { value: t("adList"), path: "/my-ads" },
    { value: t("bankAccount"), path: "/bank-accounts" },
    { value: t("wallet"), path: "/wallet" },
    { value: t("notifications"), path: "/notifications" },
    { value: t("logout"), path: "/login" },
  ];
  const logoutHandlder = async () => {
    try {


      
      await fetch("/api/auth/logout", { method: "GET" });
      window.location.href = "/";
      // const response = await fetch('/api/logout', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         '
      //     }
      // })
      // if(response.ok){

      // }else{
      //     console.log("Failed to logout")
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const icons: any[] = [
    "profile.svg",
    "add.svg",
    "myAds.svg",
    "cards.svg",
    "wallet.svg",
    "notification.svg",
    "logout.svg",
  ];
  const handleClick = () => {
    // setIsLogedIn(false);
    setOpenProfile && setOpenProfile(!openProfile);
    setOpen(false)
  };
  return (
    <div
      className={`absolute top-14  w-[120px] md:w-[221px] rounded-[14px] z-[99999] bg-white text-[10px] md:text-[14px] text-[#333C52] py-[14px] px-[12px] space-y-3 md:py-[14px] md:px-[12px] md:space-y-3  lg:py-[40px] lg:px-[30px] lg:space-y-8 font-normal ${className&&className}`}
      style={{ boxShadow: "0px 0px 80px #8A888852" }}
    >
      {menuItems.map((item, index) => {
        if (item.value === t("logout")) {
          return (
            <button onClick={logoutHandlder} key={index} className="flex gap-2">
              <Image
                src={`/images/${icons[index]}`}
                width={24}
                height={24}
                className="w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]"
                alt={item.value}
              />{" "}
              <span className="text-[#EE0028]">{t("logout")}</span>
            </button>
          );
        }
        return (
          <div key={index} className="flex gap-x-1 md:gap-x-4  items-center">
            <Image
              src={`/images/${icons[index]}`}
              width={24}
              height={24}
              className="w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]"
              alt={item.value}
            />
            <MainLink className="!text-black" onClick={handleClick} href={item.path}>
              {item.value}
            </MainLink>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileCard;
