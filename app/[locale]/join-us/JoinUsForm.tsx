"use client";
import Container from "@/components/shared/formcomponents/Container";
import CustomSelect from "@/components/shared/reusableComponents/CustomSelect";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import { toast } from "react-toastify";
import { useTranslations } from "use-intl";
import { useEffect } from "react";

interface FormFields {
  name: string;
  mobile: string;
  area_id: string;
  cv: FileList;
}
type City = {
  value: number;
  label: string;
};

type Region = {
  id: number;
  name: string;
  options: City[];
};
const JoinUsForm = ({
  areas,
  locale,
  token,
}: {
  areas: Region[];
  locale: string;
  token: string;
}) => {
  const t = useTranslations("employment");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      area_id: "",

      name: "",
      mobile: "",
    },
  });

  console.log("data getValues", getValues());

  const onSubmit = (data: FormFields) => {
    console.log(" datsdvf bda", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("mobile", data.mobile);
    formData.append("area_id", data.area_id);

    const cvFile = getValues("cv")?.[0]; // FileList

    formData.append("cv", cvFile);

    mutate(formData); // Send FormData instead of raw object
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) =>
      apiServiceCall({
        url: "join_us",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: data,
      }),
    onError: (error) => {
      console.log("errorrrr join us form", (error as any)?.data?.message);

      toast.error((error as any)?.data?.message);
    },
    onSuccess: (data) => {
      console.log("data success", data);

      toast.success(data?.data?.message);
      reset({
        area_id: "",
        name: "",
        mobile: "",
        cv: null,
      });
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
      <h2 className="text-[#333C52] font-bold">{t("title")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-12 w-full mt-5 gap-x-4 gap-y-6">
          <div className="relative col-span-12   md:col-span-4 px-5 rounded-[8px] border border-gray-300 outline-none h-[55px] flex justify-start items-center">
            <input
              type="text"
              placeholder={t("name")}
              {...register("name", {
                required: t("required"),
              })}
              className="outline-none bg-transparent"
            />
            {errors.name && (
              <p className="text-red-500 absolute top-[-20px] start-2 bg-white px-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="relative col-span-12   md:col-span-4 px-5 rounded-[8px] border border-gray-300 outline-none h-[55px] flex justify-start items-center">
            <input
              type="text"
              placeholder={t("mobile")}
              {...register("mobile", {
                required: t("required"),
                pattern: {
                  value: /^\+?[0-9\s\-().]{7,20}$/,
                  message: t("mobile"),
                },
              })}
              className="outline-none bg-transparent"
            />
            {errors.mobile && (
              <p className="text-red-500 absolute top-[-20px] start-2 bg-white px-2">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div className="col-span-12  md:col-span-4 relative">
            <CustomSelect
              control={control}
              // name="area_id"
              placeholder={t("city")}
              //@ts-ignore
              options={areas}
              arrayKey="cities"
              isGroup
              groupKey="name"
              {...register("area_id", {
                required: t("required"),
              })}
            />
            {errors.area_id && (
              <p className="text-red-500 absolute top-[-20px] start-2 bg-white px-2">
                {errors.area_id.message}
              </p>
            )}
          </div>

          <div className="col-span-12  md:col-span-4 flex items-center gap-4 relative">
            <label
              htmlFor="fileUpload"
              className={`w-[76px] h-[70px] border ${
                watch("cv")?.item(0)?.name
                  ? "border-emerald-600"
                  : "border-gray-300"
              }  rounded-[14px] flex items-center justify-center cursor-pointer`}
            >
              <Image
                src="/images/pdf.svg"
                alt="project-upload"
                width={20}
                height={20}
              />
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".pdf"
              className="hidden"
              {...register("cv", {
                required: t("required"),
                validate: {
                  fileType: (file) => {
                    // Check MIME type
                    if (file && file[0].type !== "application/pdf") {
                      return t("invalid_file_type");
                    }
                    return true;
                  },
                  fileExtension: (file) => {
                    // Check file extension
                    if (file && !/\.pdf$/i.test(file[0].name)) {
                      return t("invalid_file_type");
                    }
                    return true;
                  },
                },
              })}
            />
            {errors.cv && (
              <p className="text-red-500 absolute top-[-20px] start-2 bg-white px-2">
                {errors.cv.message}
              </p>
            )}
            {watch("cv") ? (
              <p className="text-gray-500 text-sm">
                {watch("cv")?.item(0)?.name}
              </p>
            ) : (
              <div>
                <h2 className="text-[#333C52]"> {t("upload_cv")} </h2>
                <h3 className="text-gray-400"> {t("upload_hint")} </h3>
              </div>
            )}
          </div>
          <button
            type="submit"
            className=" bg-[#9F7A32] col-span-12   md:col-span-4 h-[54px] flex items-center justify-center cursor-pointer text-white rounded-[14px] "
          >
            {t("submit")}
          </button>
        </div>
        <div className="mt-5 flex flex-col lg:flex-row items-center gap-4"></div>
      </form>
    </Container>
  );
};

export default JoinUsForm;
