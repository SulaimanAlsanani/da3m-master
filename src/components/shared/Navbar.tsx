"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./formcomponents/Container";
import AsideMenu from "./navbar/AsideMenu";
import useCurrentLang from "@/hooks/useCurrentLang";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import Customsearch from "./reusableComponents/CustomSearch";
import Gallary from "../vedieosSlider/Gallary";
import CustomModal from "./reusableComponents/CustomModal";
import SearchCard from "./reusableComponents/SearchCard";
import apiServiceCall from "@/lib/apiServiceCall";
import { useQuery } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";


const Navbar = ({userData,token}:{userData:{name:string, image:string, location:{text:string}, areaName:string}, token:string}) => {
  const [open, setOpen] = useState(false)
  const [openPopup, setOpenPopUp] = useState(false)
  const [openGallary, setOpenGallary] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const { lang } = useCurrentLang();
  const [searchTerm, setSearchTerm] = useState("none");
  const {data, refetch,isPending, isSuccess, isFetching, isFetched} = useQuery({
    queryKey:['ads nav'],
    queryFn: async () => apiServiceCall({url:`ads?keyword=${searchTerm}`, method:'GET', headers:{
        "Accept-language" : lang,
        // "Authorization" : `Bearer ${token}`
    }}),
    
    
})
useEffect(()=>{
  if(searchTerm !== "none"){
    refetch()
  }else{
    setSearchTerm("none")
   
  }
  
  
  
}, [searchTerm])

useEffect(()=>{
  if(searchTerm === "none"){
 
    refetch()
  }
  
  
},[searchTerm])



useEffect(()=>{

if(data?.data?.data?.ads?.length > 0){
  setOpenPopUp(true)
  setOpen(false)
}

},[data])
  const [isLogedIn, setIsLogedIn] = useState(true);
  const t = useTranslations("navbar");

  const menuItems: Record<string, string>[] = [
    { value: t("homeLink"), path: "/" },
    { value: t("sections"), path: "/sections" },
    { value: t("ads"), path: "/ads" },
    { value: t("services"), path: "/#services" },
    { value: t("contactUs"), path: "/#contactUs" },
  ];

  const icons: string[] = [
    "home-icon.svg",
    "section-icon.svg",
    "ads-icon.svg",
    "services-icon.svg",
    "contact-icon.svg",
  ];
  const iconsActive: string[] = [
    "home-icon.active.svg",
    "section-icon.active.svg",
    "ads-icon.active.svg",
    "services-icon.active.svg",
    "contact-icon.active.svg",
  ];
  const locationText = userData?.location?.text;
  return (
    <>
    {openPopup && (<CustomModal openCloseModal={setOpenPopUp} className="!w-[90%] !rounded-[8px]" >
        {/* <div className=" grid lg:grid-cols-4 xl:grid-cols-4 my-5 md:grid-cols-2 grid-cols-1 gap-4 w-full h-full overflow-y-auto"> */}
          {/* {data?.data?.data?.ads?.map((item:any, index:number) => (
            
          ))} */}

<div className=" grid grid-cols-1 lg:grid-cols-12  lg:gap-4 gap-5 my-4   ">
  <button onClick={()=> setOpenPopUp(false)} className="flex absolute start-2 top-3"><IoClose className="size-6" /></button>
            <div className="lg:col-span-12 flex justify-center w-full mt-3 lg:mb-10">
            <Customsearch parentClass="!lg:w-[50%]" lang={lang} onChange={(e) => setSearchTerm(e.target.value)} isMobile={false} />
            </div>
            
<Gallary activeIndex={activeIndex} open={openGallary} items={data?.data?.data?.ads} setOpen={setOpenGallary} />
            {data?.data?.data?.ads.length > 0 ? data?.data?.data?.ads?.map((item:any, index:number) =>{
                return (<div key={item.id} className=" grid-cols-1  md:grid-cols-3 lg:col-span-3 h-full flex justify-center  w-full"> <SearchCard
                
                id={index}
                userId={item?.advertiser?.id}
                setOpen={setOpenGallary}
                // setAdData={setAdData}
                title={item?.title}
                setActiveIndex={setActiveIndex}
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
            }): (<>
            <div className="flex h-full justify-center col-span-12 items-center font-bold w-full">

              {lang === "ar" ? "لا توجد نتائج" : "No results found"}
            </div>
            </>)}
           
           
        </div>
        {/* </div> */}
       
     </CustomModal>)}
      <AsideMenu
        iconColor={"white"}
        lang={lang}
        open={open}
        userData={userData}
        areaName={userData?.areaName}
        isLogedIn={token? true:false}
              setIsLogedIn={setIsLogedIn}
        setSearchTerm={setSearchTerm}
        setOpen={setOpen}
        menuItems={menuItems}
      />
       {/* <div className="  bg-white ">
        <Customsearch className="rounded-[4px] !py-3" lang={lang} isMobile />
      </div> */}
      <div className={`fixed w-full z-[99] text-white  !bg-[#fff] " `}>
     
          <nav className="flex items-center custom-shadow justify-center w-full pt-[20px] pb-[10px] lg:pt-[25px] lg:pb-[15px] lg:mx-auto ">
        <Container className="!py-0">
            {/* Desktop View */}

            <DesktopNav
              menuItems={menuItems}
              icons={icons}
              setSearchTerm={setSearchTerm}
              iconsActive={iconsActive}
              lang={lang}
              areaName={userData?.areaName}
              userData={userData}
              locationText={locationText}
              isLogedIn={token? true:false}
              setIsLogedIn={setIsLogedIn}
            />

            {/* Mobile View */}
           
            <MobileNav   userData={userData} setIsLogedIn={setIsLogedIn} lang={lang} isLogedIn={token? true:false} setOpen={setOpen} />
        </Container>
          </nav>
      </div>
    </>
  );
};

export default Navbar;
