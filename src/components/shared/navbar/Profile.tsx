import Image from 'next/image'
import React, { useState } from 'react'
import ProfileCard from './ProfileCard'

const Profile = () => {
      const [openProfile, setOpenProfile] = useState(false);
    
  return (
    <div className="flex gap-1 items-center relative col-span-4">
                    {" "}
                    <Image
                      width={52}
                      height={52}
                      src="/images/profileImg.png"
                      alt="icons"
                      className="w-[28px] h-[28px] md:w-[52px] md:h-[52px] rounded-full"
                    />
                    <div className="flex flex-col ">
                      <p className="text-[#6F7C82] text-[10px] md:text-[12px]">مرحبا</p>{" "}
                      <div className="flex gap-1 text-[#333C52] text-[12px] md:text-[16px]">
                        أحمد البدري
                        <Image
                          width={16}
                          height={16}
                          src="/images/arrow-down.svg"
                          alt="icons"
                          className=" cursor-pointer"
                          onClick={() => setOpenProfile(!openProfile)}
                        />
                      </div>
                    </div>
                    {openProfile && <ProfileCard setOpenProfile={setOpenProfile}
                openProfile={openProfile} />}
                  </div>
  )
}

export default Profile