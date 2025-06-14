import Container from "@/components/shared/formcomponents/Container";
import React from "react";
import notifications from "@/public/images/notifications.svg";
import Image from "next/image";
import Notifications from "./Notifications";
import noNotifications from "@/public/images/nonotifications.svg";
import { getNotification } from "@/lib/serverActions";
import { getTranslations } from "next-intl/server";
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
export default async function Page({ params }: LayoutProps) {
  const t = await getTranslations("notifications");

  const { locale } = await params;
  const { data } = await getNotification(locale);
  console.log("data?.data.notifications", data?.data.notifications);
  return (
    <Container>
      <div>
        <div className="flex items-center justify-center lg:justify-start gap-3 mt-[120px] lg:mt-[180px] ">
          <Image src={notifications} alt="notifications" />
          <h2 className="text-[#9F7A32] font-bold text-[22px]">{t("title")}</h2>
        </div>
        <h2 className="text-sm text-[#9F7A32] text-center lg:text-start mt-2"> {t("description")} </h2>
      </div>
      {data?.data.notifications.length > 0 ? (
        // <div className="grid grid-cols-12">

        <Notifications notificationsData={data?.data.notifications} />
      ) : (
        // </div>
        <div className="flex flex-col gap-5 items-center justify-center h-[70vh]">
          <Image src={noNotifications} alt="noNotifications" />
          <h2 className="text-[16px] text-[#333C52]">{t("noNotifications")}</h2>
        </div>
      )}
    </Container>
  );
}
