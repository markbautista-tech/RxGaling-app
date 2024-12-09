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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { FaPrescription } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

const PrescriptionCard = ({ patient, prescription }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full text-sm text-left py-3 px-5 rounded-lg hover:bg-secondary shadow-md flex border justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-lg">Prescription</span>
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
        <DialogContent className="lg:w-[800px] bottom-10 overflow-y-auto max-h-[80vh]">
          <DialogHeader className="text-left">
            <DialogTitle>
              <span>Prescription</span>
            </DialogTitle>
            <DialogDescription className="py-2 flex flex-col">
              <span className="font-bold text-lg">{patient.clinics?.name}</span>
            </DialogDescription>
            <div>
              <Separator />
            </div>
          </DialogHeader>
          <div className="h-screen">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Label>Name:</Label>
                <span className="font-bold">{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${
                  patient.patients?.middle_name.toUpperCase() || ""
                } ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Label>Date:</Label>
                <span className="font-bold">{patient.appointment_date}</span>
              </div>
            </div>

            <div className="flex justify-end pt-5">
              <span className="text-sm font-bold">
                Prescription ID: {prescription.code}
              </span>
            </div>
            <div className="flex items-center gap-7 mt-7">
              <div className="p-3">
                <FaPrescription className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">
                  {prescription.generic_name}
                  {` (${prescription.brand_name})`}
                  {` ${prescription.dosage}/${prescription.form}`}
                </span>
                <span>Sig: {prescription.sig}</span>
                <span>Remarks: {prescription.remarks}</span>
              </div>
              <div className="ml-48">
                <span># {prescription.quantity}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrescriptionCard;
