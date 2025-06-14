import MyAdsByID from "@/components/my-ads/SingleAds/MyAdsByID";
import { cookies } from "next/headers";
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}

const page = async ({ params }: LayoutProps) => {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  return (
    <>
      <MyAdsByID locale={locale} token={token} />
    </>
  );
};

export default page;
