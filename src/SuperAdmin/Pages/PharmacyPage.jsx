import { Separator } from "@/components/ui/separator";
import ContentTitle from "@/main/PageContent/ContentTitle";
import React from "react";
import PharmacyRequest from "../components/PharmacyRequest";

const PharmacyPage = () => {
  return (
    <>
      <div className="">
        <div>
          <div className="px-6 pt-4 lg:px-10 flex justify-between items-center">
            <div>
              <ContentTitle title={"Pharmacy"} />
            </div>
            <div>
              <PharmacyRequest />
            </div>
          </div>
        </div>
        <div className="my-3 px-4">
          <Separator orientation="horizontal" className="w-full" />
        </div>
        <div className="flex justify-center gap-10 p-5 ">
          <div className="w-full"></div>
        </div>
      </div>
    </>
  );
};

export default PharmacyPage;
