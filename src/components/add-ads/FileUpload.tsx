import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Inputs } from "./types";
import { useTranslations } from "next-intl";

export const FileUpload = ({
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
  const [fileUrl, setFileUrl] = useState("");
  const file = watch("file")?.[0];

  useEffect(() => {
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setFileUrl(newUrl);
      return () => URL.revokeObjectURL(newUrl);
    }
  }, [file]);

  return (
    <div className="w-full flex justify-center items-center relative px-4 py-4 rounded-[14px] border border-[#3C435C]/[0.14] text-[#848484] text-[14px] font-normal">
      <label
        htmlFor="fileUpload"
        className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-center"
      >
        {file ? (
          <>
            <video width="320" height="240" controls key={fileUrl}>
              <source src={fileUrl} type={file.type} />
              Your browser does not support the video tag.
            </video>
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
              {t("uploadVideoTitle")}
            </p>
            <p className="text-[#848484] text-[12px] font-normal">
              {t("uploadVideoDescription")}
            </p>
          </>
        )}
        <input
          type="file"
          id="fileUpload"
          accept="audio/*,video/*"
          className="hidden w-full h-full"
          {...register("file", {
            required: "Media file is required",
            validate: {
              isAudioOrVideo: (fileList) => {
                const file = fileList?.[0];
                if (!file) return "Media file is required";
                const isAudio = file.type.startsWith("audio/");
                const isVideo = file.type.startsWith("video/");
                return (
                  isAudio || isVideo || "Only audio or video files are allowed"
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
