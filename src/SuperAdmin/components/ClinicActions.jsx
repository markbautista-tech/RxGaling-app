import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PiDotsThreeCircle } from "react-icons/pi";

const ClinicActions = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <PiDotsThreeCircle className="w-6 h-6 lg:w-6 lg:h-6 hover:text-primary" />
        </PopoverTrigger>
        <PopoverContent className="max-w-fit">
          <div className="flex flex-col gap-3">
            <Button>View Details</Button>
            <Button variant="destructive">Archive</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ClinicActions;
