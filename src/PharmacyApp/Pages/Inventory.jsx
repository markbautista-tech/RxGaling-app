import ContentTitle from "@/main/PageContent/ContentTitle";
import React from "react";
import { Separator } from "@/components/ui/separator";

const Inventory = () => {
  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
        <ContentTitle title={"Medicine Inventory"} />
        <div className="relative flex ">
          <div className="flex items-center gap-2">
            <div className="">
              <div className="flex gap-3">
                {/* <PatientRegistration /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className="w-full" />
      <div>
        {/* <PatientTable /> */}
      </div>
    </>
  );
};

export default Inventory;
