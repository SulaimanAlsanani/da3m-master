"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "react-toastify";

import apiServiceCall from "@/lib/apiServiceCall";
import MainLink from "@/components/shared/formcomponents/MainLink";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Page = () => {
  const searchParams = useSearchParams();
  const t = useTranslations("verify");
  const [value, setValue] = useState("");
const locale = useLocale()
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) =>
      apiServiceCall({
        url: "activate",
        body: data,
        method: "POST",
       headers: {
          "Aceept-Language" : locale
        },
      }),
    onError: (error: any) => {
      if (error.status === 302) {
        toast.success(error?.data?.message);
      } else {
        toast.error(error?.data?.message || "An error occurred");
      }
    },
    onSuccess: async (data) => {
      await fetch("/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({ token: data?.data?.data?.access_token }),
        headers: { "Content-Type": "application/json" },
      });
      window.location.href = "/";
    },
  });
  const formDataa = new FormData();
      if (searchParams.has("email")) {
        formDataa.append("email", String(searchParams.get("email")));
      }
  const { mutate: resendCode, isPending: resendPending } = useMutation({
    mutationFn: async (data: FormData) =>
      apiServiceCall({
        url: "resend_code",
        body: data,
        method: "POST",
        headers: {
          "Aceept-Language" : locale
        },
      }),
    onError: (error: any) => {
      toast.error(error?.data?.message || "An error occurred");
    },
    onSuccess: () => {
      toast.success(locale === "en"? "Code resent successfully": "تم ارسال الكود بنجاح");
    },
  });

  useEffect(() => {
    if (value?.length === 6) {
      const formData = new FormData();
      if (searchParams.has("email")) {
        formData.append("email", String(searchParams.get("email")));
      }
      formData.append("code", value);
      mutate(formData);
    }
  }, [value, mutate, searchParams]);

  useEffect(() => {
    if (isPending) {
      toast.loading("Loading...", {
        toastId: "verifyLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("verifyLoadingToast");
    }
  }, [isPending]);

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-[url(/images/loginBG.svg)] bg-cover bg-center mt-[30px] lg:mt-[130px]">
      <Image src="/images/verifyCode.svg" alt="logo" width={112} height={58} />
      <div className="text-center text-[#9F7A32] mt-[36px]">
        <h2 className="font-bukraBold text-[28px]">{t("title")}</h2>
        <p className="text-[14px] font-bukraRegular w-[70%] lg:w-full mx-auto mt-[14px]">
          {t("subtitle")}
        </p>
        <p className="text-[19px] font-bukraRegular text-[#2EA044] mt-[15px]" dir="ltr">
          {searchParams?.get("email")}
        </p>
      </div>

      <form className="flex flex-col justify-center w-[95%] lg:w-[444px] mx-auto mt-[36px]">
        <div dir="ltr" className="space-y-2">
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup className="w-[90%] lg:w-[444px] mx-auto">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="mt-[28px]">
          <CustomButton
            bgColor="bg-[#9F7A32]"
            type="button"
            disabeld={isPending}
            textColor="text-[#FFFFFF]"
            className={`text-[14px] flex justify-center items-center gap-2 col-start-3 col-end-6 ${isPending ? "opacity-35" : ""}`}
          >
            {t("button")}
          </CustomButton>
        </div>

        <div className="text-[14px] flex flex-col justify-center items-center gap-[12px] col-start-3 col-end-6 mt-[47px]">
          <p className="text-[#848484] font-bukraRegular">{t("notReceived")}</p>
          
            <button type="button" onClick={()=>resendCode(formDataa)}  className="text-[16px] text-[#9F7A32] font-bukraBold">
            {t("resend")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
