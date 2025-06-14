import { cookies } from "next/headers";
import Wallet from "../../../src/components/Wallet/Wallet";
import Container from './../../../src/components/shared/formcomponents/Container';

    interface LayoutProps {
    params: Promise<{ locale: string | any }>; // Handle both promise and object
    searchParams: { [key: string]: string | string[] | undefined };
  }

const page = async({ params }: LayoutProps) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const {locale} = await params;
  return (
    <>
      <Container className=" mt-[120px]">
       <Wallet token={token} locale={locale}/>
      </Container>
    </>
  )
}

export default page
