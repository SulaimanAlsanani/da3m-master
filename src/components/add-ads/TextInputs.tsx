import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Inputs } from "./types";
import { useTranslations } from "next-intl";

export const TextInputs = ({
  register,
  errors,
  t,
}: {
  register: UseFormRegister<Inputs>;
  errors: any;
  t: any;
}) => {
  return (
    <>
      <div className="w-full relative">
        <input
          type="text"
          className="text-[#848484] text-[14px] font-normal w-full px-[34px] py-[18px] h-[55px] border border-[#3C435C]/[0.14] rounded-[14px]"
          {...register("titleAr", { required: t("errors.required") })}
          placeholder={t("titlePlaceholderAr")}
        />
        {errors.titleAr ? (
          <p className="absolute top-[-8px] end-4 w-fit text-red-700 bg-white px-2">
            {errors.titleAr.message}
          </p>
        ) : (
          <p className="absolute top-[-8px] end-4 w-fit text-red-700 bg-white px-2">
            *
          </p>
        )}
      </div>

      <div className="w-full relative">
        <input
          type="text"
          className="text-[#848484] text-[14px] font-normal w-full px-[34px] py-[18px] h-[55px] border border-[#3C435C]/[0.14] rounded-[14px]"
          {...register("titleEn")}
          placeholder={t("titlePlaceholderEn")}

         
        />
      </div>

      <div className="w-full relative">
        <textarea
         maxLength={120}
          className="text-[#848484] text-[14px] font-normal w-full px-[34px] pt-[18px] pb-[54px] border border-[#3C435C]/[0.14] rounded-[14px]"
          {...register("descriptionAr", { required: t("errors.required") })}
          placeholder={t("descPlaceholderAr")}
        />
        {errors.descriptionAr ? (
          <p className="absolute top-[-8px] end-4 w-fit text-red-700 bg-white px-2">
            {errors.descriptionAr.message}
          </p>
        ) : (
          <p className="absolute top-[-8px] end-4 w-fit text-red-700 bg-white px-2">
            *
          </p>
        )}
      </div>

      <div className="w-full relative">
        <textarea
         maxLength={100}
          className="text-[#848484] text-[14px] font-normal w-full px-[34px] pt-[18px] pb-[54px] border border-[#3C435C]/[0.14] rounded-[14px]"
          {...register("descriptionEn")}
          placeholder={t("descPlaceholderEn")}
        />
      </div>
    </>
  );
};
