import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PatientHeader = () => {
  return (
    <>
      <div className="py-7 z-[100]">
        <div className="flex items-center gap-2 lg:gap-5">
          <div>
            <Avatar className="w-14 h-14 lg:w-20 lg:h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span className="text-xl lg:text-2xl font-bold">
              Bautista, Ray Mark R.
            </span>
            <div className="grid grid-flow-row lg:gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <span className="text-sm">Birthdate: </span>
              <span className="text-sm">Age: </span>
              <span className="text-sm">Gender: </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientHeader;
