import Card from "@/components/shared/Card";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Gallary from "@/components/vedieosSlider/Gallary";
import MainLink from "../shared/formcomponents/MainLink";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

const PublishedAds = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);
  console.log("data adssssssss", data);
  const [adData, setAdData] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const pathName = usePathname();
  console.log(pathName);
  const t = useTranslations("myAds");

  return (
    <>
      <div className="grid grid-cols-12   lg:gap-6 gap-5  ">
        <Gallary
          pathName={pathName}
          activeIndex={activeIndex}
          open={open}
          items={data}
          setOpen={setOpen}
        />
        {data?.map((item: any, index: number) => {
          return (
            <div className="flex col-span-12 md:col-span-6 lg:col-span-3 flex-col items-center justify-between" key={item.id}>
              <Card
                key={item.id}
                id={index}
                userId={item?.advertiser?.id}
                setOpen={setOpen}
                setAdData={setAdData}
                setActiveIndex={setActiveIndex}
                image={item.image}
                // name={item?.advertiser?.name}
                is_verified={item?.advertiser?.verified}
                date={item?.created_at}
                // category={item?.category}
                desc={item?.description}
                rating={item?.advertiser?.avg_rate}
                // personImage={item?.advertiser?.image}
                is_video={item?.is_video}
                is_audio={item?.is_audio}
              />

              <MainLink
                href={`/my-ads/${item?.id}`}
                className="bg-transparent border  border-[#ccc] 
             text-[#9F7A32] font-semibold rounded-md 
             px-4 py-2 text-sm sm:text-base md:px-6 md:py-3 
             transition duration-300 hover:bg-[#9F7A32] flex items-center justify-center gap-2   hover:text-white"
              >
                                  {t("add-details")} 

                <ArrowLeft />
              </MainLink>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PublishedAds;
