import React, { useState } from "react";
import ReusableSheet from "@/components/global/reusable-sheet";
import useSheetStore from "@/stores/sheet-store";
import CampaignTypeStore from "@/stores/campaign-type";
import SingleProduct from "@/components/campaigns/single-product/single-product";
import MultiProduct from "@/components/campaigns/multi-product/multi-product";
import Poll from "./poll/poll";

const CampaignSheet = ({ id, title, description }: any) => {
  const { openSheet, close } = useSheetStore();
  const multiProductComponents = ["Quizzes", "Contest", "FeedbackForm", "Poll"];

  return (
    <ReusableSheet
      open={
        !!(
          openSheet === id ||
          (openSheet &&
            multiProductComponents.includes(openSheet) &&
            id === "MultiProduct")
        )
      }
      onOpenChange={close}
      title={title}
      description={description}
    >
      {openSheet === "SingleProduct" && <SingleProduct />}
      {openSheet === "MultiProduct" && <MultiProduct />}
      {openSheet === "Quizzes" && <div>Quizzes</div>}
      {openSheet === "Contest" && <div>Contest</div>}
      {openSheet === "FeedbackForm" && <div>FeedbackForm</div>}
      {openSheet === "Poll" && <Poll />}
    </ReusableSheet>
  );
};

export default CampaignSheet;
