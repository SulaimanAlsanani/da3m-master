'use client'
import React, { useEffect } from 'react'

import VedioSlider from './VedioSlider'
import CustomModal from '../shared/reusableComponents/CustomModal'

const Gallary = ({open,items, setOpen,activeIndex,sectionIndex,activeSectionIndexProp, home}:{activeSectionIndexProp?:number; sectionIndex?:number;open:boolean,home?:boolean,activeIndex:number,pathName:string, setOpen: React.Dispatch<React.SetStateAction<boolean>>,items:any}) => {
  




if(home){
  return (
    // <main style={{ height: '100vh', overflow: 'hidden' }}>

<>

{open &&<CustomModal close modalClass='!w-full !h-full !bg-transparent lg:!bg-white' className='!w-full lg:!w-[80%] xl:!w-[50%] !h-[95vh] lg:!h-[70%] px-0 ' openCloseModal={setOpen}>


<VedioSlider activeIndex={activeIndex} items={items} />


</CustomModal> }

</>

  // </main>
  )

}else{
   return (
    // <main style={{ height: '100vh', overflow: 'hidden' }}>

<>

{open && (sectionIndex !== activeSectionIndexProp) &&<CustomModal close modalClass='!w-full !h-full !bg-transparent lg:!bg-white' className='!w-full lg:!w-[80%] xl:!w-[50%] !h-[95vh] lg:!h-[70%] px-0 ' openCloseModal={setOpen}>


<VedioSlider activeIndex={activeIndex} items={items} />


</CustomModal> }

</> 

  // </main>
  )
}



}

export default Gallary