"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "../../shared/formcomponents/Container";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import Gallary from "../../vedieosSlider/Gallary";
import Card from "../../shared/Card";
import Loading from "../../../../app/loading";
import Image from "next/image";
import UserData from "./UserData";
import StatusCard from "./StatusCard";
import DateCard from "./DateCard";
import PDF from "./PDF";
import Payment from "./Payment";
import { toast } from "react-toastify";
import DeleteAndEditAds from "./DeleteAndEditAds";
import RefusedAds from "./RefusedAds";
import { useTranslations } from "next-intl";

const MyAdsByID = ({ locale, token }: { locale: string; token: string }) => {
  const [open, setOpen] = useState(false);
  const [adData, setAdData] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const pathName = usePathname();
  const router = useRouter();
  console.log(pathName);
  const { id } = useParams();
  console.log("params id", id);
  const t =useTranslations("myAds");

  const { data, isLoading } = useQuery({
    queryKey: ["ads", id],
    queryFn: () =>
      apiServiceCall({
        url: `ads/${id}`,
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
        },
      }),
  });
  const singleAds = data?.data?.data?.item || [];
  const user = singleAds?.user || {};
  console.log("singleAds", singleAds);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) =>
      apiServiceCall({
        url: `ads/${id}`,
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }),

    onError: (error: any) => {
      toast.error(error?.data?.message || "Unable to delete");
    },

    onSuccess: (data) => {
      console.log("Deleted data:esdvsf", data);
      toast.success(data?.data?.message || "Deleted successfully");
      router.push(`/${locale}/my-ads`);

      // Optionally: refetch ads list here
    },
  });

  useEffect(() => {
    if (isPending) {
      toast.loading("Deleting...", {
        toastId: "loadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loadingToast");
    }
  }, [isPending]);

  if (isLoading) return <Loading />;
  return (
    <Container className=" mt-[100px] lg:!mt-[180px] grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-5 ">
        <Gallary
          pathName={pathName}
          activeIndex={activeIndex}
          open={open}
          items={[singleAds]}
          setOpen={setOpen}
        />  
        <Card
          //   key={singleAds.id}
        
          id={singleAds.id}
          userId={user?.id}
          setOpen={setOpen}
          setAdData={setAdData}
          setActiveIndex={setActiveIndex}
          image={singleAds.image}
          // name={user?.name}
          is_verified={user?.verified}
          //   date={singleAds?.started_at}
          // category={singleAds?.category}
          //   desc={singleAds?.description_data?.[locale]}
          //   rating={user?.avg_rate}
          // personImage={user?.image}
          is_video={singleAds?.is_video}
          is_audio={singleAds?.is_audio}
          locally={singleAds?.locally ? t("local") : ""}
        />
      </div>

      <div className="col-span-12 md:col-span-7 ">
        <div className="flex items-start justify-between">
          <UserData user={user} />
          <StatusCard accepted={singleAds?.accepted} locale={locale} />
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2 mt-[22px]">
          <DateCard started_at={singleAds?.started_at} locale={locale}/>
          <DateCard finished_at={singleAds?.finished_at} locale={locale}/>
          {singleAds?.accepted === "accepted" && <PDF pdf={singleAds?.pdf} />}
        </div>
        <p className="text-[18px] text-[#333C52] font-bold mt-[32px] w-full lg:w-[65%]">
          {singleAds?.title_data?.[locale]}
        </p>
        <p className="text-[16px] text-[#333C52] font-normal mt-[22px] w-full lg:w-[65%]">
          {singleAds?.description_data?.[locale]}
        </p>
        <p className="text-[15px] text-[#2EA044] font-normal mt-[32px] w-full lg:w-[65%]">
          {singleAds?.category}
        </p>

        {singleAds?.accepted === "accepted" && !singleAds?.is_published && (
          <Payment id={singleAds.id} total={singleAds?.total} subtotal={singleAds?.subtotal} />
        )}
        {singleAds?.accepted === "suspended" && (
          <DeleteAndEditAds id={singleAds.id} mutate={mutate} locale={locale} />
        )}
        {singleAds?.accepted === "refused" && (
          <RefusedAds locale={locale} reason={singleAds?.refused_notes} />
        )}
      </div>
    </Container>
  );
};

export default MyAdsByID;
