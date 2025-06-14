import React, { useEffect, useState } from "react";
import CustomTextAria from "../shared/reusableComponents/CustomTextAria";
import Image from "next/image";
import { useForm } from "react-hook-form";
import closeModal from "@/public/images/close-modal.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import Upload from "../shared/Upload";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

interface PaymentModalProps {
  isOpen?: boolean;
  onClose: () => void;
  providerId?: string;
  token?: string;
  locale: string;
  data: any;
}

type paymentDataType = {
  payment_method: "wallet" | "bank";
  bank_image?: File;
};
const ModalPayment = ({
  data,
  isOpen,
  onClose,
  providerId,
  locale,
  token,
}: PaymentModalProps) => {
  const [online, setOnline] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  console.log("filelllllll", file);
  console.log("online..........", online);

  const { register, handleSubmit, reset, getValues } = useForm();
  console.log("getValues.......", getValues());

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("payment_method", online ? "wallet" : "bank");

    if (!online && file) {
      formData.append("bank_image", file); // Make sure the key name matches what backend expects
    }

    mutate(formData); // send FormData instead of JSON
  };

  const { mutate, isPending } = useMutation<paymentDataType>({
    mutationFn: (paymentData: paymentDataType) =>
      apiServiceCall({
        url: `ads/charge/${id}`,
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: paymentData,
      }),
    onError: (error) => {
      console.log("errorrrr consultant", (error as any)?.data?.message);

      toast.error((error as any)?.data?.message);
    },
    onSuccess: (data) => {
      console.log("data success", data);

      toast.success(data?.data?.message);
      router.push(`/${locale}/my-ads`);
      reset();
    },
  });
  // console.log("profileData", profileData.name);
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

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#9F7A32]/[0.31] z-[9999] p-4 ">
      <div className="bg-white mt-6 pt-[58px] px-[45px] pb-[26px] rounded-[29px] w-full max-w-[521px] max-h-[486px] h-full flex flex-col justify-center items-center relative">
        {/* زر الإغلاق */}
        <div
          className="absolute -top-2 cursor-pointer -right-1 bg-white w-[40px] h-[40px] rounded-full border-[3px] flex items-center justify-center border-[#DFD4BD]"
          onClick={onClose}
        >
          <Image src={closeModal} alt="closeModal" />
        </div>

        {/* محتوى المودال */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-[#333C52] font-bold text-lg sm:text-xl lg:text-[24px] text-center">
            دفع الفاتورة
          </h2>
          <p className="text-[#909090] text-xs sm:text-sm text-center mt-[15px] mb-[38px] w-full max-w-xs sm:max-w-sm lg:w-[330px]">
            قم باختيار الطريقة المناسبة لك للدفع
          </p>
          {/* buttons */}
          <div className="grid grid-cols-2 items-center justify-center w-full gap-[10px]">
            <button
              onClick={() => setOnline(true)}
              className={`col-span-1 text-[12px]  py-[19px] px-[20px] font-normal rounded-[14px] transition-all duration-300 ${
                online
                  ? "text-white  bg-[#2EA044]"
                  : "text-[#333C52] bg-[#333C52]/[0.06]"
              }`}
            >
              تحويل عن طريق رصيد المحفظة
            </button>
            <button
              onClick={() => setOnline(false)}
              className={`col-span-1 text-[12px]  py-[19px] px-[20px] font-normal rounded-[14px] transition-all duration-300 ${
                !online
                  ? "text-white  bg-[#2EA044]"
                  : "text-[#333C52] bg-[#333C52]/[0.06]"
              }`}
            >
              إرفاق صورة تحويل بنكي
            </button>
          </div>

          {/* حقل إدخال النص */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {online ? (
              <>
                <div className="grid grid-cols-2 items-center justify-between w-full mt-[26px] py-[15px] bg-[#9F7A32]/[0.05] rounded-[14px]">
                  <div className="col-span-1 gap-[6px] flex items-center justify-start ms-[20px]">
                    <svg
                      id="vuesax_broken_wallet"
                      data-name="vuesax/broken/wallet"
                      xmlns="http://www.w3.org/2000/svg"
                      width="34.238"
                      height="34.238"
                      viewBox="0 0 34.238 34.238"
                    >
                      <g id="wallet">
                        <path
                          id="Vector"
                          d="M10.985.739l-.043.1L6.8,10.44H2.739A7.012,7.012,0,0,0,0,11L2.5,5.033l.057-.143.1-.228a1.234,1.234,0,0,1,.1-.243C4.622.1,6.734-.887,10.985.739Z"
                          transform="translate(7.418 2.856)"
                          fill="none"
                          stroke="#9f7a32"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                        <path
                          id="Vector-2"
                          data-name="Vector"
                          d="M11.869,9.986A6.791,6.791,0,0,0,9.858,9.7H0L4.137.1,4.18,0c.214.071.414.171.628.257L7.96,1.584a9.268,9.268,0,0,1,3.723,2.4,3.018,3.018,0,0,1,.357.514,2.171,2.171,0,0,1,.285.613,2.3,2.3,0,0,1,.128.371A6.745,6.745,0,0,1,11.869,9.986Z"
                          transform="translate(14.223 3.595)"
                          fill="none"
                          stroke="#9f7a32"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                        <path
                          id="Vector-3"
                          data-name="Vector"
                          d="M13.909,18.089H8.346a7.873,7.873,0,0,1-1.013-.071q-6.8-.449-7.261-7.261A7.873,7.873,0,0,1,0,9.744V6.962A6.981,6.981,0,0,1,4.223.556,7.065,7.065,0,0,1,6.962,0H20.885A7.14,7.14,0,0,1,22.9.285a6.96,6.96,0,0,1,4.936,6.662V9.729c0,.285-.014.571-.029.856-.271,4.993-3.053,7.5-8.331,7.5"
                          transform="translate(3.21 13.296)"
                          fill="none"
                          stroke="#9f7a32"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                        <path
                          id="Vector-4"
                          data-name="Vector"
                          d="M6.719,0l-2.5,5.963A6.981,6.981,0,0,0,0,12.369V8.189A8.344,8.344,0,0,1,6.719,0Z"
                          transform="translate(3.196 7.889)"
                          fill="none"
                          stroke="#9f7a32"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                        <path
                          id="Vector-5"
                          data-name="Vector"
                          d="M4.936,7.375v4.18A6.96,6.96,0,0,0,0,4.893,6.985,6.985,0,0,0,.6.371,1.629,1.629,0,0,0,.471,0,8.307,8.307,0,0,1,4.936,7.375Z"
                          transform="translate(26.107 8.702)"
                          fill="none"
                          stroke="#9f7a32"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                        <path
                          id="Vector-6"
                          data-name="Vector"
                          d="M0,0H34.238V34.238H0Z"
                          fill="none"
                          opacity="0"
                        />
                      </g>
                    </svg>
                    <p className="text-[#6F7C82] text-[15px]">رصيد محفظتك</p>
                  </div>
                  <div className="col-span-1 gap-[6px] flex items-center justify-end me-[40px] text-[#9F7A32] ">
                    <p className="text-[21px] font-bold">
                      {data?.data?.balance}
                    </p>
                    <p className="text-[15px]">ر.س</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex gap-[10px] mt-[21px]">
                {" "}
                {/* <input
                  type="file"
                  className="hidden"
                  {...register("file")}
                 
                /> */}
                <Upload
                  rounded="rounded-[14px]"
                  setFile={setFile}
                  acceptType="image/png, image/jpeg"
                />
                <div className="flex flex-col gap-[10px] items-start justify-center">
                  <p className="text-[#333C52] text-[14px]">
                    أرفق صورة إيصال التحويل البنكي
                  </p>
                  <p className="text-[#848484] text-[12px]">
                    قم بإرفاق صورة إيصال التحويل البنكي
                  </p>
                </div>
              </div>
            )}

            {/* زر الإرسال */}
            <button
              className="mt-[20px] bg-[#9F7A32] w-full  h-[54px] text-white px-6 py-2 rounded-[14px] text-[14px]"
              //   onClick={onClose}
            >
              تأكيد الدفع
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPayment;
