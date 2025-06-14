import Container from "@/components/shared/formcomponents/Container";
import { getPolicyData } from "@/lib/serverActions";
import Image from "next/image";

interface LayoutProps {
    params: Promise<{ locale: string | any }>; // Handle both promise and object
  }

const page = async ({ params }: LayoutProps) => {
  const { locale } = await params;

    const {data} = await getPolicyData(locale);
      const policyData = data?.data?.page;
  return (
    <Container className="flex flex-col gap-4 items-start  mt-[180px]">
        <p dir="rtl" className="text-[#9F7A32] font-bold text-[22px] text-start" >{policyData?.title}</p>
        <p dir="rtl" className="text-sm text-[#9F7A32] my-4 text-start w-[80%] break-normal" dangerouslySetInnerHTML={{ __html: policyData?.content }} />
          <Image
            src={policyData?.image}
            alt="Policy Image"
            width={250}
            height={200}
            className="object-cover  text-center" 
          />

    </Container>
  )
}

export default page