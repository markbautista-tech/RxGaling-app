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

const MedicalCard = ({ patient, medCerts }) => {
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MedicalCard;
