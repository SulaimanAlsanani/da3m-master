import React, { useEffect } from "react";
import Image from "next/image";
import closeModal from "@/public/images/close-modal.svg";
import report from "@/public/images/report.svg";
import CustomTextAria from "@/components/shared/reusableComponents/CustomTextAria";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";


interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerId:string
  token:string
}

const ReportModal: React.FC<ReportModalProps> = ({ token, isOpen, onClose,providerId }) => {

  const {register, handleSubmit} = useForm({
    defaultValues: {description:""}
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => apiServiceCall({url:"flag", body:data, method:"POST", headers:{
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
    form.append('description',data.description)
    form.append('provider_id',providerId)
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#9F7A32]/[0.31] z-[9999] p-4 ">
      <div className="bg-white p-6 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[513px] lg:h-[485px] flex flex-col justify-center items-center relative">
        
        {/* زر الإغلاق */}
        <div
          className="absolute -top-2 cursor-pointer -right-1 bg-white w-[40px] h-[40px] rounded-full border-[3px] flex items-center justify-center border-[#DFD4BD]"
          onClick={onClose}
        >
          <Image src={closeModal} alt="closeModal" />
        </div>

        {/* محتوى المودال */}
        <div className="flex flex-col items-center w-full">
          <Image src={report} alt="report" className="mx-auto mb-5" />
          <h2 className="text-[#333C52] font-bold text-lg sm:text-xl lg:text-[24px] text-center">
            تقديم شكوى
          </h2>
          <p className="text-[#909090] text-xs sm:text-sm text-center mt-2 w-full max-w-xs sm:max-w-sm lg:w-[330px]">
            إذا واجهتك أي مشكلة مع هذا المعلن يمكنك إرسال شكوى إلينا
          </p>

          {/* حقل إدخال النص */}
          <form onSubmit={handleSubmit(onSubmit)}>
          <CustomTextAria
          name="description"
          register={register}
            className="w-full max-w-xs sm:max-w-sm lg:w-[352px] mt-4 p-3 border rounded-md text-sm sm:text-base resize-none h-[150px] outline-none"
            placeholder="اكتب تفاصيل الشكوى هنا..."
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

export default ReportModal;
