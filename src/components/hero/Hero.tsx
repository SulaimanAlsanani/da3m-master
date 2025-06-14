"use client";
import Image from "next/image";
// import heroBg from "@/public/images/hero-bg.png";


const Hero = ({ banner }: { banner: string }) => {
  return (
    <div 
    data-aos="fade-down"
      className="h-[300px] lg:h-[638px] w-full bg-cover bg-center mt-[20px] lg:mt-[120px] flex items-center relative"
      // style={{ backgroundImage: `url(${heroBg})` }}
    >
      <Image src={banner} fill alt="heroImg"  className="mt-12 object-contain " />
    </div>
  );
};

export default Hero;
