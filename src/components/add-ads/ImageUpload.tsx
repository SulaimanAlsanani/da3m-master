import React from "react";
import Image from "next/image";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Inputs } from "./types";
import { useTranslations } from "next-intl";

export const ImageUpload = ({
  register,
  error,
  watch,
  t,
}: {
  register: UseFormRegister<Inputs>;
  error?: FieldError;
  watch: any;
  t: any;
}) => {
  return (
    <div className="w-full flex justify-center items-center relative px-4 py-4 rounded-[14px] border border-[#3C435C]/[0.14] text-[#848484] text-[14px] font-normal">
      <label
        htmlFor="imageUpload"
        className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-center"
      >
        {watch("image")?.[0] ? (
          <>
            <Image
              src={URL.createObjectURL(watch("image")[0])}
              alt="project-upload"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
            <p className="my-1 text-[#333C52] text-[14px] font-normal">
              {t("uploadAnotherFile")}
            </p>
          </>
        ) : (
          <>
            <Image
              src="/images/img.svg"
              alt="project-upload"
              width={50}
              height={50}
            />
            <p className="mt-4 mb-2 text-[#333C52] text-[14px] font-normal">
              {t("uploadImageTitle")}
            </p>
            <p className="text-[#848484] text-[12px] font-normal">
              {t("uploadImageDescription")}
            </p>
          </>
        )}
        <input
          id="imageUpload"
          type="file"
          className="hidden w-full h-full"
          accept="image/*"
          {...register("image", {
            required: "Image Cover required",
            validate: {
              isImage: (fileList) => {
                const file = fileList?.[0];
                if (!file) return "Image is required";
                return (
                  file.type.startsWith("image/") ||
                  "Only image files are allowed"
                );
              },
            },
          })}
        />
      </label>
      {error ? (
        <p className="absolute top-[-8px] end-4 w-fit text-red-700 bg-white px-2">
          {error.message}
        </p>
      ) : (
        <p className="absolute top-[-8px] end-4 w-fit text-red-700 bg-white px-2">
          *
        </p>
      )}
    </div>
  );
};
