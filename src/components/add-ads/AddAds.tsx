"use client";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAddAdsMutation } from "./useAddAdsMutation";
import { useAddAdsQuery } from "./useAddAdsQuery";
import { useAddAdsForm } from "./useAddAdsForm";
import { Inputs, AddAdsProps, ArabicMonths } from "./types";
import { ImageUpload } from "./ImageUpload";
import { FileUpload } from "./FileUpload";
import { TextInputs } from "./TextInputs";
import { DateSection, SectionSelect } from "./DateSection";
import { ToggleSection } from "./ToggleSection";
import CustomSelect from "../shared/reusableComponents/CustomSelect";
import { Category } from "../auth/register/Register";
import { Calendar } from "../ui/calendar";
import { formatDateToYMD } from "@/lib/utils";

const AddAds = ({ token, locale, section,categories }: AddAdsProps) => {
  const t = useTranslations("addAds");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // State
  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(true);
  const [singleAds, setSingleAds] = useState<null | Record<string, any>>(null);
  const [user, setUser] = useState<null | {}>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useAddAdsForm();

  // API Calls
  const { mutate, isPending } = useAddAdsMutation(locale, token, () => {
    reset({
      section_id: "",
      titleAr: "",
      titleEn: "",
      descriptionAr: "",
      descriptionEn: "",
      finished_at: "",
      locally: 0,
      file: undefined,
      image: undefined,
    });
  });

  const { data } = useAddAdsQuery(id, locale, token);

  // Handlers
  const handleToggle = () => {
    const isNowChecked = !checked;
    setChecked(isNowChecked);
  };

  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const form = new FormData();
    form.append("title[ar]", data.titleAr);
    form.append("description[ar]", data.descriptionAr);

    if (data.titleEn) form.append("title[en]", data.titleEn);


    if (data.descriptionEn) form.append("description[en]", data.descriptionEn);
//@ts-ignore
    form.append("finished_at", formatDateToYMD(data.finished_at));
    form.append("locally", checked ? "1" : "0");

    if (data.file && data.file[0]) form.append("file", data.file[0]);
    if (data.image && data.image[0]) form.append("image", data.image[0]);

    // form.append("section_id", data.section_id);
    //@ts-ignore
    form.append("category_id", data.cat_id);
    mutate(form);
  };

  // Effects
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

  useEffect(() => {
    const item = data?.data?.data?.item;
    if (item) {
      setSingleAds(item);
      setUser(item.user || null);
    }
  }, [id, data]);

  useEffect(() => {
    if (user) {
      const returnedDate = singleAds?.finished_at;
      let formattedDate;

      if (locale === "ar") {
        const arabicMonths: ArabicMonths = {
          يناير: "01",
          فبراير: "02",
          مارس: "03",
          أبريل: "04",
          ابريل: "04",
          مايو: "05",
          يونيو: "06",
          يوليو: "07",
          أغسطس: "08",
          اغسطس: "08",
          سبتمبر: "09",
          أكتوبر: "10",
          اكتوبر: "10",
          نوفمبر: "11",
          ديسمبر: "12",
        };

        const [year, monthName, day] = returnedDate?.split(" ");
        const month = arabicMonths[monthName.trim()] || "01";
        formattedDate = `${year}-${month}-${day.padStart(2, "0")}`;
      } else {
        const parsedDate = new Date(returnedDate);
        formattedDate = parsedDate.toISOString().split("T")[0];
      }

      reset({
        titleAr: singleAds?.title_data?.["ar"],
        titleEn: singleAds?.title_data?.["en"],
        descriptionAr: singleAds?.description_data?.["ar"],
        descriptionEn: singleAds?.description_data?.["en"],
        finished_at: formattedDate,
        locally: singleAds?.locally ? 1 : 0,
        section_id: singleAds?.section_id,
      });
    }
  }, [reset, user, singleAds, locale]);

  const sectionOptions = section.map((sec: any) => ({
    value: String(sec.id),
    label: sec.title,
  }));

 
  return (
    <div className="mt-[36px]">
      <form
        className="grid grid-cols-12 gap-[25px]"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col gap-4">
          <ImageUpload
            register={register}
            error={errors.image}
            watch={watch}
            t={t}
          />
          <FileUpload
            register={register}
            error={errors.file}
            watch={watch}
            t={t}
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-9 flex flex-col gap-[10px]">
          <TextInputs register={register} errors={errors} t={t} />
          {/* <Calendar
          control
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  /> */}
          <DateSection
          control={control}
          />
          {/* <SectionSelect
            control={control}
            register={register}
            error={errors.section_id}
            options={sectionOptions}
            t={t}
          /> */}
          {/* <CustomSelect
                    control={control}
                    options={ 
                     [...categories?.map((cat:Category) => {
                        return {value:cat.id, label:cat.title}
                       })]
                    }
                    paddingx="px-8"
                    name="cat_id"
                    placeholder={locale === "ar" ? "اختر الفئة":"Choose you category"}
                  /> */}
          <ToggleSection checked={checked} handleToggle={handleToggle} t={t} />

          <button
          disabled={isPending}
            type="submit"
            className={`text-[14px] font-normal text-white w-full ${isPending ? "cursor-not-allowed opacity-50":""} bg-[#9F7A32] rounded-[14px] py-[18px] text-center mt-[45px]`}
          >
            {t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAds;
