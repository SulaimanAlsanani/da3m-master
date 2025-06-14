"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import CustomTextAria from "@/components/shared/reusableComponents/CustomTextAria";
import CustomSelect from "@/components/shared/reusableComponents/CustomSelect";

type Inputs = {
  name: string;
  mobile: string;
  area_id: string;
  area_name: string;
  description: string;
  email: string;
  entity_name: string;
};
export type Region = {
  id: number;
  name: string;
  options: { id: number; name: string }[];
};
const GovernmentContractsForm = ({
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
  const t = useTranslations("Contract");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    control,
  } = useForm<Inputs>({
    defaultValues: {
      name: user.name || "",
      mobile: user.mobile,
      area_id: String(user.area_id) || "",
      // area_name: user.area_name ,
      description: "",
      email: "",
      entity_name: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        mobile: user.mobile || "",
        area_id: String(user.area_id) || "",
        description: "",
        email: "",
        entity_name: "",
      });
    }
  }, [reset, user]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.name.trim()) {
      data.name = user?.name;
    }

    // If user leaves mobile empty, fallback to user.mobile
    if (!data.mobile.trim()) {
      data.mobile = user?.mobile;
    }
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Inputs) =>
      apiServiceCall({
        url: "contracts/store",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    if (isPending) {
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loginLoadingToast");
    }
  }, [isPending]);

  console.log("getValues  contrat", getValues());
  console.log("error  area_id", user.area_id);
  console.log("error  area_name", user.area_name);

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-12 gap-4">
          <div className="relative w-full col-span-12 md:col-span-6 lg:col-span-4">
            <input
              type="text"
              
              className="bg-[#333C52]/[0.04] h-[55px] w-full text-[#333C52] pt-5 px-3 rounded-[14px]  focus:outline-none"
              placeholder={user?.name}
              {...register("name")}
            />
            <label className="absolute top-2 right-3 text-gray-500 text-sm">
              {t("name")}
            </label>
            {errors.name && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="relative w-full col-span-12 md:col-span-6 lg:col-span-4">
            <input
              type="text"
              
              className="bg-[#333C52]/[0.04] h-[55px] w-full rounded-[14px]  text-[#333C52] pt-5 px-3 focus:outline-none"
              placeholder={user?.mobile}
              {...register("mobile")}
            />
            <label className="absolute top-2 right-3 text-gray-500 text-sm">
              {t("mobile", { required: t("mobile") + " " + t("required") })}
            </label>
            {errors.mobile && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.mobile.message}
              </p>
            )}
          </div>
          <div className="relative w-full col-span-12 md:col-span-6 lg:col-span-4">
            {/* <input
              type="text"
              readOnly
              className="bg-[#333C52]/[0.04] rounded-[14px]  h-[55px] w-full text-[#333C52] pt-5 px-3 focus:outline-none"
              placeholder={t("city")}
              {...register("area_name")}
            />
            <label className="absolute top-2 right-3 text-gray-500 text-sm">
              {t("city")}
            </label> */}
            <CustomSelect
              control={control}
              name="area_id"
              placeholder={t("city")}
              // @ts-ignore
              options={areas}
              arrayKey="cities"
              isGroup
              groupKey="name"
            />
          </div>
        </div>

        <div className="mt-[22px] grid grid-cols-12 gap-4">
          <div className="relative w-full col-span-12 md:col-span-6 lg:col-span-4">
            <input
              type="email"
              className="h-[55px] border border-[#3C435C]/[0.14] text-[#000] rounded-[14px] outline-none px-5 pl-12 w-full"
              placeholder={t("email")}
              {...register("email", {
                required: t("email") + " " + t("required"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("invalid_email"),
                },
              })}
            />
            {errors.email && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative w-full col-span-12 md:col-span-6 lg:col-span-4">
            <input
              type="text"
              className="h-[55px] border border-[#3C435C]/[0.14] text-[#000] rounded-[14px] outline-none px-5 pl-12 w-full"
              placeholder={t("entity_name")}
              {...register("entity_name", {
                required: t("entity_name") + " " + t("required"),
              })}
            />
            {errors.entity_name && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.entity_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="relative mt-5">
          <CustomTextAria
            name="description"
            placeholder={t("description")}
            className="w-full h-[86px] outline-none border text-[#000] border-[#3C435C]/[0.14] rounded-[14px] px-5"
            register={register}
            validation={{ required: t("description") + " " + t("required") }}
          />
          {errors.description && (
            <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-10 bg-[#9F7A32] w-full lg:w-[444px] h-[54px] flex items-center justify-center cursor-pointer text-white rounded-[14px] mx-auto"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
};

export default GovernmentContractsForm;
