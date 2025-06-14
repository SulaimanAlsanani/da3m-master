"use client"
import React, { useState } from "react";
import Image from "next/image";
import ModalPayment from "./ModalPayment";
import { useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import Loading from "../../../app/loading";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const BankAccount = ({token,locale}:{token:string,locale:string}) => {
    console.log("token..........",token);
    const saerchParams = useSearchParams()
      const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
      const {data,isLoading} = useQuery({
        queryKey:['wallets'],
        queryFn: async () => apiServiceCall({url:`wallets`,  headers:{
            
                "Accept-Language": locale,
                Authorization: `Bearer ${token}`,
              
        }})
    })
console.log("data wallet",data?.data);
      const {data:banckAccount,isLoading:isLoadingBanck} = useQuery({
        queryKey:['bank_accounts'],
        queryFn: async () => apiServiceCall({url:`bank_accounts`,  headers:{
            
                "Accept-Language": locale,
                Authorization: `Bearer ${token}`,
              
        }})
    })
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
  return (
    <>
      <div className="   lg:mt-[100px] grid grid-cols-2 gap-4 items-center ">
        <div className="col-span-2 lg:col-span-1 flex flex-col items-start gap-3 w-full">
          <div className="flex justify-start gap-3 w-full">
            <svg
              id="vuesax_broken_cards"
              data-name="vuesax/broken/cards"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
            >
              <g id="cards">
                <path
                  id="Vector"
                  d="M0,0H25.5"
                  transform="translate(3 18.915)"
                  fill="none"
                  stroke="#c9b58e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
                <path
                  id="Vector-2"
                  data-name="Vector"
                  d="M13.11,21.675H5.67C1.14,21.675,0,20.55,0,16.08V5.595C0,1.545.945.24,4.5.03,4.86.015,5.25,0,5.67,0H19.83c4.53,0,5.67,1.125,5.67,5.595V16.32c-.045,4.275-1.215,5.355-5.67,5.355"
                  transform="translate(3 9.825)"
                  fill="none"
                  stroke="#c9b58e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
                <path
                  id="Vector-3"
                  data-name="Vector"
                  d="M25.5,5.595V16.08c0,4.05-.945,5.355-4.5,5.565V10.92c0-4.47-1.14-5.595-5.67-5.595H1.17c-.42,0-.81.015-1.17.03C.045,1.08,1.215,0,5.67,0H19.83C24.36,0,25.5,1.125,25.5,5.595Z"
                  transform="translate(7.5 4.5)"
                  fill="none"
                  stroke="#c9b58e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
                <path
                  id="Vector-4"
                  data-name="Vector"
                  d="M0,0H2.58"
                  transform="translate(7.875 26.715)"
                  fill="none"
                  stroke="#c9b58e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
                <path
                  id="Vector-5"
                  data-name="Vector"
                  d="M0,0H5.16"
                  transform="translate(13.665 26.715)"
                  fill="none"
                  stroke="#c9b58e"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
                <path
                  id="Vector-6"
                  data-name="Vector"
                  d="M0,0H36V36H0Z"
                  fill="none"
                  opacity="0"
                />
              </g>
            </svg>

            <p className="text-[#9F7A32] text-[22px] font-bold">
              الحساب البنكي
            </p>
          </div>
          <p className="text-[#9F7A32] text-[14px] font-normal">
            تفاصيل الحسابات البنكية الخاصة بالإدارة لإرسال الفواتير والمدفوعات
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1  flex  lg:justify-end w-full">
        {saerchParams.size > 0 &&   <div onClick={() => setIsPaymentModalOpen(true)} className="w-[260] h-[54] bg-[#9F7A32] rounded-[14px] flex justify-center items-center gap-[6px] cursor-pointer">
            <svg
              id="money-send_linear"
              data-name="money-send/linear"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                id="vuesax_linear_money-send"
                data-name="vuesax/linear/money-send"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M0,5.26A1.711,1.711,0,0,0,1.67,7.01H3.55A1.489,1.489,0,0,0,5,5.48a1.321,1.321,0,0,0-.99-1.45L1,2.98A1.314,1.314,0,0,1,.01,1.53,1.5,1.5,0,0,1,1.46,0H3.34A1.711,1.711,0,0,1,5.01,1.75"
                    transform="translate(9.5 8.49)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Vector-2"
                    data-name="Vector"
                    d="M0,0V9"
                    transform="translate(12 7.5)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
                <path
                  id="Vector-3"
                  data-name="Vector"
                  d="M20,10A10,10,0,1,1,10,0"
                  transform="translate(2 2)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Vector-4"
                  data-name="Vector"
                  d="M4,4V0H0"
                  transform="translate(18 2)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Vector-5"
                  data-name="Vector"
                  d="M0,5,5,0"
                  transform="translate(17 2)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  id="Vector-6"
                  data-name="Vector"
                  d="M0,0H24V24H0Z"
                  fill="none"
                  opacity="0"
                />
              </g>
            </svg>

            <p className="text-[#fff] text-[14px] font-normal">دفع فاتورة</p>
          </div>}
          <ModalPayment data={data?.data} token={token} locale={locale}  isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)}/>
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-10 lg:gap-[191px]">

{banckAccount?.data?.data?.banks?.map((bank:any) => (
    
        <div className="flex flex-col items-center justify-center gap-2 mt-8 lg:mt-[100px] " key={bank?.id}>
    <Image src={bank?.image} width={214} height={76} alt="logo" className="w-[214px] h-[76] " />
    <p className="text-[#333C52] text-[14px] font-bold">رقم الحساب الآيبان</p>
    <p className="text-[#333C52] text-[19px] font-medium">{bank?.iban}</p>
    <button onClick={() => handleClick(bank?.id)} className="bg-[#9F7A32]/[0.07] rounded-[14px] mt-[24px] md:mt-[51px] flex gap-[9px] items-center justify-center w-full py-[19px]">
    <svg id="document-copy_bulk" data-name="document-copy/bulk" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="vuesax_bulk_document-copy" data-name="vuesax/bulk/document-copy">
    <g id="document-copy">
      <path id="Vector" d="M13.5,6.15H11.33A3.229,3.229,0,0,1,8.1,2.92V.75A.749.749,0,0,0,7.35,0H4.18A3.96,3.96,0,0,0,0,4.18v6.64A3.96,3.96,0,0,0,4.18,15h5.89a3.96,3.96,0,0,0,4.18-4.18V6.9A.749.749,0,0,0,13.5,6.15Z" transform="translate(2 7)" fill="#9f7a32" opacity="0.4"/>
      <path id="Vector-2" data-name="Vector" d="M10.06,0H4.17A3.946,3.946,0,0,0,0,4.01C.06,4.01.11,4,.17,4H6.06a3.96,3.96,0,0,1,4.18,4.18v6.65c0,.06-.01.11-.01.16a3.932,3.932,0,0,0,4.01-4.16V4.18A3.96,3.96,0,0,0,10.06,0Z" transform="translate(7.76 2)" fill="#9f7a32"/>
      <path id="Vector-3" data-name="Vector" d="M.84.148A.489.489,0,0,0,0,.478V3.1a2.041,2.041,0,0,0,2.07,2c.71.01,1.7.01,2.55.01a.47.47,0,0,0,.35-.8C3.88,3.218,1.94,1.268.84.148Z" transform="translate(11.14 7.002)" fill="#9f7a32"/>
      <path id="Vector-4" data-name="Vector" d="M0,0H24V24H0Z" fill="none" opacity="0"/>
    </g>
  </g>
</svg>
<p className="text-[#9F7A32] text-[14px] ">نسخ رقم الحساب</p>
    </button>
        </div>
      
))}
      </div>
    </>
  );
};

export default BankAccount;
