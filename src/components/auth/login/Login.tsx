"use client";
import MainLink from "@/components/shared/formcomponents/MainLink";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import { useTranslations } from "use-intl";
import Image from "next/image";


import { useForm } from "react-hook-form";
import InputComponent from "@/components/shared/reusableComponents/InputComponent";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

type InputType={
    email:string
}
const Login = ({locale}:{locale :string}) => {
const t = useTranslations("login");
  
const router = useRouter()
const { register, handleSubmit, getValues, formState:{errors} } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: async (data: any) => apiServiceCall({url:"login", body:data, method:"POST",}),
  

    onError: (error: any) => {
      if(error.status !== 302){

        toast.error(error?.data?.message)
      }
     if(error.status === 302){
      toast.success(error?.data?.message)
        router.push(`/${locale}/verifycode?email=${getValues('email')}`)
     }
    },

    onSuccess: (data, variables, context) => {
     
   console.log('data.', data)
        router.push(`/${locale}/verifycode?email=${getValues('email')}`)
      
      // toast.success(data);
    },
  });
  const onSubmit = async (data: InputType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    
    mutate(formData);
}

useEffect(()=>{

  if (isPending) {
    toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
    });
  } else {
    toast.dismiss("loginLoadingToast");
  }
},[isPending])
  return (
    <div className="flex  flex-col  items-center w-full  bg-[url(/images/loginBG.svg)] bg-cover bg-center mt-[120px] lg:mt-[151px]">
      <Image src="/images/logoLogin.png" alt="logo" width={142} height={166} className="lg:mt-[130px]" />
      <div className="text-center text-[#9F7A32] mt-[14px]">
        <h2 className=" font-bold text-[28px] "> {t("title")}</h2>
        <p className="text-[14px] w-full mx-auto mt-[14px] mb-[15px] lg:mb-[37px]">
            {t("subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-[90%] lg:w-[40%] items-center  ">
        <div className=" w-full lg:w-[452px] h-[54px]">
          <InputComponent
            type="text"
            register={register}
            name="email"
            placeholder={t("placeholder")}
            className="!w-full"
            // className="!bg-red-400"
                
          />
        </div>

        <div className=" w-full lg:w-[452px] mt-[28px]">
          <CustomButton
            bgColor={"bg-[#9F7A32]"}
            textColor="text-[#FFFFFF]"
            className="text-[14px] flex justify-center items-center gap-2 col-start-3 col-end-6"
          >
            {t("button")}
          </CustomButton>
        </div>

        <div className="text-[14px] flex flex-col justify-center items-center gap-[12px] col-start-3 col-end-6 mt-[47px]">
          <p className="text-[14px] text-[#848484]">
            {t("no_account")}
          </p>
          <div className="flex justify-center items-center gap-2 ">
            <MainLink href="/register" className="text-[16px] text-[#9F7A32] font-bold">
              {" "}
                {t("create_account")}
            </MainLink>
            <Image
              src="/images/arrow.svg"
              alt="register"
              width={20}
              height={20}
              className={`${locale === "en" ? "rotate-180" : ""}`}
            />
          </div>
        </div>

      </form>
    </div>
  );
};

export default Login;
