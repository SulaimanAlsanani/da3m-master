import BankAccount from "@/components/bank-accounts/BankAccount";
import Container from "@/components/shared/formcomponents/Container";
import { cookies } from "next/headers";
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
       <BankAccount token={token} locale={locale}/>
      </Container>
    </>
  );
};

export default page;
