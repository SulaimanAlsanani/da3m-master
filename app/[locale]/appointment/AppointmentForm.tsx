"use client";
import CustomSelect from "@/components/shared/reusableComponents/CustomSelect";
import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import CustomTextAria from "@/components/shared/reusableComponents/CustomTextAria";
type Inputs = {
  name: string;
  mobile: string;
  type: string;
  period: string;
  time: string;
  description: string;
};
type Types = {
  value: string;
  label: string;
};
const AppointmentForm = ({
  token,
  locale,
  profileData,
}: {
  token: string;
  locale: string;
  profileData: Record<string, any>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("appointment");
  const appointmentType: Types[] = [
    { value: "onsite", label: t("onsite") },
    { value: "remotely", label: t("remotely") },
  ];
  const appointmentPeriod: Types[] = [
    { value: "morning", label: t("morning") },
    { value: "evening", label: t("evening") },
  ];

  const FormSchema = z.object({
    name: z.string(),

    mobile: z.string(),

    type: z
      .string({
        required_error: t("type"),
      })
      .min(1, t("type")),

    period: z
      .string({
        required_error: t("period"),
      })
      .min(1, t("period")),

    time: z
      .string({
        required_error: t("time_required"),
      })
      ,

    description: z
      .string({
        required_error: t("description_required"),
      })
      .min(10, t("description")), // "Description must be at least 10 characters"
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<z.input<typeof FormSchema>, any, z.output<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: profileData?.name || "",
      mobile: profileData?.mobile || "",
      type: "",
      period: "",
      time: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data form", data);
    console.log("errorsddddd", errors);
    // If user leaves name empty, fallback to profileData.name
    if (!data.name.trim()) {
      data.name = profileData?.name;
    }

    // If user leaves mobile empty, fallback to profileData.mobile
    if (!data.mobile.trim()) {
      data.mobile = profileData?.mobile;
    }

    mutate(data);
  };

  console.log("data getValues", getValues());

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Inputs) =>
      apiServiceCall({
        url: "consultation/store",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: data,
      }),
    onError: (error) => {
      console.log("errorrrr consultant", (error as any)?.data?.message);

      toast.error((error as any)?.data?.message);
    },
    onSuccess: (data) => {
      console.log("data success", data);

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

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 items-center justify-between gap-4">
          <div className="relative col-span-12 md:col-span-4">
            <input
              type="text"
              className="bg-[#333C52]/[0.04] h-[55px] w-full text-[#848484] pt-5 px-6 rounded-[14px] focus:outline-none"
              placeholder={profileData?.name}
              {...register("name")} // Add validation rules here
            />
            <label className="absolute top-2 right-6 text-gray-500 text-sm">
              {t("name_label")}
            </label>
            {errors.name && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="relative col-span-12 md:col-span-4">
            <input
              type="text"
              dir="ltr"
              className=" text-start bg-[#333C52]/[0.04] h-[55px] w-full text-[#848484] pt-5 px-6 rounded-[14px] focus:outline-none"
              placeholder={profileData?.mobile}
              {...register("mobile")} // Add validation rules here)}
            />
            <label className="absolute top-2 right-6 text-gray-500 text-sm">
              {t("mobile_label")}
            </label>
            {errors.mobile && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 items-center justify-between gap-4 mt-[22px]">
          <div className="col-span-12 md:col-span-4 relative">
            <CustomSelect
              name="type"
              control={control}
              options={appointmentType}
              placeholder={t("type_placeholder")}
            />
            {errors.type && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.type.message}
              </p>
            )}
          </div>

          <div className="col-span-12 md:col-span-4 relative">
            <CustomSelect
              name="period"
              control={control}
              options={appointmentPeriod}
              placeholder={t("period_placeholder")}
            />
            {errors.period && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.period.message}
              </p>
            )}
          </div>

          <div className="relative col-span-12 md:col-span-4">
            <input
              type="time"
              step="1"
              onClick={(e) => {
                e.preventDefault();
                inputRef.current?.showPicker?.();
              }}
              className=" h-[55px] w-full border  text-[#848484] pt-5 px-6 rounded-[14px] focus:outline-none"
              {...register("time")} // Add validation rules here
              ref={inputRef}
              onChange={(e) => setValue("time", e.target.value)}
            />
            <label className="absolute top-2 right-6 text-gray-500 text-sm">
              {t("time_label")}
            </label>
            {errors.time && (
              <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
                {errors.time.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 items-center justify-between gap-4 mt-[16px] relative">
          <CustomTextAria
            name="description"
            className="!rounded-[14px] !px-5"
            placeholder={t("description_placeholder")}
            register={register}
            // className="col-span-12 h-[86px] outline-none border text-[#848484] border-[#3C435C]/[0.14] rounded-[14px] px-5"
          />
          {errors.description && (
            <p className=" col-span-12 text-end text-red-500 text-[10px] font-normal absolute top-[-14px] right-4">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* زر الإرسال */}
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

export default AppointmentForm;
