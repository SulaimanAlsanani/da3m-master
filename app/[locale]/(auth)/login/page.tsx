import Login from "@/components/auth/login/Login";

interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}



export default async function Page({ params }: LayoutProps) {
  const { locale } = await params;
  

  console.log("locale", locale);
  
  return (
    <>
      <Login  locale={locale} />
    </>
  );
}
