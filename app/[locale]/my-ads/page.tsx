import MyAdsPage from "@/components/my-ads/MyAdsPage";
import { cookies } from "next/headers";
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
const Page = async ({ params }: LayoutProps) => {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  return (
    <>
      <MyAdsPage locale={locale} token={token} />
    </>
  );
};

export default Page;
