import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ViewRecords = ({ patient }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary">
          View Records
        </DialogTrigger>
        <DialogContent className="lg:w-[800px]">
          <DialogHeader>
            <DialogTitle>Medical Records</DialogTitle>
            <DialogDescription className="py-2 flex flex-col">
              <span>{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${patient.patients?.middle_name.toUpperCase()} ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
              <span>{`${patient.patients?.age || ""} years old`}</span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewRecords;
