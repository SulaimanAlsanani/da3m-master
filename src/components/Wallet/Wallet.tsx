"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import { toast } from "react-toastify";
import Loading from "../../../app/loading";
import ModalPayment from "./ModalPayment";
import { useTranslations } from "next-intl";
import CustomButton from "../shared/reusableComponents/CustomButton";
import { useRouter } from "next/navigation";
import CustomModal from "../shared/reusableComponents/CustomModal";
import InputComponent from "../shared/reusableComponents/InputComponent";
import { useForm } from "react-hook-form";
const Wallet = ({token,locale}:{token:string,locale:string}) => {

  const router = useRouter()
    const t = useTranslations("wallet");
    console.log("token..........",token);
    const {register, handleSubmit} = useForm({defaultValues:{
      amount:''
    }})
      const [open, setOpen] = useState(false);
      const {data,isLoading} = useQuery({
        queryKey:['wallets'],
        queryFn: async () => apiServiceCall({url:`wallets`,  headers:{
            
                "Accept-Language": locale,
                Authorization: `Bearer ${token}`,
              
        }})
    })
console.log("data wallet",data?.data?.data?.balance);
      const {data:banckAccount,isLoading:isLoadingBanck} = useQuery({
        queryKey:['bank_accounts'],
        queryFn: async () => apiServiceCall({url:`bank_accounts`,  headers:{
            
                "Accept-Language": locale,
                Authorization: `Bearer ${token}`,
              
        }})
    })

    const { mutate, isPending } = useMutation({

    mutationFn: (data:any) =>
      apiServiceCall({
        url: `wallets`,
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: data,
      }),
    onError: (error) => {
      // console.log("errorrrr consultant", (error as any)?.data?.message);

      toast.error((error as any)?.data?.message);
    },
    onSuccess: (data) => {
      console.log("data success", data);

      toast.success(data?.data?.message);
      router.push(data?.data?.data?.charge_link);
      // reset();
    },
  });
const handleClick = (id:string)=>{
    const findedBank = banckAccount?.data?.data?.banks?.find((bank:any) => bank.id === id);
    navigator.clipboard.writeText(findedBank.iban).then(() => {
        toast.success("IBAN copied to clipboard");
    }).catch(() => {
        toast.error("Failed to copy IBAN to clipboard");
    })
}

console.log("data banckAccount",banckAccount?.data);
    if(isLoading || isLoadingBanck) return <Loading/>
    const onSubmit =(data:any)=>{
        mutate({amount:data?.amount})
    }
  return (
    <>
   {open &&<CustomModal openCloseModal={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)} action="" className="flex text-center flex-col gap-4 py-5">
                <p>{locale ==="ar"?"شحن المحفظة":"Charge Wallet"}</p>

        <InputComponent type="number" name="amount"  placeholder={locale ==="ar"?" ادخل المبلغ":"Enter the  Amount"} register={register} />
        <CustomButton disabeld={isPending} className={isPending ? "opacity-50":""} >{locale ==="ar"?"شحن المحفظة":"Charge Wallet"}</CustomButton>

      </form>
    </CustomModal> } 
    <div className="   lg:mt-[100px] grid grid-cols-2 gap-4 items-center ">
      <div className="col-span-2 lg:col-span-1 flex flex-col items-start gap-3 w-full">
        <div className="flex justify-start gap-3 w-full">
        <svg id="vuesax_broken_wallet" data-name="vuesax/broken/wallet" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
  <g id="wallet">
    <path id="Vector" d="M11.55.777l-.045.1L7.155,10.977H2.88A7.372,7.372,0,0,0,0,11.562l2.625-6.27.06-.15L2.79,4.9A1.3,1.3,0,0,1,2.9,4.647C4.86.1,7.08-.933,11.55.777Z" transform="translate(7.8 3.003)" fill="none" stroke="#c9b58e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <path id="Vector-2" data-name="Vector" d="M12.48,10.5a7.14,7.14,0,0,0-2.115-.3H0L4.35.1,4.395,0c.225.075.435.18.66.27l3.315,1.4a9.745,9.745,0,0,1,3.915,2.52,3.173,3.173,0,0,1,.375.54,2.282,2.282,0,0,1,.3.645,2.422,2.422,0,0,1,.135.39C13.5,7.02,13.26,8.565,12.48,10.5Z" transform="translate(14.955 3.78)" fill="none" stroke="#c9b58e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <path id="Vector-3" data-name="Vector" d="M14.625,19.02H8.775a8.278,8.278,0,0,1-1.065-.075Q.555,18.473.075,11.31A8.278,8.278,0,0,1,0,10.245V7.32A7.34,7.34,0,0,1,4.44.585,7.428,7.428,0,0,1,7.32,0H21.96a7.507,7.507,0,0,1,2.115.3,7.318,7.318,0,0,1,5.19,7V10.23c0,.3-.015.6-.03.9-.285,5.25-3.21,7.89-8.76,7.89" transform="translate(3.375 13.98)" fill="none" stroke="#c9b58e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <path id="Vector-4" data-name="Vector" d="M7.065,0,4.44,6.27A7.34,7.34,0,0,0,0,13.005V8.61A8.773,8.773,0,0,1,7.065,0Z" transform="translate(3.36 8.295)" fill="none" stroke="#c9b58e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <path id="Vector-5" data-name="Vector" d="M5.19,7.755V12.15A7.318,7.318,0,0,0,0,5.145,7.345,7.345,0,0,0,.63.39,1.713,1.713,0,0,0,.495,0,8.734,8.734,0,0,1,5.19,7.755Z" transform="translate(27.45 9.15)" fill="none" stroke="#c9b58e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <path id="Vector-6" data-name="Vector" d="M0,0H36V36H0Z" fill="none" opacity="0"/>
  </g>
</svg>


          <p className="text-[#9F7A32] text-[22px] font-bold">
          {t("title")}
          </p>
        </div>
        <p className="text-[#9F7A32] text-[14px] font-normal">
        {t("description")}
        </p>
      </div>
   
    </div>
    <div className="w-full flex flex-wrap items-center justify-center gap-10 lg:gap-[191px]">

<div className="flex flex-col items-center justify-center gap-4">
<svg xmlns="http://www.w3.org/2000/svg" width="135.401" height="121.4" viewBox="0 0 135.401 121.4">
  <g id="Group_183129" data-name="Group 183129" transform="translate(-625 -310)">
    <g id="vuesax_broken_wallet" data-name="vuesax/broken/wallet" transform="translate(625 310)">
      <g id="wallet">
        <path id="Vector" d="M37.217,2.5l-.145.338L23.055,35.371H9.28A23.755,23.755,0,0,0,0,37.256l8.458-20.2.193-.483L8.99,15.8a4.181,4.181,0,0,1,.338-.822C15.66.329,22.813-3.006,37.217,2.5Z" transform="translate(25.133 9.676)" fill="none" stroke="#9f7a32" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
        <path id="Vector-2" data-name="Vector" d="M40.213,33.833a23.006,23.006,0,0,0-6.815-.967H0L14.017.338,14.162,0c.725.242,1.4.58,2.127.87l10.682,4.5c5.945,2.465,10.1,5.027,12.615,8.12a10.224,10.224,0,0,1,1.208,1.74A7.354,7.354,0,0,1,41.76,17.3,7.8,7.8,0,0,1,42.2,18.56C43.5,22.62,42.727,27.6,40.213,33.833Z" transform="translate(48.188 12.18)" fill="none" stroke="#9f7a32" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
        <path id="Vector-3" data-name="Vector" d="M47.125,61.287H28.275a26.674,26.674,0,0,1-3.432-.242Q1.788,59.523.242,36.443A26.674,26.674,0,0,1,0,33.012V23.587a23.653,23.653,0,0,1,14.307-21.7A23.935,23.935,0,0,1,23.587,0H70.76a24.189,24.189,0,0,1,6.815.967A23.581,23.581,0,0,1,94.3,23.538v9.425c0,.967-.048,1.933-.1,2.9C93.283,52.78,83.858,61.287,65.975,61.287" transform="translate(10.875 45.047)" fill="none" stroke="#9f7a32" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
        <path id="Vector-4" data-name="Vector" d="M22.765,0,14.307,20.2A23.653,23.653,0,0,0,0,41.905V27.743A28.268,28.268,0,0,1,22.765,0Z" transform="translate(10.827 26.728)" fill="none" stroke="#9f7a32" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
        <path id="Vector-5" data-name="Vector" d="M16.723,24.988V39.15A23.581,23.581,0,0,0,0,16.578C2.513,10.295,3.238,5.365,2.03,1.257A5.521,5.521,0,0,0,1.595,0,28.144,28.144,0,0,1,16.723,24.988Z" transform="translate(88.45 29.483)" fill="none" stroke="#9f7a32" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
        <path id="Vector-6" data-name="Vector" d="M0,0H116V116H0Z" fill="none" opacity="0"/>
      </g>
    </g>
    <rect id="Rectangle_30662" data-name="Rectangle 30662" width="80.506" height="80.506" rx="34" transform="translate(685.757 326.598) rotate(22)" fill="#9f7a32" opacity="0.12"/>
  </g>
</svg>
<p className="text-[#9F7A32] text-[22px] font-bold">{t("balanceTitle")}</p>
<p className="text-[#9F7A32] text-[41px] font-bold">{data?.data?.data?.balance}</p>
<CustomButton onClick={()=> setOpen(true)}>{locale ==="ar"?"شحن المحفظة":"Charge Wallet"}</CustomButton>
{/* <div onClick={() => setIsPaymentModalOpen(true)} className="w-[260] h-[54] bg-[#9F7A32] rounded-[14px] flex justify-center items-center gap-[6px] cursor-pointer">


<ModalPayment data={data?.data} token={token} locale={locale}  isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)}/>
    <p className="text-[#9F7A32] text-[14px] font-normal">{t("addMoney")}</p>

</div> */}
</div>  

    </div>
  </>
  )
}

export default Wallet
