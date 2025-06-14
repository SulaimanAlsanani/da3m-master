import React, { useEffect, useState } from "react";
import Image from "next/image";
import closeModal from "@/public/images/close-modal.svg";
import { FaStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import { toast } from "react-toastify";
import CustomTextAria from "@/components/shared/reusableComponents/CustomTextAria";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  token:string
  providerId:string
}

const RatingModal: React.FC<RatingModalProps> = ({ token, providerId, isOpen, onClose }) => {

  const [rateNumber, setRateNumber] = useState(null)
  const {register, handleSubmit} = useForm({
    defaultValues: {description:""}
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => apiServiceCall({url:`rates/${providerId}`, body:data, method:"POST", headers:{
      Authorization: `Bearer ${token}`

    }}),
  

    onError: (error: any) => {
      console.log(error)
      toast.error(error?.data?.message)
      // if(error.status === 400){

      //   // router.push(`/${locale}/register?phone_number=${getValues('phone_number')}`)
      // }
    },

    onSuccess:  async(data) => {
      console.log(data)
      toast.success(data.data?.message)
      onClose()
      
    },
  });
  const onSubmit= (data:{description:string})=>{
    console.log(data)
    const form = new FormData()
    form.append('comment',data.description)
    form.append('rate',String(rateNumber))
    mutate(form)
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
  if (!isOpen) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#9F7A32]/[0.31] z-[9999] p-4 ">
      <div className="bg-white p-6 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[513px] lg:h-[438px] flex flex-col justify-between relative">
        
        <div
          className="absolute -top-2 cursor-pointer -right-1 bg-white w-[40px] h-[40px] rounded-full border-[3px] flex items-center justify-center border-[#DFD4BD]"
          onClick={onClose}
        >
          <Image src={closeModal} alt="closeModal" />
        </div>

        <div className="flex flex-col items-center flex-grow mt-5">
          <h2 className="text-[#333C52] font-bold text-center text-[18px] lg:text-[24px]">
            تقييم المعلن
          </h2>
          <p className="text-[#909090] text-sm text-center mt-2">
            قم بتقييم المعلن بالنجوم من خمسة واكتب رأيك به
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 lg:mb-10">
            {[...Array(5)].map((_, index) => (
              <FaStar onClick={()=>setRateNumber(index + 1)}  key={index+1} className={`w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] text-[#D1D1D1] ${index +1 <= rateNumber &&"text-[#ffae38]"}`} />
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <CustomTextAria
          name="description"
          register={register}
            className="w-full max-w-xs sm:max-w-sm lg:w-[352px] mt-4 p-3 border rounded-md text-sm sm:text-base resize-none h-[100px] outline-none"
            placeholder="اكتب تفاصيل التقييم هنا..."
          />

          {/* زر الإرسال */}
          <button
            className="mt-4 bg-[#9F7A32] w-full max-w-xs sm:max-w-sm lg:w-[352px] h-[54px] text-white px-6 py-2 rounded-md text-sm sm:text-base"
            // onClick={onClose}
          >
            إرسال
          </button>
          </form>
         
        </div>

       
      </div>
    </div>
  );
};

export default RatingModal;
