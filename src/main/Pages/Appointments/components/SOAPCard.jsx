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
import { pdf } from "@react-pdf/renderer";
import SOAPNotes from "@/PDF/SOAPNotes";

const SOAPCard = ({ soaps, patient }) => {
  const dateCreated = new Date(soaps.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const patientName = `${patient[0].last_name}, ${patient[0].first_name} ${patient[0].middle_name[0]} ${patient[0].suffix}`;

  const data = {
    date: dateCreated,
    name: patientName,
    complaint: soaps.chief_complaint || "",
    history: soaps.history_of_illness || "",
    objRemarks: soaps.obj_remarks || "",
    diagnosis: soaps.diagnosis || "",
    plan: soaps.plan || "",
    follow_date: soaps.follow_up_checkup || "",
    gender: patient[0].gender,
    age: patient[0].age,
  };

  const handleOpenInNewTab = () => {
    const pdfDoc = <SOAPNotes data={data} />;
    pdf(pdfDoc)
      .toBlob()
      .then((pdfBlob) => {
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, "_blank"); // Opens in a new tab
      })
      .catch((err) => console.error("Error generating PDF:", err));
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full bg-white text-sm text-left py-3 px-5 rounded-lg hover:bg-secondary shadow-md flex border justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-lg">SOAP Note</span>
        </div>
        <span>
          {new Date(soaps.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </DialogTrigger>
      <DialogContent className="lg:w-[800px] bottom-10">
        <DialogHeader>
          <DialogTitle>SOAP Note</DialogTitle>
          <DialogDescription className="py-2 flex flex-col"></DialogDescription>
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
              <div className="flex justify-end mt-5">
                <Button onClick={() => handleOpenInNewTab()}>
                  View and Print
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SOAPCard;
