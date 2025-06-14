"use client";
import Image from "next/image";
import TabsContent from "./TabsContent";
import Container from "../shared/formcomponents/Container";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import Loading from "../../../app/loading";
import Error from "../../../app/error";
import { useTranslations } from "next-intl";

const MyAdsPage = ({ locale, token }: { locale: string; token: string }) => {
  const [activeTab, setActiveTab] = useState("pending");
  const [page, setPage] = useState(1);
  const t = useTranslations("myAds");
  const tabs = [
    { id: "pending", label: t("pending") },
    { id: "accepted", label: t("accepted") },
    { id: "suspended", label: t("suspended") },
    { id: "refused", label: t("refused") },
    { id: "published", label: t("published") },
  ];

  const { data, refetch, isError, isFetched, error, isLoading } = useQuery({
    queryKey: ["ads", activeTab, page],
    queryFn: () =>
      apiServiceCall({
        url: `ads?is_owner=1&type=${activeTab}&page=${page}`,
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  console.log("data pending", data);

  const ads = data?.data?.data?.ads || [];
  const currentPage = data?.data?.pagination?.currentPage || 1;
  const totalPages = data?.data?.pagination?.lastPage || 1;

  const handleActiveTap = (id: string) => {
    setActiveTab(id);
    setPage(1);
  };

  {
    isError && <Error error={error} reset={refetch} />;
  }
  return (
    <Container className=" mt-[100px] lg:!mt-[180px]">
      <div>
        <div className="flex items-center gap-3">
          <Image src="/images/ads.svg" width={36} height={36} alt="ads" />
          <h2 className="text-[#9F7A32] font-bold text-[22px]">{t("title")}</h2>
        </div>
        <h2 className="text-sm font-normal text-[#9F7A32] mt-1">
          {t("subtitle")}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-12  gap-2 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={` h-[54px] text-sm font-normal rounded-[14px]  col-span-6 md:col-span-4 lg:col-span-2   ${
              activeTab === tab.id
                ? "bg-[#9F7A32] text-white"
                : "bg-[#f3f4f5] text-[#333C52]"
            }`}
            onClick={() => handleActiveTap(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-lg">
        {isLoading ? (
          <div className="flex items-center justify-center max-h-[400px] h-full">
            <Loading />
          </div>
        ) : (
          <>
{/* Pagination Controls */}
{totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 my-6">
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-[#f3f4f5] text-[#333C52] rounded disabled:opacity-50"
                >
                  {t("next")}
                </button>

                <span className="text-sm text-[#333] text-center">
                  {t("page")} {currentPage} {t("from")} {totalPages}
                </span>

                <button
                  disabled={currentPage === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-[#f3f4f5] text-[#333C52] rounded disabled:opacity-50"
                >
                  {t("prev")}
                </button>
              </div>
            )}
          {ads.length === 0 ? (
            <div className="w-full  flex flex-col gap-[14px] items-center justify-center max-h-[400px] h-full ">
              <Image src="/images/emptyAds.svg" width={148} height={148} alt="no-ads" />
              <p className="text-[#333C52] text-[16px]">{t("no-ads")}</p>
            </div>
          ): (

            <TabsContent activeTab={activeTab} data={ads} />

          )}
            
          </>
        )}
      </div>
    </Container>
  );
};

export default MyAdsPage;
