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
import { useUser } from "@/context/UserContext";
import AddMedicalCertidicate from "@/main/Doctor/Prescription/AddMedicalCertificate";
import ManageBilling from "@/main/Doctor/Prescription/ManageBilling";
import ManageRecords from "./ManageRecords";

const AppointmentsAction = ({ patient }) => {
  const { role } = useUser();
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
          <SlOptions className="w-4 h-4" />
        </PopoverTrigger>
        <PopoverContent className="w-52 p-2 space-y-1">
          {(role === "Clinic Nurse" ||
            role === "Clinic Assistant" ||
            role === "Clinic Secretary") && <AddVitals patient={patient} />}

          {/* {role === "Doctor" && <AddSOAPNote patient={patient} />}
          {role === "Doctor" && <AddPrescription patient={patient} />} */}
          {role === "Doctor" && <ManageRecords patient={patient} />}

          {/* <AddMedicalCertidicate patient={patient} /> */}
          {/* <ViewRecords patient={patient} /> */}
          <ManageBilling patient={patient} />
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