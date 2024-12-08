import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IoIosAddCircle } from "react-icons/io";

const ManageBilling = ({ patient }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary">
          Manage Billing
        </DialogTrigger>
        <DialogContent className="w-[850px] text-left">
          <DialogHeader>
            <DialogTitle>Manage Patient Billings</DialogTitle>
            <DialogDescription className="py-2 flex flex-col">
              <span>{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${patient.patients?.middle_name.toUpperCase()} ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
              <span>{`${patient.patients?.age || ""} years old`}</span>
            </DialogDescription>
            <div className="flex justify-end items-center">
              <IoIosAddCircle className="w-10 h-10" />
            </div>
          </DialogHeader>
          <Separator />
          <div>
            <div className="bg-gray-200 w-full">
              <span>{}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageBilling;
