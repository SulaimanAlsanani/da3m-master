'use client'
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

type SelectTypes = {
  
  value: string;
  label: string;
};

type groupOptions ={
  id: string;
  name: string;
  options:SelectTypes[]
}

export default function CustomSelect({
  control,
  placeholder,
  required,
  label,
  options,
  name,
  isGroup,
  groupKey,
  arrayKey,
  paddingx,
}: {
  control?: any;
  label?: string;
  required?: boolean;
  name?:string;
  placeholder?: string;
  options: SelectTypes[] | groupOptions[];
  isGroup?:boolean,
  groupKey?:string
  arrayKey?:string
  paddingx?:string
  
}) {
   const t = useTranslations("register");
  return (
    <Controller
    name={name || ""}
    
      control={control}
      rules={required ? { required: t('required') } :{}} 
      render={({ field }) => (
        <Select
          onValueChange={(value) => field.onChange(value)} 
          value={field.value} 
          
        >
          {label && <label className="flex mb-2">{label}</label>}
          <SelectTrigger className={`w-full py-[26px] ${paddingx?paddingx:""}`}>
            <SelectValue placeholder={placeholder || "Select..."} />
          </SelectTrigger>
          <SelectContent className="!z-[99999999]">
            {!isGroup ? (
               <SelectGroup>
               {(options as SelectTypes[])?.map((option: SelectTypes) => (
                 <SelectItem key={option.value} value={String(option.value)}>
                   {option.label}
                 </SelectItem>
               ))}
             </SelectGroup>
            ): (<>
               {(options as groupOptions[])?.map((option:groupOptions) => (
            <div key={option.id} className="flex flex-col gap-2 ">
              {/* @ts-ignore */}
              <label htmlFor="" className="ms-3">{option[groupKey]}</label>
              <SelectGroup>
              {(option?.[arrayKey] as {id:string, name:string}[])?.map((option: {id:string, name:string}) => (
                 <SelectItem key={option.id} value={String(option.id)}>
                   {option.name}
                 </SelectItem>
               ))}
             </SelectGroup>

            </div>
               ))}
            
            </>)}
           
          </SelectContent>
        </Select>
      )}
    />
  );
}
