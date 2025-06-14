import React from "react";
import Image from "next/image";
import ourServiceIcon1 from "@/public/images/our-services-icon-1.svg";
import ourServiceIcon2 from "@/public/images/our-services-icon-2.svg";
import ourServiceIcon3 from "@/public/images/our-services-icon-3.svg";
import ourServiceIcon4 from "@/public/images/our-services-icon-4.svg";
import Link from "next/link";
import { useTranslations } from "next-intl";



const OurServicesCards = ({locale}:{locale:string}) => {
  const TC = useTranslations("home.services.consultation");
  const TF = useTranslations("home.services.feasibilityStudy");
  const TP = useTranslations("home.services.projectExecution");
  const TG = useTranslations("home.services.governmentContracts");

  const services = [
    {
      id: 1,
      icon: ourServiceIcon1,
      title: TC("title"),
      description: TC("description"),
      bgColor: "#f5f2eb",
      textColor: "text-[#333C52]",
      buttonBg: "bg-transparent border border-[#9F7A32]", 
      buttonText: "text-[#9F7A32]",
      href: "/appointment",
    },
    {
      id: 2,
      icon: ourServiceIcon2,
      title: TF("title"),
      description: TF("description"),
      bgColor: "#f5f2eb",
      textColor: "text-[#333C52]",
      buttonBg: "bg-transparent border border-[#9F7A32]",
      buttonText: "text-[#9F7A32]",
      href: "/feasibility-study",
    },
    {
      id: 3,
      icon: ourServiceIcon3,
      title: TP("title"),
      description: TP("description"),
      bgColor: "#f5f2eb",
      textColor: "text-[#333C52]",
      buttonBg: "bg-transparent border border-[#9F7A32]",
      buttonText: "text-[#9F7A32]",
      href: "/project-implementation",
    },
    {
      id: 4,
      icon: ourServiceIcon4,
      title: TG("title"),
      description: TG("description"),
      bgColor: "#f5f2eb",
      textColor: "text-[#333C52]",
      buttonBg: "bg-transparent border border-[#9F7A32]",
      buttonText: "text-[#9F7A32]",
      href: "/government-contracts",
    },
  ];
  return (
    <div className="grid grid-cols-12  flex-wrap justify-center gap-5 ">
    {services.map((service) => (
      <div
        key={service.id}
        data-aos="fade-left"
        className={`col-span-12 lg:col-span-3 rounded-[27px] text-[#333C52] flex flex-col items-center justify-between p-5 transition-all duration-300 
       bg-[#9F7A32]/[0.06]  
        hover:bg-[#9F7A32] hover:text-white group`}
      >
        {/* عناصر الصورة والعنوان والوصف في عمود بمنتصف البطاقة */}
        <div className="flex flex-col items-center justify-center gap-3">
          <Image
            src={service.icon}
            className="w-[70.28px] h-[70.28px] transition-all duration-300 group-hover:brightness-0 group-hover:invert"
            alt="service-icon"
          />
  
          <h2 className="text-[18px] font-bold lg:w-[160px] text-center group-hover:text-white px-[8px]">
            {service.title}
          </h2>
  
          <h3 className="text-center lg:w-[220px] group-hover:text-gray-200">
            {service.description}
          </h3>
        </div>
  
        {/* الزر في الأسفل */}
        
        <Link href={`${locale}${service.href}`} className={`flex justify-center items-center mt-6 w-[217.64px] h-[61px] rounded-[14px] cursor-pointer text-sm transition-all duration-300 
          ${service.buttonBg} ${service.buttonText} group-hover:bg-white group-hover:text-[#333C52]`}>
        {/* <button
          className={`mt-6 w-[217.64px] h-[61px] rounded-[14px] cursor-pointer text-sm transition-all duration-300 
          ${service.buttonBg} ${service.buttonText} group-hover:bg-white group-hover:text-[#333C52]`}
        >
        </button> */}
         {TC("button")}
        
        </Link>
      </div>
    ))}
  </div>
  
  );
};

export default OurServicesCards;

// import React from "react";
// import Image from "next/image";
// import ourServiceIcon1 from "@/public/images/our-services-icon-1.svg";
// import ourServiceIcon2 from "@/public/images/our-services-icon-2.svg";
// import ourServiceIcon3 from "@/public/images/our-services-icon-3.svg";
// import ourServiceIcon4 from "@/public/images/our-services-icon-4.svg";

// const services = [
//   {
//     id: 1,
//     icon: ourServiceIcon1,
//     title: "حجز موعد استشارة تجارية",
//     description: "يمكنك إرسال حجز موعد مخصص لك لاستشارتك التجارية",
//     bgColor: "#9F7A32",
//     textColor: "text-white",
//     buttonBg: "bg-white",
//     buttonText: "text-[#333C52]",
//   },
//   {
//     id: 2,
//     icon: ourServiceIcon2,
//     title: "طلب دراسة جدوى جدوى",
//     description: "يمكنك إرسال طلب خاص بك لدراسة جدوى لمشروع ما",
//     bgColor: "#f5f2eb",
//     textColor: "text-[#333C52]",
//     buttonBg: "bg-transparent border border-[#9F7A32]",
//     buttonText: "text-[#9F7A32]",
//   },
//   {
//     id: 3,
//     icon: ourServiceIcon3,
//     title: "طلب تنفيذ  مشاريع مشاريع",
//     description: "يمكنك إرسال طلب خاص بك لدراسة جدوى لمشروع ما",
//     bgColor: "#f5f2eb",
//     textColor: "text-[#333C52]",
//     buttonBg: "bg-transparent border border-[#9F7A32]",
//     buttonText: "text-[#9F7A32]",
//   },
//   {
//     id: 4,
//     icon: ourServiceIcon4,
//     title: "التعاقدات الحكومية والخاصة",
//     description: "يمكنك إرسال طلب خاص بك لدراسة جدوى لمشروع ما",
//     bgColor: "#f5f2eb",
//     textColor: "text-[#333C52]",
//     buttonBg: "bg-transparent border border-[#9F7A32]",
//     buttonText: "text-[#9F7A32]",
//   },
// ];

// const OurServicesCards = () => {
//   return (
//     <div className="flex flex-wrap justify-center gap-5 mt-10">
//     {services.map((service) => (
//       <div
//         key={service.id}
//         className={`lg:w-[250px]  lg:h-[358px] rounded-[27px] flex flex-col items-center justify-center p-5 transition-all duration-300 
//         ${service.id === 1 ? "bg-[#9F7A32] text-white" : `bg-[${service.bgColor}]`} 
//         hover:bg-[#9F7A32] hover:text-white group`}
//       >
//         {/* عناصر الصورة والعنوان والوصف في عمود بمنتصف البطاقة */}
//         <div className="flex flex-col items-center justify-center gap-3">
//           <Image
//             src={service.icon}
//             className="w-[70.28px] h-[70.28px] transition-all duration-300 group-hover:brightness-0 group-hover:invert"
//             alt="service-icon"
//           />
  
//           <h2 className="text-[18px] font-bold lg:w-[146px] text-center group-hover:text-white">
//             {service.title}
//           </h2>
  
//           <h3 className="text-center lg:w-[202px] group-hover:text-gray-200">
//             {service.description}
//           </h3>
//         </div>
  
//         {/* الزر في الأسفل */}
//         <button
//           className={`mt-6 w-[217.64px] h-[61px] rounded-[14px] cursor-pointer text-sm transition-all duration-300 
//           ${service.buttonBg} ${service.buttonText} group-hover:bg-white group-hover:text-[#333C52]`}
//         >
//           اطلب الخدمة الآن
//         </button>
//       </div>
//     ))}
//   </div>
  
//   );
// };

// export default OurServicesCards;
