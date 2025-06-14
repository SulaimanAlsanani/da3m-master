"use client";
import React, { useEffect, useState } from "react";
import projectLocation from "@/public/images/project-location.svg";
import projectUpload from "@/public/images/project-upload.svg";
import Image from "next/image";
import CustomSelect from "@/components/shared/reusableComponents/CustomSelect";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import MyMap from "@/components/shared/Map/Map";
import { useTranslations } from "next-intl";

import CustomModal from "../../../src/components/shared/reusableComponents/CustomModal";
import InputComponent from "../../../src/components/shared/reusableComponents/InputComponent";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
export type Region = {
  id: number;
  name: string;
  options: { id: number; name: string }[];
};

type Inputs = {
  name: string;
  mobile: string;
  area_id: string;
  area_name: string;
  link: string;
  description: string;
  address: string;
  images: FileList;
};

const ProjectImplementationForm = ({
  token,
  locale,
  user,
  areas,
}: {
  token: string | undefined;
  locale: string;
  user: any;
  areas: Region;
}) => {
  const [location, setLocation] = useState<{
    lat: null | number;
    lng: null | number;
    name: string;
  }>({ lat: 24.628053928453202, lng: 46.681521298473854, name: "" });

   useEffect(()=>{
      console.log('location', location)
      reset({...getValues() ,lat: location.lat, lng: location.lng, address: location.name})
       
    },[location])
  const [open, setOpen] = React.useState(false);
  console.log("user from project", user);
  const t = useTranslations("implementation")
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<Inputs>({
    // Removing the zodResolver and directly handling validation with React Hook Form
    defaultValues: {
      name: user.name || "",
      mobile: user.mobile || "",
      area_id: String(user.area_id) || "",
      area_name: user.area_name || "",
      address: user.location?.text || "",
    },
  });

  // useEffect(() => {
  //   if (user) {
  //     reset({
  //       name: user.name || "",
  //       mobile: user.mobile || "",
  //       area_id: String(user.area_id) || "",
  //       area_name: user.area_name || "",
  //       address: user.location?.address || "",
  //     });
  //   }
  // }, [reset, user, location]);

  console.log("GETvaleu project", getValues());

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data form project", data);

    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("mobile", user.mobile);
    formData.append("area_id", data.area_id);
    formData.append("link", data.link);
    formData.append("description", data.description);
    // formData.append('address', data.address);

    // Append images
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file, index) => {
        formData.append(`images[${index}]`, file); // 'images[]' to send as array
        console.log("file.....................", file);
        console.log("images..................", `images[${index}]`);
      });
    }

    // Append location
    formData.append("location[lat]", String(location.lat));
    formData.append("location[lng]", String(location.lng));
    formData.append("location[text]", data.address);

    mutate(formData);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) =>
      apiServiceCall({
        url: "project/store",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: data,
      }),
    onError: (error) => {
      toast.error((error as any)?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      reset();
    },
  });

  return (
    <div className="mt-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4 items-center justify-between ">
          <div className="relative  col-span-3 lg:col-span-1">
            <input
              type="text"
              className="bg-[#f7f7f8] h-[55px] w-full text-[#333C52] pt-5 px-3 rounded-[14px] focus:outline-none"
              placeholder={user?.name}
              {...register("name")}
            />
            <label className="absolute top-2 right-3 text-gray-500 text-sm">
              {t("nameLabel")}
            </label>
          </div>
          <div className="relative col-span-3 lg:col-span-1">
            <input
              type="text"
              className="bg-[#f7f7f8] h-[55px] w-full rounded-[14px] text-[#333C52] pt-5 px-3 focus:outline-none"
              placeholder={user?.mobile}
              {...register("mobile")}
            />
            <label className="absolute top-2 right-3 text-gray-500 text-sm">
              {t("mobileNumberLabel")}
            </label>
          </div>
          <div className="relative  col-span-3 lg:col-span-1">
            {/* <input
              type="text"
              className="bg-[#f7f7f8] rounded-[14px] h-[55px] w-full text-[#333C52] pt-5 px-3 focus:outline-none"
              placeholder="الرياض"
              readOnly
              {...register("area_name")}
            />
            <label className="absolute top-2 right-3 text-gray-500 text-sm">المدينة</label> */}
            <CustomSelect
              control={control}
              name="area_id"
              placeholder={user?.area_name}
              // @ts-ignore
              options={areas}
              arrayKey="cities"
              isGroup
              groupKey="name"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex flex-col gap-2 col-span-12 w-full lg:w-[352px] lg:col-span-4 relative cursor-pointer">
        <div
          onClick={() => setOpen(true)}
          className="  z-[99] absolute w-full h-full top-0 start-0"
        ></div>
        <InputComponent
          placeholder={t("address")}
          name="address"
          disabled
          childClassName="cursor-pointer mt-2 h-[55px] border border-gray-300 rounded-[8px] outline-none px-5 pl-12 w-full"
          register={register}
          validation={{ required: t("required") }}
          type="text"
          className=" !cursor-pointer "
        />
        <p className="text-red-500">{errors?.address?.message}</p>
      </div>
          <div className="w-full lg:w-[352px] rounded-[14px] relative">
            <input
              type="url"
              placeholder={t("documentsLabel")}
              className="h-[55px] border border-gray-300 rounded-[8px] outline-none px-5 pl-12 w-full"
              {...register("link", { required: "link_required" })}
            />
            {errors.link && (
              <p className="bg-white w-fit absolute top-[-12px] end-4 px-4 text-red-500">
                {errors.link.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full lg:w-[352px] flex items-center gap-5 relative">
            <label
              htmlFor="fileUpload"
              className={`w-[76px] h-[70px] border ${
                watch("images")?.length > 0
                  ? "border-green-500"
                  : "border-gray-300"
              } rounded-[14px] flex items-center justify-center cursor-pointer`}
            >
              <Image src={projectUpload} alt="projectUpload" />
            </label>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              accept="image/jpeg, image/png, image/jpg"
              multiple
              {...register("images", { required: "images_required" })}
            />
            {watch("images")?.length > 0 ? (
              <p className="text-green-500">{t("imagesSelected")}</p>
            ) : (
              <div>
                <h2 className="text-[#333C52]"> {t("attachImagesTitle")} </h2>
                <h3 className="text-gray-400">{t("attachImagesSubtitle")}</h3>
              </div>
            )}
            {errors.images && (
              <p className=" full absolute top-[-12px] end-1 px-4 text-red-500">
                {errors.images.message}
              </p>
            )}
          </div>
          <div className="w-full lg:w-[352px] relative">
            <input
              type="text"
              placeholder={t("descriptionPlaceholder")}
              className="w-full h-[70px] outline-none border border-gray-300 rounded-[14px] px-5"
              {...register("description", { required: "description_required" })}
            />
            {errors.description && (
              <p className=" full bg-white absolute top-[-12px] end-1 px-4 text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="my-10 bg-[#9F7A32] w-full lg:w-[444px] h-[54px] flex items-center justify-center cursor-pointer text-white rounded-[14px] mx-auto"
        >
          {t("submitButton")}
        </button>
        {open && (
        <CustomModal close className="!w-[100%] lg:!w-[40%] " openCloseModal={setOpen}>
          <div className="flex flex-col">
          <MyMap first setLocation={setLocation} />
             <CustomButton type="button" onClick={()=>setOpen(false)}>{locale === 'ar'? "تاكيد العنوان" :"Confirm Address"}</CustomButton>
</div>
        </CustomModal>
      )}
      </form>
    </div>
  );
};

export default ProjectImplementationForm;
