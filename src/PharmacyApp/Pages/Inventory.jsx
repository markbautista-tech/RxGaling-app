import ContentTitle from "@/main/PageContent/ContentTitle";
import React from "react";
import { Separator } from "@/components/ui/separator";
import MedicineTable from "../components/MedicineTable";
import AddMedicine from "../components/AddMedicine";

const Inventory = () => {
  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
        <div className="px-6 pt-4 lg:px-10 flex items-center justify-center">
          <div className="">
            <ContentTitle title={"Medicine Inventory"} />
          </div>
          <AddMedicine />
        </div>
      </div>
      <Separator orientation="horizontal" className="w-full" />
      <div className="w-full">
        <MedicineTable />
      </div>
    </>
  );
};

export default Inventory;
