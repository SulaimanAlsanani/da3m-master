"use client"
import React, { useEffect, useState } from 'react'
import AdsRight from '../../../app/[locale]/ads/AdsRight'
import AllAds from '../../../app/[locale]/ads/addsSlider/allAds'
import { useQuery } from '@tanstack/react-query'
import apiServiceCall from '@/lib/apiServiceCall'
import Loading from '../../../app/loading'
import { useForm } from 'react-hook-form'
import { Category, Region } from '../auth/register/Register'
import { useSearchParams } from 'next/navigation'
import { DrawerDemo } from './ads-details/Drawer'
import ads from '@/public/images/adss.svg'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import CustomModal from '../shared/reusableComponents/CustomModal'
import MyMap from '../shared/Map/Map'

const AllAdsPage = ({locale, areas, categories, token}:{locale:string,areas: Region[],
  
  categories:Category, token:string}) => {

    const searchParams = useSearchParams()
  const[page, setPage] = useState(1)
  const [items, setItems] = useState(null)
const formProps = useForm({
  defaultValues: {
    search:"",
area_id: "",
department: searchParams.get('sec_id') || "",
type: ""
  }
})

const [open, setOpen] = React.useState(false);
console.log(open, "open")
    const {data, refetch,isPending, isSuccess, isFetching, isFetched} = useQuery({
        queryKey:['ads'],
        queryFn: async () => apiServiceCall({url:`ads?page=${page}&per_page=6${formProps.getValues('search') !== "" ? `&keyword=${formProps.getValues('search')}`:""}${formProps.getValues('area_id') !== "" ? `&area_id=${formProps.getValues('area_id')}`:""}${formProps.getValues('department') !== "" ? `&category_id=${formProps.getValues('department')}`:""}${formProps.getValues('type') !== "" ? `&type=${formProps.getValues('type')}`:""}`, method:'GET', headers:{
            "Accept-language" : locale,
            // "Authorization" : `Bearer ${token}`
        }}),
        
    })

    

console.log(formProps.getValues())
    useEffect(()=>{
      if(page> 1){

        refetch()
      }
    }, [page])

    useEffect(()=>{
      
        
         
        
        refetch()
        
      
    }, [formProps.watch('search'),formProps.watch('area_id'),formProps.watch('department') ,formProps.watch('type')])
   
    
    useEffect(()=>{
      if(page> 1){

        refetch()
      }
    }, [page])
    useEffect(() => {
      if (data?.data?.data?.ads) {
        setItems(prev =>
          page === 1 ? data.data.data.ads : [...prev, ...data.data.data.ads]
        );
      }
    }, [data]);




    
    // useEffect(() => {
    //   const secId = searchParams.get('sec_id');
    //   if (secId) {
    //     formProps.reset({
    //       search: "",
    //       area_id: "",
    //       department: secId,
    //       type: ""
    //     });
    //     setPage(1);
    //     refetch();
    //   }
    // }, []);
    
    const t = useTranslations("allAds");
  return (
    <div className='h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-3 lg:gap-x-10'>

 {/* {openMap && (
          <CustomModal className="!w-[100%] lg:!w-[40%] " openCloseModal={setOpenMap}>
            <MyMap destination={item?.advertiser?.location} setLocation={setLocation} />
          </CustomModal>
        )} */}

<div className='flex lg:hidden justify-center col-span-12 items-center gap-3'>
        <Image src={ads} alt='ads' />
        <h2 className='text-[28px] sm:text-[33px] font-bold text-[#9F7A32]'>{t("ads")}</h2>
      </div>





    <div className=" hidden lg:flex  flex-col col-span-1 lg:col-span-4  w-full ">
    <div className='flex lg:justify-start justify-center col-span-12 items-center gap-3'>
        <Image src={ads} alt='ads' />
        <h2 className='text-[28px] sm:text-[33px] font-bold text-[#9F7A32]'>{t("ads")}</h2>
      </div>

    <AdsRight categories={categories} areas={areas} formProps={formProps} />
    </div>




   <div className="lg:hidden w-fit col-span-12 mt-6 flex justify-end">
   <DrawerDemo open={open} setOpen={setOpen} >
    <div className=" col-span-1 lg:col-span-4  ">
    <AdsRight  categories={categories} areas={areas} formProps={formProps} />
    </div>
    </DrawerDemo>
   </div>
    



   <div className="col-span-12 lg:col-span-8">

     <AllAds open={open} setOpen={setOpen}  page={page} totalPages={data?.data?.pagination?.total_pages}  refetch={refetch} setPage={setPage} items={items} />
   </div>
    </div>
  )
}

export default AllAdsPage