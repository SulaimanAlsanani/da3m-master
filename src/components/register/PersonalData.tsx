import React from "react";
import InputComponent from "../shared/reusableComponents/InputComponent";
import CustomSelect from "../shared/reusableComponents/CustomSelect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import CustomCheckBox from "../shared/reusableComponents/CustomCheckBox";
import { useLocale, useTranslations } from "use-intl";
import CustomButton from "../shared/reusableComponents/CustomButton";
import { Category, Region } from "../auth/register/Register";
import { Controller } from "react-hook-form";
import Upload from "../shared/Upload";
import MyMap from "../shared/Map/Map";
import CustomModal from "../shared/reusableComponents/CustomModal";

type Props = {
  register: any;
  control?: any;
  onSubmit: (data: any) => void;
  handleSubmit: any;
  areas: Region[];
  categories: Category;
  errors?: any;
  watch: any;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number | null;
      lng: number | null;
      name: string;
    }>
  >;
};
function PersonalData({
  handleSubmit,
  watch,
  setFile,
  categories,
  areas,
  errors,
  setLocation,
  onSubmit,
  register,
  control,
}: Props) {
  const t = useTranslations("register");
  const [open, setOpen] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const locale = useLocale()
  // Define Types type
  type Types = {
    value: string;
    label: string;
  };

  const options2: Types[] = [
    { value: "client", label: t("client") },
    { value: "store", label: t("store") },
  ];
  const options3: Types[] = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "female" },
  ];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12  gap-4 mt-5  w-full"
    >
      {open && (
        <CustomModal close className="!w-[100%] lg:!w-[40%] " openCloseModal={setOpen}>
        <div className="flex flex-col">
            <MyMap first   
   setLocation={setLocation} />
   <CustomButton type="button" onClick={()=>setOpen(false)}>{locale === 'ar'? "تاكيد العنوان" :"Confirm Address"}</CustomButton>
        </div>

 
        </CustomModal>
      )}
      <div className="flex flex-col gap-2 col-span-12 lg:col-span-4">
        <InputComponent
          validation={{ required: t("required") }}
          placeholder={t("username")}
          name="name"
          register={register}
          type="text"
          className="col-span-12 lg:col-span-4 "
        />
        <p className="text-red-500">{errors?.name?.message}</p>
      </div>

      <div className="flex flex-col gap-2 col-span-12 lg:col-span-4">
        <InputComponent
          validation={{ required: t("required") }}
          placeholder={t("phone")}
          name="mobile"
          register={register}
          type="number"
          className="col-span-12 lg:col-span-4"
        />
        <p className="text-red-500">{errors?.mobile?.message}</p>
      </div>

      <div className="flex flex-col gap-2 col-span-12 lg:col-span-4">
        <InputComponent
          placeholder={t("email")}
          name="email"
          register={register}
          validation={{ required: t("required") }}
          type="email"
          className="col-span-12 lg:col-span-4"
        />
        <p className="text-red-500">{errors?.email?.message}</p>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <CustomSelect
          control={control}
          name="area_id"
          required
          placeholder={t("city")}
          options={areas}
          arrayKey="cities"
          isGroup
          groupKey="name"
        />
        <p className="text-red-500">{errors?.area_id?.message}</p>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <CustomSelect
          control={control}
          options={options2}
          required
          name="type"
          placeholder={t("account_type")}
        />
        <p className="text-red-500">{errors?.type?.message}</p>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <CustomSelect
          control={control}
          options={[
            ...categories?.map((cat: Category) => {
              return { value: cat.id, label: cat.title };
            }),
          ]}
          required
          name="department"
          placeholder={t("department")}
        />
        <p className="text-red-500">{errors?.department?.message}</p>
      </div>

      {watch("type") === "store" && (
        <div className="col-span-6 md:col-span-4 text-[#848484]">
          <p className="text-[14px] font-bold">{t("has_license")}</p>
          <p className="text-[14px] ">
            {t("upload_personal_photo_description")}
          </p>
          <Controller
            name="has_licence"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-[40px] mt-[15px]"
              >
                <div className="flex gap-2 items-center space-x-2">
                  <RadioGroupItem value="1" id="option-one" />
                  <label htmlFor="option-one">{t("yes")}</label>
                </div>
                <div className="flex gap-2 items-center space-x-2">
                  <RadioGroupItem value="0" id="option-two" />
                  <label htmlFor="option-two">{t("no")}</label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      )}
      {watch("has_licence") === "1" && (
        <div className=" col-span-6 md:col-span-4  flex items-center gap-[10px]">
          <Upload setFile={setFile} />
          <div className="flex flex-col gap-2">
            <p className=" text-[14px] text-[#333C52]">
              {t("upload_licence_title")}
            </p>
            <p className=" text-[12px] text-[#848484]">
              {t("upload_licence_description")}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 col-span-12 lg:col-span-4">
        <InputComponent
          placeholder={t("tools")}
          name="brief"
          register={register}
          type="text"
          className="col-span-12 lg:col-span-4 "
        />
        <p className="text-red-500">{errors?.brief?.message}</p>
      </div>

      <div className="flex flex-col gap-2 col-span-12 lg:col-span-4 relative cursor-pointer">
        <div
          onClick={() => setOpen(true)}
          className="  z-[99] absolute w-full h-full top-0 start-0"
        ></div>
        <InputComponent
          placeholder={t("address")}
          name="address"
          disabled
          childClassName="cursor-pointer"
          register={register}
          validation={{ required: t("required") }}
          type="text"
          className="col-span-12 lg:col-span-4 !cursor-pointer "
        />
        <p className="text-red-500">{errors?.address?.message}</p>
      </div>
      {/* <InputComponent
        placeholder={t("lat")}
        name="lng"
        register={register}
        
        //  validation={{ required: 'FJDKLKSLJFLKDSJFLDJFKL' }}
        type="text"
        className="col-span-12 lg:col-span-4 "
      />
      <InputComponent
        placeholder={t("lng")}
        name="lat"
        register={register}
        type="text"
        className="col-span-12 lg:col-span-4 "
      /> */}
      <div className="mt-5 flex items-center justify-center  col-span-12 ">
        <CustomCheckBox value={agree} onChange={setAgree} />
        <p className="text-[12px] txet-[#848484]">
          {t("agree_term1")}
          <span className="text-[#5BB98D] text-[14px]">
            {" "}
            {t("agree_term2")}
          </span>
        </p>
      </div>

      <div className="  flex justify-center col-span-12 m-auto  !w-full">
        <CustomButton
          disabeld={!agree}
          bgColor={"bg-[#9F7A32]"}
          textColor="text-[#FFFFFF]"
          className={`text-[14px]  !w-[444px] h-[54px] mb-[60px] ${
            !agree ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
        {t("create_account")}
        </CustomButton>
      </div>
    </form>
  );
}

export default PersonalData;
