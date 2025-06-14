import React from "react";
import PendingAds from "./PendingAds";
import AcceptedAds from "./AcceptedAds";
import SuspendedAds from "./SuspendedAds";
import RejectedAds from "./RejectedAds";
import PublishedAds from "./PublishedAds";

const TabsContent = ({ activeTab, data }: { activeTab: string; data: any }) => {
  switch (activeTab) {
    case "pending":
      return <PendingAds data={data} />;
    case "accepted":
      return <AcceptedAds data={data} />;
    case "suspended":
      return <SuspendedAds data={data} />;
    case "refused":
      return <RejectedAds data={data} />;
    case "published":
      return <PublishedAds data={data} />;
    default:
      return null;
  }
};
export default TabsContent;
