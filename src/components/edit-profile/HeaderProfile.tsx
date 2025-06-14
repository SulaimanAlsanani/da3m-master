import Image from 'next/image'
import React, { useState } from 'react'
import Upload from '../shared/Upload'
import { useTranslations } from 'use-intl';

const HeaderProfile = ({setImageProfile}:{setImageProfile:React.Dispatch<React.SetStateAction<File | null>>}) => {
    // const [file, setFile] = useState<File | null>(null);
  const t = useTranslations("editProfile")

  return (
  <>
   
     {/* Header */}
     <div className="flex justify-start gap-3 w-full">
        <Image
          src="/images/edit-profile.svg"
          alt="edit"
          width={38}
          height={38}
        />
        <p className="text-[#9F7A32] rounded-full text-[22px] font-bold">
        {t("title")}
        </p>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex gap-4 w-full items-center mt-[48px]">
        <Upload rounded="rounded-full" setFile={setImageProfile} />
        <div className="flex flex-col gap-2">
          <p className="text-[14px] text-[#333C52]">{t("change_personal_image")}</p>
          <p className="text-[12px] text-[#848484]">
          {t("change_personal_image_description")}
          </p>
        </div>
      </div>
  
  </>
  )
}

export default HeaderProfile