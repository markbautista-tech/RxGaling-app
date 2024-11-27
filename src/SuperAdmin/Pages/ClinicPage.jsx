import ContentTitle from "@/main/PageContent/ContentTitle";
import React from "react";
import ClinicRequestCard from "../components/RequestCard";
import ClinicsTable from "../components/ClinicsTable";
import { Separator } from "@/components/ui/separator";

const ClinicPage = () => {
  return (
    <>
      <div className="">
        <div>
          <div className="px-6 pt-4 lg:px-10 flex justify-between items-center">
            <div>
              <ContentTitle title={"Clinics"} />
            </div>
            <div className="flex">
              <div className="flex justify-end">
                <div className="flex items-center"></div>
              </div>
              <ClinicRequestCard />
            </div>
          </div>
        </div>
        <div className="my-3 px-4">
          <Separator orientation="horizontal" className="w-full" />
        </div>
        <div className="flex justify-center gap-10 p-5 ">
          <div className="w-full">
            <ClinicsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicPage;
