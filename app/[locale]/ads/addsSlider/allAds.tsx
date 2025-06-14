'use client'
import React, { useState } from 'react'

import VedioSlider from './AdsSlider'
import CustomModal from '@/components/shared/reusableComponents/CustomModal'
import { useLocale } from 'next-intl'
import MyMap from '@/components/shared/Map/Map'


const AllAds = ({items,page,open, setOpen, setPage, refetch,totalPages}:{page:number,totalPages:number, setPage: React.Dispatch<React.SetStateAction<number>>, refetch:any, items:any}) => {
    const [show, setShow] = React.useState(false);
    const locale = useLocale()
    const [openMap, setOpenMap] = useState(false)
    const [item, setItem] = useState(null)


  const [location, setLocation] = useState<{
      lat: null | number;
      lng: null | number;
      name: string;
    }>({ lat: 24.628053928453202, lng: 46.681521298473854 , name: ''});

// console.log(setOpenDrawer, "setOpenDrawer")
    const handleOpenModale = (item:any)=>{
      setItem(item)
      setOpen(false)
      setOpenMap(true)
    }
    if(items === null){
      return <div className='flex justify-center items-center w-full h-full'>  <div className="relative">
      <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
      </div>
    </div></div>
    }
    if(items?.length=== 0){
      return <div className='flex justify-center items-center w-full  font-bold text-[20px] text-gray-500 h-[30vh]'>{locale === "en"? "No ads.": "لا توجد اعلانات."}</div>
    }
  return (
    <main style={{ height: '100vh', width:"100%", overflow: 'hidden' }}>


 {openMap && (
          <CustomModal close className="!w-[100%]  lg:!w-[40%] " openCloseModal={setOpenMap}>
            <MyMap destination={{lat:+item?.advertiser?.direction.lat, lng:+item?.advertiser?.direction.lng}} setLocation={setLocation} />
          </CustomModal>
        )}
{/* {show &&<CustomModal className='!w-[50%]' openCloseModal={setShow}> */}


<VedioSlider open={open} setOpen={setOpen}  handleOpenModale={handleOpenModale} page={page} totalPages={totalPages} refetch={refetch} setPage={setPage} items={items} />


{/* </CustomModal> } */}



  </main>
  )
}

export default AllAds