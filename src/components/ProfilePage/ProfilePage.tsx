"use client";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import MainLink from "../shared/formcomponents/MainLink";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "../shared/formcomponents/Container";
import MyRating from "./MyRating";
import { useTranslations } from "next-intl";

type Inputs = {
  email: string;
  mobile: string;
  area_name: string;
  socials: {
    name: string;
    link: any;
    type: string;
    id: string;
  }[];
};
const ProfilePage = ({
  locale,
  profileData,
}: // socilasProfile,
{
  locale: string;
  profileData: any;
  // socilasProfile: Record<string, string> | any;
}) => {
  // console.log("profileData", profileData);

  const user = profileData?.user;
  const rates = profileData?.rates;
  const socilasProfile = profileData?.user?.socials;
  console.log("socilasProfile......................", profileData);
  // console.log("user", user);
  const t = useTranslations("myProfile");

  const socials = useMemo(() => {
    const defaultPlatforms = [
      { name: "facebook", icon: "/images/facebook.svg" },
      { name: "twitter", icon: "/images/twitter.svg" },
      { name: "instagram", icon: "/images/instagram.svg" },
      { name: "snapchat", icon: "/images/snapchat.svg" },
      { name: "whatsapp", icon: "/images/whatsapp.svg" },
    ];

    const profileMap =
      socilasProfile?.reduce((acc: Record<string, any>, item: any) => {
        acc[item.type?.toLowerCase()] = item;
        return acc;
      }, {}) || {};

    return defaultPlatforms.map(({ name, icon }) => ({
      name,
      link: profileMap[name]?.link || "",
      icon,
    }));
  }, [socilasProfile]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      mobile: "",
      area_name: "",
      socials: socials || [],
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  useEffect(() => {
    reset({
      mobile: user.mobile,
      email: user.email,
      area_name: user.area_name,
      socials: socials || [],
    });
  }, [reset, user, socials]);
  return (
    <Container className="flex items-center mt-[160px] flex-col  justify-start  bg-[url(/images/loginBG.svg)] bg-cover bg-center ">
      <Image
        src={user.image || "/images/star.svg"}
        alt="logo"
        width={100}
        height={100}
        className="rounded-full w-[100px] h-[100px] "
      />
      <div className="flex justify-center items-center  gap-2">
        <p className="font-bukraBold text-[#333C52] text-[24px]">{user.name}</p>
        <Image src="/images/star.svg" alt="rating" width={28} height={28} />
        <p className=" text-[#F68223] text-[24px]">{user.avg_rate}</p>
      </div>
      <div className="flex  justify-center items-center gap-5 mt-[10px]">
        <p className="text-[16px] text-[#6F7C82]">
          {t("accountType")}
          <span className="text-[#2EA044]"> : {user.type}</span>
        </p>
        <div className="flex justify-center items-center gap-1">
          <Image
            src="/images/category.svg"
            alt="category"
            width={28}
            height={28}
          />
          <p className="text-[#2EA044]">{user.category_name}</p>
        </div>
      </div>
      <MainLink
        href="/edit-profile"
        className="bg-[#9F7A32]/[0.08] mt-[21px] py-4 px-[61px] rounded-[14px] flex gap-1"
      >
        <p className="text-[#9F7A32] font-bukraRegular text-[16px] ">
          {" "}
          {t("downloadMyData")}
        </p>
        <Image src="/images/edit.svg" alt="edit" width={24} height={24} />
      </MainLink>

      <form onSubmit={handleSubmit(onSubmit)} className=" w-full mt-[35px]">
        <div className="grid grid-cols-12 gap-4 mt-[50px] w-full ">
          <div className="flex gap-[11px] justify-start items-center bg-[#333C52]/[0.03] py-4 ps-[37px]  rounded-[14px] col-span-12 md:col-span-4 ">
            <Image src="/images/call.svg" alt="user" width={22} height={22} />
            <input
              type="text"
              {...register("mobile", { disabled: true })}
              className="bg-transparent text-[#333C52] text-[14px] w-full"
            />
          </div>

          <div className="flex gap-[11px] justify-start items-center bg-[#333C52]/[0.03] py-4 ps-[37px]  rounded-[14px] col-span-12 md:col-span-4 ">
            <Image src="/images/sms.svg" alt="user" width={24} height={24} />
            <input
              type="text"
              {...register("email", { disabled: true })}
              className="bg-transparent text-[#333C52] text-[14px] w-full"
            />
          </div>

          <div className="flex gap-[11px] justify-start items-center bg-[#333C52]/[0.03] py-4 ps-[37px]  rounded-[14px] col-span-12 md:col-span-4  ">
            <Image
              src="/images/location-profile.svg"
              alt="user"
              width={22}
              height={22}
            />
            <input
              type="text"
              {...register("area_name", { disabled: true })}
              className="bg-transparent text-[#333C52] text-[14px] w-full "
            />
          </div>
        </div>
        <p className="w-full text-start text-[#333C52] text-[14px] font-bukraBold mt-[36px]">
          {t("mediaLinks")}
        </p>

        <div className="grid grid-cols-10 gap-[11px] w-full  mt-[21px]">
          {socials.map((social, index) => (
            <div
              key={index}
              className="flex gap-[11px] w-full justify-start items-center bg-[#333C52]/[0.03] py-4 lg:px-[23px] rounded-[14px] col-span-12  md:col-span-3 xl:col-span-2"
            >
              <Image src={social.icon} alt="user" width={18} height={18} />
              <input
                type="text"
                placeholder={social.link || social.name}
                // @ts-ignore
                {...register(`${social.link || social.name}`, {
                  disabled: true,
                })}
                className="bg-transparent text-[#333C52] text-[14px] w-full"
              />
            </div>
          ))}
        </div>
      </form>
      <p
        dir="rtl"
        className="w-full text-start text-[#333C52] text-[14px] font-bukraBold  mt-[35px]"
      >
        {t("adsAbout")}
      </p>
      <p
        dir="rtl"
        className="w-full text-start text-[#333C52] text-[12px] mt-[15px]"
      >
        {user.brief}
      </p>
      <div className="w-full">
        <MyRating rates={rates} />
      </div>
    </Container>
  );
};

export default ProfilePage;
