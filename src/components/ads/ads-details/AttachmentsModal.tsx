import React from "react";
import closeModal from "@/public/images/close-modal.svg";
import Image from "next/image";
import arrow from "@/public/images/licenses-arrow-left.svg";

interface AttachmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  licence:string
}

const AttachmentsModal: React.FC<AttachmentsModalProps> = ({ isOpen, onClose,licence }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#9F7A32]/[0.31] z-[9999] p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[513px] lg:h-[485px] flex flex-col justify-center items-center relative">
         <div className="absolute -top-2 cursor-pointer -right-1 bg-white w-[40px] h-[40px] rounded-full border-[3px] flex items-center justify-center border-[#DFD4BD]" onClick={onClose}>
                           <Image src={closeModal} alt="closeModal" />
                       </div>  

        <div className="text-center">
          <h2 className="text-[#333C52] font-bold text-lg sm:text-xl lg:text-[24px]">المرفقات والتراخيص</h2>
          <p className="text-[#909090] text-xs sm:text-sm mt-1">المرفقات والتراخيص الخاصة بالمعلن</p>
        </div>

        
        <div className="flex items-center justify-center gap-4 sm:gap-10 mt-6 sm:mt-10">
          {/* <Image src={arrow} alt="arrow" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-auto lg:h-auto" /> */}
          <div className="bg-[#f8f6f1] w-[180px] h-[200px] sm:w-[230px] sm:h-[250px] lg:w-[273px] lg:h-[288px] rounded-[20px] sm:rounded-[29px] relative">
            <Image src={licence|| arrow} alt="arrow" fill/>
          </div>
          {/* <Image src={arrow} alt="arrow" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-auto lg:h-auto" /> */}
        </div>
      </div>
    </div>
  );
};

export default AttachmentsModal;
