import AddAds from "@/components/add-ads/AddAds";
import Container from "@/components/shared/formcomponents/Container";
import { getCategories, getSectionsData } from "@/lib/serverActions";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Image from "next/image";
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
  searchParams: { [key: string]: string | string[] | undefined };
}
const Page = async({ params ,searchParams }: LayoutProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const {locale} = await params;
  const id = searchParams.id;
  console.log("paramamsmmsms",id);
  
  const section = await getSectionsData(locale);
  const cats = await getCategories(locale);
  const t = await getTranslations("addAds")
  console.log("section", section?.data?.data.sections);
  return (
    <>
      <Container className="flex flex-col justify-center items-center mt-[120px] lg:mt-[180px]">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex justify-center lg:justify-start gap-3 w-full">
            <Image src="/images/addAds.svg" alt="edit" width={36} height={36} />
            <p className="text-[#9F7A32] text-[22px] font-bold"> 
              {id? t("editYourAd") : t("pageTitle") }
              
               
               </p>
          </div>
          <div className="flex justify-center lg:justify-start w-full">
          <p className="text-[#9F7A32] text-center text-[14px] font-normal">
          {id? t("subeditYourAd") : t("pageDescription") }
            
            
            </p>
          </div>
        </div>
        <AddAds token={token || ""} locale={locale} categories={cats?.data?.data?.categories} section={section?.data?.data?.sections}/>
      </Container>
    </>
  );
};

export default Page;
