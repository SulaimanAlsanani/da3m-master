import React from 'react'
import adssPlay from '@/public/images/adss-play.svg'
import Image from 'next/image'

const AdsCenter = () => {
  return (
    <div 
      className="relative  bg-cover bg-center rounded-[19px] overflow-hidden 
                 w-full h-[400px] sm:w-[300px] sm:h-[500px] md:w-[350px] md:h-[600px] lg:w-[388px] lg:h-[710px]" 
      style={{ backgroundImage: "url('/images/ads-center.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[19px]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white ">
        <Image src={adssPlay} alt="adssPlay" />
        <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold">01:20</h2>
      </div>
    </div>
  )
}

export default AdsCenter
