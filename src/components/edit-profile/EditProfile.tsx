"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslations } from "use-intl";

import apiServiceCall from "@/lib/apiServiceCall";
import Container from "../shared/formcomponents/Container";
import Upload from "../shared/Upload";
import CustomSelect from "../shared/reusableComponents/CustomSelect";
import { RadioGroup } from "../ui/radio-group";
import HeaderProfile from "./HeaderProfile";
import { InputField, RadioOption } from "./ReusableInput";
import { Inputs } from "./types";
import Image from "next/image";
import MyMap from "../shared/Map/Map";
import CustomModal from "../shared/reusableComponents/CustomModal";
import InputComponent from "../shared/reusableComponents/InputComponent";
import CustomButton from "../shared/reusableComponents/CustomButton";

const EditProfile = ({
  locale,
  profileData,
  areas,
  categories,
  token,
}: {
  locale: string;
  profileData: any;
  token: string | undefined;
  areas: any;
  categories: any;
}) => {
  const [imageLicense, setImageLicense] = useState<File | null>(null);
  const [imageProfile, setImageProfile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<{
    lat: null | number;
    lng: null | number;
    name: string;
  }>({ lat: 24.628053928453202, lng: 46.681521298473854 , name: ''});
  useEffect(()=>{
    console.log('location', location)
    reset({...getValues() ,lat: location.lat, lng: location.lng, address: location.name})
     
  },[location])
  const t = useTranslations("editProfile");
  const user = profileData?.user;
  const socials = profileData?.user?.socials;
  const Fullocation = profileData?.user?.location;
  console.log("categories", categories);
  console.log("profileData", profileData);
  const socialTypes = ["twitter", "facebook", "instagram", "snapchat", "whatsapp"];

const socialsList = socialTypes.map((type) => {
  const social = socials.find((s) => s.type === type);
  return {
    name: type,
    link: social?.link || "",
    icon: `/images/${type}.svg`,
  };
});
  const typeStore = [
    { value: "store", label: "store" },
    { value: "client", label: "client" },
  ];
  const categoryOptions = categories.map((cat: any) => ({
    value: String(cat.id),
    label: cat.title,
  }));

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    defaultValues: {
      //@ts-ignore
      area_id: String(user.area_id),
      type: user.type,
      category_id: String(user.category_id),
    },
  });
  console.log("getValues", getValues());
  const defaultSocials = {
    "socials[twitter]": socials[0]?.link || "",
    "socials[facebook]": socials[1]?.link || "",
    "socials[instagram]": socials[2]?.link || "",
    "socials[snapchat]": socials[3]?.link || "",
    "socials[whatsapp]": socials[4]?.link || "",
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        mobile: user.mobile || "",
        email: user.email || "",
        area_name: String(user.area_id) || "",
        type: user.type || "",
        category_id: String(user.category_id) || "",
        has_licence: user.has_licence ? 1 : 0,
        ...defaultSocials,
        brief: user.brief || "",
        image: user.image || null,
      });
    }
  }, [areas, reset, user]);
useEffect(()=>{
reset({...getValues(), lat: Fullocation?.lat, lng: Fullocation?.lng, address: Fullocation?.text})
setLocation({
  lat: Fullocation?.lat ,lng: Fullocation?.lng, name: Fullocation?.text})

},[Fullocation])
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Inputs) =>
      apiServiceCall({
        url: "profile/edit",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: data,
      }),
    onError: (error: any) => {
      toast.error(error?.data?.message || "Unable to update profile");
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Profile updated successfully");
      window.location.href = `/${locale}/profile`;
      reset();
    },
  });

  useEffect(() => {
    if (isPending) {
      toast.loading("Loading...", {
        toastId: "loadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loadingToast");
    }
  }, [isPending]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("mobile", data.mobile);
    formData.append("email", data.email);
    formData.append("area_id", data.area_id);
    formData.append("type", data.type);
    formData.append("category_id", data.category_id);
    formData.append("has_licence", data.has_licence === 1 ? "1" : "0");

    formData.append("socials[twitter]", data.socials.twitter);
    formData.append("socials[facebook]", data.socials.facebook);
    formData.append("socials[instagram]", data.socials.instagram);
    formData.append("socials[snapchat]", data.socials.snapchat);
    formData.append("socials[whatsapp]", data.socials.whatsapp);
    formData.append("brief", data.brief);
   if(data.address){
    formData.append("location[lat]", String(location.lat));
    formData.append("location[lng]", String(location.lng));
    formData.append("location[text]", data.address);
   }

    if(imageProfile){
 // @ts-ignore
 formData.append("image", imageProfile);
    }
    if(imageLicense){
 // @ts-ignore
 formData.append("licence", imageLicense);
    }
    // @ts-ignore
    
   

    //@ts-ignore
    mutate(formData);
  };

  return (
    <Container className="flex flex-col justify-center items-center mt-[100px] lg:mt-[140px]">
      {/* Header */}
      <HeaderProfile setImageProfile={setImageProfile} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] w-full">
        <div className="grid grid-cols-12 gap-8 lg:gap-4">
          {/* Name */}
          <InputField
            label={t("name")}
            register={register("name")}
            error={errors.name}
          />

          {/* Mobile */}
          <InputField
            label={t("mobile")}
            register={register("mobile")}
            type="number"
            error={errors.mobile}
          />

          {/* Email */}
          <InputField
            label={t("email")}
            register={register("email")}
            type="email"
            error={errors.email}
          />

          <div className="relative col-span-12 md:col-span-4 py-2">
            <CustomSelect
              name="area_id"
              control={control}
              options={areas}
              placeholder="area"
              arrayKey="cities"
              isGroup
              groupKey="name"
            />
            {errors.area_name && (
              <p className="col-span-12 text-end  text-red-500">
                {errors.area_name.message}
              </p>
            )}
           
          </div>
          <div className="flex flex-col  col-span-12 md:col-span-4 relative py-2 cursor-pointer">
          <label className="absolute top-[10px] right-3 text-[#848484] text-[12px] font-normal">
              {t("select_city")}
            </label>
        <div
          onClick={() => setOpen(true)}
          className="  z-[99] absolute w-full h-full top-0 start-0"
        ></div>
         
         <InputField
            label={t("address")}
            register={register("address")}
            error={errors.name}
          />
       
      </div>
          <div className="relative col-span-12 md:col-span-4 py-2">
            <CustomSelect
              name="type"
              control={control}
              options={typeStore}
              placeholder="type"
            />
            {errors.type && (
              <p className="col-span-12 text-end  text-red-500">
                {errors.type.message}
              </p>
            )}
            <label className="absolute top-[10px] right-3 text-[#848484] text-[12px] font-normal">
              {t("select_account_type")}
            </label>
          </div>

          <div className="relative col-span-12 md:col-span-4 py-2">
            <CustomSelect
              name="category_id"
              control={control}
              options={categoryOptions}
              placeholder="categories"
            />
            {errors.category_name && (
              <p className="col-span-12 text-end  text-red-500">
                {errors.category_name.message}
              </p>
            )}
            <label className="absolute top-[10px] right-3 text-[#848484] text-[12px] font-normal">
              {t("select_account_type")}
            </label>
          </div>

          {/* License Radio */}
          <div className="col-span-6 md:col-span-4 text-[#848484]">
            <p className="text-[14px] font-bold">{t("license_question")}</p>
            <p className="text-[14px]">{t("license_description")}</p>
            {/* <Controller
              name="has_licence"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  // onValueChange={(val) => field.onChange(val)}
                  // value={field.value}
                  className="flex gap-[40px] mt-[15px]"
                >
                  <RadioOption value="1" label={t("yes")} />
                  <RadioOption value="0" label={t("no")} />
                </RadioGroup>
              )}
            /> */}

            <Controller
  name="has_licence"
  control={control}
  render={({ field }) => (
    <RadioGroup
      onValueChange={(val) => field.onChange(Number(val))} // convert to number
      value={String(field.value)} // value must be string for RadioGroup
      className="flex gap-[40px] mt-[15px]"
    >
      <RadioOption value="1" label={t("yes")} />
      <RadioOption value="0" label={t("no")} />
    </RadioGroup>
  )}
/>
          </div>

          {/* License Upload */}
          <div className="col-span-6 md:col-span-4 flex items-center gap-[10px]">
            <Upload setFile={setImageLicense} />
            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#333C52]">
                {t("change_license_image")}
              </p>
              <p className="text-[12px] text-[#848484]">
                {t("change_license_image_description")}
              </p>
            </div>
          </div>

          {/* tools */}
          <InputField
            label={t("tools_label")}
            register={register("brief")}
            error={errors.brief}
          />

          <div className="col-span-12">
            <p className="text-[14px] text-[#333C52] font-bold">
              {t("social_media_label")}
            </p>
            <p className="text-[#333C52] font-[400] text-[12px] mt-[13px]">
              {t("social_media_description")}
            </p>
          </div>

          <div className="col-span-12 grid grid-cols-12 gap-[11px] mt-[21px]">
            {socialsList.map((social, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-4 flex gap-[11px] justify-start items-center bg-[#333C52]/[0.03] py-4 px-[23px] rounded-[14px] "
              >
                <Image src={social.icon} alt="user" width={18} height={18} />
                <input
                dir="ltr"
                  placeholder={social.name}
                  type="text"
                  {...register(`socials.${social.name as "twitter" | "facebook" | "instagram" | "snapchat" | "whatsapp"}`)}
                  defaultValue={social.link}
                  className="bg-transparent focus:outline-none w-full h-full text-[#333C52] text-[14px] text-start"
                />
              </div>
            ))}
          
            <div className="col-span-12 md:col-span-4 mt-4">
              <button
                type="submit"
                className="w-full bg-[#9F7A32] text-white rounded-[14px] h-[50px]"
              >
                {t("save_changes")}
              </button>
            </div>
          </div>
         {open&&  <CustomModal  close openCloseModal={setOpen}>

<MyMap setLocation={setLocation} /> 
<div className="flex flex-col">

   <CustomButton type="button" onClick={()=>setOpen(false)}>{locale === 'ar'? "تاكيد العنوان" :"Confirm Address"}</CustomButton>
</div>

 </CustomModal>}
        </div>
      </form>
    </Container>
  );
};

export default EditProfile;
