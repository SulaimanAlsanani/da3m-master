"use client";
import PersonalData from "@/components/register/PersonalData";
import Container from "@/components/shared/formcomponents/Container";
import MainLink from "@/components/shared/formcomponents/MainLink";
import MyMap from "@/components/shared/Map/Map";
import GoogleMapComponent from "@/components/shared/Map/Map";
import GoogleMapLoader from "@/components/shared/Map/MapLoader";

import Upload from "@/components/shared/Upload";
import apiServiceCall from "@/lib/apiServiceCall";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "use-intl";
type City = {
  value: number;
  label: string;
};

export type Region = {
  id: number;
  name: string;
  options: City[];
};
export type Category = {
  id: number;
  title: string;
  brief: string;
  image: string;
};
interface FormFields {
  name: string;
  mobile: string;
  email: string;
  type: string;
  department: string;
  area_id: string;
  brief: string;
  has_licence:string
  lat: string;
  lng: string;
  address: string;
}

function Register({areas,categories,locale}:{categories:Category[]; areas:Region, locale:string}) {
  const t = useTranslations("register");
  const [licenceFile, setLicenceFile ] = useState<File|null>(null)
  const [isLoading , setIsLoading] = useState(false)
  const [profileImg, setProileImg ] = useState<File|null>(null)
  const [id_image, setIdImage ] = useState<File|null>(null)
  console.log(profileImg)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    getValues,
    control,
  } = useForm<FormFields>({
     defaultValues : {
      name: '',
      mobile: '',
      email:'',
      type: '',
      department: '',
      area_id: '',
      brief: '',
      has_licence:"0"
    }
    
  });

  const [location, setLocation] = useState<{
    lat: null | number;
    lng: null | number;
    name: string;
  }>({ lat: 24.628053928453202, lng: 46.681521298473854 , name: ''});


  useEffect(()=>{
    console.log('location', location)
    reset({...getValues() ,lat: location.lat, lng: location.lng, address: location.name})
     
  },[location])
  const handleLocation = (lat: string, long: string) => {
    setLocation({ lat: lat, lng: long });
    console.log(lat, long); 
  };
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
const router  = useRouter()

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: async (data: any) => apiServiceCall({url:"signup", body:data, method:"POST", headers:{
      "Content-Type": "multipart/form-data",
    }}),
  

    onError: (error: any) => {
      
     if(error.status === 302){
        router.push(`/${locale}/verifycode?email=${getValues('email')}`)
     }
     if(error.status === 422){
       toast.error(error.data.message)
     }
    },

    onSuccess: (data, variables, context) => {
     
   console.log('data.', data)
        router.push(`/${locale}/verifycode?emial=${getValues('email')}`)
      
      // toast.success(data);
    },
  });
const onSubmit = (data:any)=>{
console.log(data)
// const formData = new FormData();
const form = new FormData();
form.append('name', data.name);
form.append('mobile', data.mobile);
form.append('email', data.email);
form.append('type', data.type);
// if(data.department === "other"){
//   form.append('category_id', data.other_cat);
// }else{

  form.append('category_id', data.department);
// }
form.append('area_id',data.area_id);
form.append('brief', data.brief);
form.append('has_licence', data.has_licence);
form.append('location[lat]',String(location.lat));
form.append('location[lng]',String(location.lng));
form.append('location[text]',data.address);
form.append('brief', data.brief);
form.append('has_licence', data.has_licence);

if(profileImg) {
  form.append('image', profileImg);}
if(id_image) {
  form.append('id_image', id_image);}
if( getValues('has_licence') === "1"  && licenceFile) {
  form.append('licence', licenceFile);
}
mutate(form)

}


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
    <div className="my-[80px] md:my-[150px]    bg-[#FFFFFF] px-4   lg:px-[200px]">
      <Container className="flex flex-col gap-4  !w-full justify-center items-center ">
        <div className="text-center mt-4 space-y-[15px] text-[#9F7A32] font-bold">
          <h2 className="text-[28px]   "> {t("title")}</h2>
          <h4 className="text-[14px]  font-normal  "> {t("subtitle")}</h4>
        </div>

      <div className="flex flex-col lg:flex-row items-start gap-4 w-full  ">
      <div className=" flex gap-4  items-center justify-start mt-[48px] ">
        <Upload  setFile={setProileImg}  />
          <div className="flex flex-col gap-2">
            <p className=" text-[14px] text-[#333C52]">
              {" "}
              {t("upload_personal_photo")}
            </p>
            <p className=" text-[12px] text-[#848484]">
              {t("upload_personal_photo_description")}
            </p>
          </div>
        </div>
        <div className=" flex  gap-4 items-center justify-start  lg:mt-[48px]  ">
        <Upload  setFile={setIdImage} />
          <div className="flex flex-col gap-2">
            <p className=" text-[14px] text-[#333C52]">
              {" "}
              {t("upload_personal_Id")}
            </p>
            <p className=" text-[12px] text-[#848484]">
              {t("upload_Id_photo_description")}
            </p>
          </div>
        </div>
      </div>

          <PersonalData setLocation={setLocation} errors={errors} watch={watch} setFile={setLicenceFile} categories={categories} areas={areas} onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} control={control} />
       
      {/* <div className="flex"> */}
  
      {/* </div> */}

       
        <div className="text-[14px] flex flex-col justify-center items-center gap-2 col-start-3 col-end-6">
          <p className="text-[14px] text-[#848484]">
            {t("already_have_account")}
          </p>
          <div className="flex justify-center items-center gap-2">
            <MainLink  href={`/login`} className="text-[16px] text-[#9F7A32] font-bold">
              {" "}
              {t("login")}
            </MainLink>
            <Image
              src="/images/arrow.svg"
              alt="register"
              width={20}
              height={20}
              className={`${lang === "en" ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        
      </Container>
    </div>
  );
}

export default Register;
