import React, { useRef } from "react";
import Image from "next/image";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Inputs } from "./types";
import { useTranslations } from "next-intl";
import CustomSelect from "../shared/reusableComponents/CustomSelect";
import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

export const DateSection = ({
 
 
  control,
}: {
  
  
  control: any;
 
}) => {
  const t = useTranslations("addAds");

  return (
    <div>

      <Controller    control={control}
          name="finished_at"
          render={({ field }) => (
            <Popover>
            <PopoverTrigger asChild>
              {/* <FormControl> */}
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-[55px]  text-left font-normal rounded-[12px]",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span> {t("endDateLabel")}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              {/* </FormControl> */}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() 
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          )}/>
    </div>
    // <div
    //   className="w-full px-[34px] py-[18px] h-[55px] border border-[#3C435C]/[0.14] rounded-[14px] relative flex justify-evenly items-center"
    //   onClick={() => inputRef.current?.showPicker?.()}
    // >
    //   <input
    //     type="date"
        
    //     {...register("finished_at", { required: t("errors.required") })}
    //     ref={(e) => {
    //       register("finished_at").ref(e);
    //       (inputRef as any).current = e;
    //     }}
    //     className="text-[#848484] text-[14px] font-normal  w-full h-full focus:outline-none appearance-none cursor-pointer invisible absolute inset-0"
    //   />


    //   <label
    //     htmlFor=""
    //     className="text-[#848484] text-[14px] font-normal w-full h-full flex items-center justify-between"
    //   >
    //     {watch("finished_at") !=="" ? watch("finished_at"): t("endDateLabel")}
    //   </label>
    //   <Image src="/images/calendar.svg" alt="calendar" width={20} height={20} />
    //   {error ? (
    //     <p className="absolute top-[-8px] end-4 w-fit text-red-700 bg-white px-2">
    //       {error.message}
    //     </p>
    //   ) : (
    //     <p className="absolute top-[-8px] end-4 w-fit text-red-700 bg-white px-2">
    //       *
    //     </p>
    //   )}
    // </div>
  );
};

export const SectionSelect = ({
  control,
  register,
  error,
  options,
  t,
}: {
  control: any;
  register: any;
  error?: FieldError;
  options: any[];
  t: any;
}) => {
  return (
    <div className="w-full h-full relative">
      <CustomSelect
        control={control}
        options={options}
        placeholder={t("sectionPlaceholder")}
        paddingx={"px-[34px]"}
        {...register("section_id", { required: t("errors.required") })}
      />
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
