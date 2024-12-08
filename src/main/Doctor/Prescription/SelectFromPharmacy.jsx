import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import useMedicines from "../hooks/useMedicines";

const SelectFromPharmacy = () => {
  const { medicines: rawMedicines, medLoading } = useMedicines();

  const medicines = Array.isArray(rawMedicines) ? rawMedicines : [];

  return (
    <>
      <Popover>
        <PopoverTrigger className="text-xs lg:text-sm">
          Search Medicines
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-3" align="end">
          <Input placeholder="Search medicine..." />
          <div className="flex flex-col space-y-2 overflow-y-auto mt-3 h-[200px] no-scrollbar">
            {medicines.length > 0 ? (
              medicines.map((meds, index) => (
                <div
                  key={index}
                  className="shadow-md rounded-md hover:bg-secondary py-3 px-2 flex flex-col cursor-pointer border"
                >
                  <span className="text-sm">{meds.generic_name}</span>
                  <span className="text-xs">{meds.brand_name}</span>
                </div>
              ))
            ) : (
              <p>No medicines found.</p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SelectFromPharmacy;
