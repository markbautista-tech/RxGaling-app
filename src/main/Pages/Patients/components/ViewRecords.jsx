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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import VitalRecordCard from "./VitalRecordCard";

const ViewRecords = ({ patient }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary">
          View Records
        </DialogTrigger>
        <DialogContent className=" top-0 bottom-0 items-start">
          <DialogHeader>
            <DialogTitle>Medical Records</DialogTitle>
            <DialogDescription className="py-2 flex flex-col text-left">
              <span className="text-xl">{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${patient.patients?.middle_name.toUpperCase()} ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
              <span>{`${patient.patients?.age || ""} years old`}</span>
            </DialogDescription>
            <Separator />
            <div className="lg:px-32 flex flex-col items-start h-full">
              <VitalRecordCard patient={patient} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewRecords;
