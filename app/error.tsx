"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { logoutHandlder } from "@/lib/serverActions";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const locale = useLocale();
// console.log(error)
//   useEffect(() => {
//     if (error.message.includes("401")) {
      
//       const handleLogoutAndRedirect = async () => {
//         await fetch("/api/auth/logout", { method: "GET" });
//         const normalizedLocale = locale.startsWith("/") ? locale.slice(1) : locale;
//         window.location.href = `/${normalizedLocale}/login`
//         // router.push(`/${normalizedLocale}/login`);
//       };
      
//       handleLogoutAndRedirect();
//     }
//   }, [error, locale, router]);

//   if (error.message.includes("401")) {
//     return 
//   }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-600">
          {locale === "ar" ? "حدث خطأ" : "Something went wrong"}
        </h1>
        <p className="text-gray-600">
          {locale === "ar"
            ? "عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى"
            : "Sorry, an error occurred. Please try again."}
        </p>
        <div className="space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {locale === "ar" ? "حاول مرة أخرى" : "Try again"}
          </button>
          <Link
            href={`/${locale}`}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition inline-block"
          >
            {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}