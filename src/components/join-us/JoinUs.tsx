import React from "react";
import Container from "../shared/formcomponents/Container";
import Image from "next/image";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
type JoinUsProps = {
  title: string;
  content: string;
  image: string;
};

  const JoinUs = ({ join , home , locale}: { join: JoinUsProps , home?:boolean , locale:string}) => {
    
    const t = useTranslations("home.Job")
    
    return (
    <Container>
      <div className="bg-[#2EA044]/[0.04] overflow-hidden  grid grid-cols-12 gap-4 rounded-[31px] mt-10 lg:mt-20 ">
      

        <div className="text-center lg:text-start col-span-12 md:col-span-8 mt-6 lg:my-[50px] md:ps-[92px]">
          <h2 className="text-[#2EA044] font-bold text-[28px] ">
            {join?.title}
          </h2>
          <h3 dangerouslySetInnerHTML={{__html:join?.content}} className="text-[#333C52] text-[18px] lg:text-[20px] mt-2 text-center lg:text-start"/>
            
         
          {home && (<Link
            href={`/${locale}/join-us`}
            className="text-[#333C52] text-sm mt-3 flex justify-center lg:justify-start items-center gap-1"
          >
            {t("JobApplication")}
            <ArrowLeft />
          </Link>
        )}
          </div>

          <div className="col-span-12 md:col-span-4 h-full w-full">
          <Image src={join?.image} width={420} height={280} alt="joinUs" className="lg:w-[420px] lg:h-[280px] h-[200px]  w-full "/>
        </div>
      </div>
    </Container>
  );
};

export default JoinUs;
