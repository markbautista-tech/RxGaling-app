import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ContentTitle from "@/main/PageContent/ContentTitle";
import React from "react";

const MedicineDispense = () => {
  return (
    <>
      <div>
        <div className="px-6 pt-4 lg:px-10 flex justify-between items-center">
          <ContentTitle title={"Medicine Dispenser"} />
        </div>
        <div className="py-3 lg:py-5 px-4 lg:px-6">
          <Separator orientation="horizontal" />
        </div>
        <div className="px-4 pt-4 lg:px-10">
          <Input />
        </div>
      </div>
    </>
  );
};

export default MedicineDispense;
