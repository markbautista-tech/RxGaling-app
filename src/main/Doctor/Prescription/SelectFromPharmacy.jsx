import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SelectFromPharmacy = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger className="text-xs lg:text-sm">
          Search Medicines
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-2"></PopoverContent>
      </Popover>
    </>
  );
};

export default SelectFromPharmacy;
