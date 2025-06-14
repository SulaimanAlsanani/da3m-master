'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import ads from '@/public/images/adss.svg'
import searchIcon from '@/public/images/search-icon.svg'
import adsLocation from '@/public/images/adss-location.svg'
import section from '@/public/images/section-filter.svg'
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect'
import { Region } from '../government-contracts/GovernmentContractsForm'
import { Category } from '@/components/auth/register/Register'
import { useTranslations } from 'next-intl'
type Types = {
  value: string;
  label: string;
};
const AdsRight = ({formProps, areas, categories}:{areas: Region[],
  categories:Category,formProps:any}) => {
      const t = useTranslations("allAds");
      const typeOptions: Types[] = [
        { value: "client", label: t("client") },
        { value: "store", label: t("store") }
      ];
  // استخدم useForm لإنشاء `control`
  // const { control } = useForm({
  //   defaultValues: {
  //     city: '',
  //     section: '',
  //     type: ''
  //   }
  // });

  // قائمة الفلاتر
  const cityOptions = [
    { value: 'riyadh', label: 'الرياض' },
    { value: 'jeddah', label: 'جدة' },
    { value: 'dammam', label: 'الدمام' },
  ];

  const sectiosOptions = [
    { value: 'section1', label: 'قسم1' },
    { value: 'section2', label: 'قسم2' },
    { value: 'section3', label: 'قسم3' },
  ];

  

  return (
    <div className="px-4 sm:px-6 lg:px-0 ">
      {/* عنوان الإعلانات */}
      {/* <div className='flex items-center gap-3'>
        <Image src={ads} alt='ads' />
        <h2 className='text-[28px] sm:text-[33px] font-bold text-[#9F7A32]'>{t("ads")}</h2>
      </div> */}

      {/* نموذج البحث */}
      <form>
        {/* حقل البحث */}
        <div className="mt-10 relative">
          <input
            className="w-full   h-[50px] sm:h-[55px] bg-[#fafafa] rounded-[14px] outline-none px-5 pr-12" 
            placeholder={t("searchPlaceholder")}
            {...formProps.register('search')}
          />
          <Image
            src={searchIcon}
            alt="searchIcon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>

        {/* فلترة حسب المدينة */}
        <div className='mt-7'>
          <label className='flex items-center gap-2 mb-4'>
            <Image src={adsLocation} alt='adsLocation' className="w-5 h-5 sm:w-auto sm:h-auto"/>
            <h2 className='text-[#848484] font-bold text-[14px] sm:text-[16px]'>  {t("filterByCity")}</h2>
          </label>
          <CustomSelect
          control={formProps.control}
          name="area_id"
         
          placeholder={t("city")}
          // @ts-ignore
          options={areas}
          arrayKey="cities"
         
          
          isGroup
          groupKey="name"
        />
        </div>

        {/* فلترة حسب القسم */}
        {/* <div className='mt-7'>
          <label className='flex items-center gap-2 mb-4'>
            <Image src={section} alt='section' className="w-5 h-5 sm:w-auto sm:h-auto"/>
            <h2 className='text-[#848484] font-bold text-[14px] sm:text-[16px]'>فلترة حسب القسم</h2>
          </label>
          <CustomSelect 
            control={formProps.control} 
            placeholder="الكل"
            options={sectiosOptions} 
          />
        </div> */}

        {/* فلترة حسب النوع */}
        <div className='mt-7'>
          <label className='flex items-center gap-2 mb-4'>
            <Image src={section} alt='section' className="w-5 h-5 sm:w-auto sm:h-auto"/>
            <h2 className='text-[#848484] font-bold text-[14px] sm:text-[16px]'>  {t("filterByCategory")}</h2>
          </label>
          <CustomSelect
          control={formProps.control}
          options={ 
           [...categories?.map((cat:Category) => {
              return {value:cat.id, label:cat.title}
             })]
          }
          name="department"
          placeholder={t("department")}
        />
         {/* <div className=" mt-7 ">
         <label className='flex items-center gap-2 mb-4'>
            <Image src={section} alt='section' className="w-5 h-5 sm:w-auto sm:h-auto"/>
            <h2 className='text-[#848484] font-bold text-[14px] sm:text-[16px]'>   {t("account_type")}</h2>
          </label>
         <CustomSelect 
          name='type'
            control={formProps.control} 
            placeholder={t("account_type")}
            options={typeOptions} 
            
          />
         </div> */}
        </div>
      </form>
    </div>
  )
}

export default AdsRight
