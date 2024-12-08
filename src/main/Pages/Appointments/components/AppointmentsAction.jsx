import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import AddVitals from "@/main/Doctor/Prescription/AddVitals";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddSOAPNote from "@/main/Doctor/Prescription/AddSOAPNote";
import AddPrescription from "@/main/Doctor/Prescription/AddPrescription";
import { Separator } from "@/components/ui/separator";
import ViewRecords from "./ViewRecords";

const AppointmentsAction = ({ patient }) => {
  const status = [
    "Cancel Appointment",
    "Skipped Appointment",
    "In Progress",
    "Completed",
  ];
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <SlOptions />
        </PopoverTrigger>
        <PopoverContent className="w-52 p-2 space-y-1">
          <AddVitals patient={patient} />
          <AddSOAPNote patient={patient} />
          <AddPrescription patient={patient} />
          <ViewRecords patient={patient} />
          <Separator />
          {status.map((stat, id) => (
            <div
              key={id}
              className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary cursor-pointer text-gray-700"
            >
              {stat}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AppointmentsAction;
