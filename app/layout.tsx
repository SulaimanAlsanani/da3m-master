import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../src/globals.css";
import { headers } from "next/headers";
import { routing } from "../routing";
import myCustomFont from './fonts/MyCustomFont'
import AOSInitializer, { AOSInit } from "./AOSInit";
import localFont from "next/font/local";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "منصة دعم الوطن",
  // description: "Your premier destination for real estate",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current locale from headers
  const headersList = await headers();
  const currentLocale =
    headersList.get("x-next-intl-locale") || routing.defaultLocale;

  return (
    <html 
      // lang={currentLocale || "ar"}
      dir={currentLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={myCustomFont.className}
    >
      <body
        
        suppressHydrationWarning
      >
 
        {children}
      </body>
    </html>
  );
}
