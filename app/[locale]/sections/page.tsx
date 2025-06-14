import AddAds from "@/components/add-ads/AddAds";
import Container from "@/components/shared/formcomponents/Container";
import MainLink from "@/components/shared/formcomponents/MainLink";
import { getCategories, getSectionsData } from "@/lib/serverActions";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
  searchParams: { [key: string]: string | string[] | undefined };
}
const Page = async({ params  }: LayoutProps) => {
 
  const {locale} = await params;

  
  const sections = await getCategories(locale);
  const t = await getTranslations()
  
  return (
    <>
      <Container className="flex flex-col justify-center gap-10  items-center mt-[70px] lg:mt-[190px]">
        {/* <div className="flex  items-center gap-4 w-full"> */}
          <h2 className="text-center text-primary font-bold text-[32px]">{locale === "en" ? "All Sections" : "جميع الاقسام"}</h2>
        {/* </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 lg:mt-[40px] w-full">
        {sections?.data?.data?.categories?.map((section:any ) => (

<MainLink key={section.id} href={`/ads?sec_id=${section.id}`} className=" overflow-hidden  w-full p-3 h-[258px] group duration-700 hover:bg-[#2EA044] border-[3px] text-center border-white border-opacity-35 bg-[#a4803c] rounded-[19px] flex flex-col items-center justify-center gap-3">
  <Image
    src={section.image}
    alt={section.title}
    width={70}
    height={70}
    className="w-[70px] h-[70px] mb-3"
  />
  <h2 className="text-[21px] text-white font-bold w-[130px] break-words">
    {section.title}
  </h2>
  <p className="text-white text-sm duration-700 translate-y-[70px] h-0 group-hover:translate-y-0 group-hover:h-full">
    {section.brief}
  </p>
</MainLink>

))}
        </div>
     
      </Container>
    </>
  );
};

export default Page;
