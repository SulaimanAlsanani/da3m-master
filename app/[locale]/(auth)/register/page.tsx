import Login from "@/components/auth/login/Login";
import Register from "@/components/auth/register/Register";
import { getAreas, getCategories } from "@/lib/serverActions";

interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}



export default async function Page({ params }: LayoutProps) {
  const { locale } = await params;
  const areas = await  getAreas(locale)
  const categories = await  getCategories(locale)

  console.log("locale", locale);
  
  return (
    <>
      <Register categories={categories?.data?.data?.categories} areas={areas?.data?.data?.areas}  locale={locale} />
    </>
  );
}
