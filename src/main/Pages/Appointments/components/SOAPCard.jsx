import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const SOAPCard = ({ patient, soaps }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full text-sm text-left py-3 px-5 rounded-lg hover:bg-secondary shadow-md flex border justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-lg">SOAP Note</span>
          <span className="text-[16px]">
            {patient.clinics?.name.toUpperCase()}
          </span>
        </div>
        <span>
          {new Date(patient.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </DialogTrigger>
      <DialogContent className="lg:w-[800px] bottom-10">
        <DialogHeader>
          <DialogTitle>SOAP Note</DialogTitle>
          <DialogDescription className="py-2 flex flex-col">
            <span>{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${patient.patients?.middle_name.toUpperCase()} ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
            <span>{`${patient.patients?.age || ""} years old`}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto no-scrollbar lg:px-3">
          <form>
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <Label className="text-gray-500">SUBJECTIVE</Label>
                <div>
                  <Label>Chief Complaint:</Label>
                  <Textarea
                    className="shadow-sm bg-gray-100"
                    name="chiefComplaint"
                    value={soaps.chief_complaint || ""}
                    readOnly
                  />
                </div>
                <div>
                  <Label>History of Present Illness:</Label>
                  <Textarea
                    className="shadow-sm bg-gray-100"
                    name="historyOfPresentIllness"
                    value={soaps.history_of_illness || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-gray-500">OBJECTIVE</Label>
                <div>
                  <Label>Remarks:</Label>
                  <Textarea
                    className="shadow-sm bg-gray-100"
                    name="objectiveRemarks"
                    value={soaps.obj_remarks || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-gray-500">ASSESSMENT</Label>
                <div>
                  <Label>Diagnosis:</Label>
                  <Textarea
                    className="shadow-sm bg-gray-100"
                    name="diagnosis"
                    value={soaps.diagnosis || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-gray-500">PLAN</Label>
                <div>
                  <Label>Plan:</Label>
                  <Textarea
                    className="shadow-sm bg-gray-100"
                    name="plan"
                    value={soaps.plan || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                <Label>Schedule Follow Up Checkup:</Label>
                <Input value={soaps.follow_up_checkup || ""} readOnly />
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SOAPCard;
