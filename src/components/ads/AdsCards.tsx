"use client"
import React, { useEffect, useState } from "react";
import Card from "../shared/Card";
import kingdom from "@/public/images/kingdom.jpg";
import Gallary from "../vedieosSlider/Gallary";
import { usePathname } from "next/navigation";
import HomeGallary from "../vedieosSlider/HomeGallary";
import HomeCard from "../shared/HomeCard";

const AdsCards: React.FC = ({open,items,sectionIndex,setActiveSection,activeSectionIndex, setOpen}:{open:boolean,sectionIndex:number; setOpen: React.Dispatch<React.SetStateAction<boolean>>,items:any}) => {
    const [adData, setAdData] = useState({});
    const [activeIndex, setActiveIndex] = useState(0)
 
// console.log(sectionIndex, "activeSectionIndexxxxxxxxxxxxxxxz")
    const pathName = usePathname()
    console.log(pathName)
   

console.log(activeSectionIndex, "activeSectionIndexxxxxxxxxxxxxxxz")
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-12 lg:gap-4 gap-10 mt-10  ">


{activeSectionIndex === sectionIndex && open && <HomeGallary pathName={pathName} activeIndex={activeIndex} open={activeSectionIndex === sectionIndex && open}  activeSectionIndexProp={activeSectionIndex} sectionIndex={sectionIndex} items={items} setOpen={setOpen} />}
{/* <Gallary pathName={pathName} activeIndex={activeIndex} open={open} home activeSectionIndexProp={activeSectionIndex} sectionIndex={sectionIndex} items={items} setOpen={setOpen} /> */}


            {items?.map((item:any, index:number) =>{
                return (<div key={item.id} data-aos="fade-up" className=" grid-col-12 lg:col-span-3 flex justify-center w-full"> <HomeCard
                
                id={index}
                userId={item?.advertiser?.id}
                setOpen={setOpen}
                setAdData={setAdData}
                sectionIndex={sectionIndex}
                setActiveIndex={setActiveIndex}
                setActiveSection={setActiveSection}
                image={item.image}
                name={item?.advertiser?.name}
                is_verified={item?.advertiser?.verified}
                date={item?.created_at}
                category={item?.category}
                desc={item?.description}
                rating={item?.advertiser?.avg_rate}
                personImage={item?.advertiser?.image}
                is_video={item?.is_video}
                is_audio={item?.is_audio}
                
            /></div>)
            })}
           
           
        </div>
    );
};

export default AdsCards;
