"use client";

import React, { useState } from "react";
import contactUsIcon from "@/public/images/contact-us-icon.svg";
import contactUsImg from "@/public/images/contact-uss.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendContactData } from "@/lib/serverActions";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import { useEffect } from "react"; // تأكد أنه مستورد


import PropagateLoader from "./../../../node_modules/react-spinners/esm/PropagateLoader";
import { useTranslations } from "use-intl";
import { toast } from "react-toastify";
import Container from "../shared/formcomponents/Container";
const ContactUs = ({ locale }: { locale: string }) => {
  const t = useTranslations("ContactUsSection");

  type Inputs = {
    name: string;
    mobile: number;
    email: string;
    title: string;
    message: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data form", data);
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Inputs) =>
      apiServiceCall({
        url: "contactus",
        headers: { "Accept-Language": locale },
        method: "POST",
        body: data,
      }),
    onError: (error, variables, context) => {
      console.log("errorrrr form", error);

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
    <Container>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 lg:gap-0">
        {/* القسم الأيمن (النص والصورة) */}
        <div className="text-center lg:text-right">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <Image src={contactUsIcon} alt="contactUsIcon" />
            <h2 className="font-bold text-[#9F7A32] text-[28px] lg:text-[33px]">
              {t("ContactUs_section_title")}
            </h2>
          </div>
          <h2 className="mt-4 text-[#333C52] text-[18px] lg:text-[20px]">
            {t("ContactUs_section_description")}
          </h2>
          <Image
            src={contactUsImg}
            alt="contactUsImg"
            className="mt-8 w-full lg:max-w-[500px] mx-auto lg:mx-0"
          />
        </div>

        {/* القسم الأيسر (النموذج) */}
        <form
          className="flex flex-col gap-5 w-full lg:max-w-[444px]"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {errors.name && (
            <p className="text-end mb-[-20px] text-red-500">
              {errors.name.message}
            </p>
          )}
          <input
            type="text"
            placeholder={t("name")}
            {...register("name", { required: t("name_required") })}
            className="w-full h-[55px] border border-[#ccc] rounded-[14px] px-7 outline-none"
          />
          {errors.email && (
            <p className="text-end mb-[-20px] text-red-500">
              {errors.email.message}
            </p>
          )}
          <input
            type="email"
            placeholder={t("email")}
            {...register("email", {
              required: t("email_required"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("email_invalid"),
              },
            })}
            className="w-full h-[55px] border border-[#ccc] rounded-[14px] px-7 outline-none"
          />

          {errors.mobile && (
            <p className="text-end mb-[-20px] text-red-500">
              {errors.mobile.message}
            </p>
          )}
          <input
            type="text"
            placeholder={t("phone_number")}
            {...register("mobile", {
              required: t("phone_required"),
              pattern: {
                value: /^\d{9,13}$/,
                message: t("phone_invalid"),
              },
            })}
            className="w-full h-[55px] border border-[#ccc] rounded-[14px] px-7 outline-none"
          />

          {errors.title && (
            <p className="text-end mb-[-20px] text-red-500">
              {errors.title.message}
            </p>
          )}
          <input
            type="text"
            placeholder={t("subject")}
            {...register("title", { required: t("subject_required") })}
            className="w-full h-[55px] border border-[#ccc] rounded-[14px] px-7 outline-none"
          />

          {errors.message && (
            <p className="text-end mb-[-20px] text-red-500">
              {errors.message.message}
            </p>
          )}
          <input
            type="text"
            placeholder={t("message")}
            {...register("message", { required: t("message_required") })}
            className="w-full h-[97px] border border-[#ccc] rounded-[14px] px-7 outline-none"
          />

          <button
            type="submit"
            className="bg-[#9F7A32] w-full h-[55px] text-white rounded-[14px]"
          >
            {isPending ? (
              <PropagateLoader color="#ffffff" size={10} />
            ) : (
              t("submit")
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default ContactUs;
