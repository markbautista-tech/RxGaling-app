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
import NewPrescription from "@/PDF/NewPrescription";
import { pdf } from "@react-pdf/renderer";

const PrescriptionCard = ({ patient, prescription }) => {
  const dateCreated = new Date(prescription[0].created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const patientName = `${patient[0].last_name}, ${patient[0].first_name} 
                  ${patient[0].middle_name} ${patient[0].suffix}`;

  const data = {
    date: dateCreated,
    name: patientName,
    gender: patient[0].gender,
    code: prescription[0].code,
    generic: prescription[0].generic_name,
    brand: prescription[0].brand_name,
    dosage: prescription[0].dosage,
    form: prescription[0].form,
    sig: prescription[0].sig,
    rem: prescription[0].remarks,
    quantity: prescription[0].quantity,
    age: patient[0].age,
  };

  const handleOpenInNewTab = () => {
    const pdfDoc = <NewPrescription data={data} />;
    pdf(pdfDoc)
      .toBlob()
      .then((pdfBlob) => {
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, "_blank"); // Opens in a new tab
      })
      .catch((err) => console.error("Error generating PDF:", err));
  };
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full bg-white text-sm text-left py-3 px-5 rounded-lg hover:bg-secondary shadow-md flex border justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-lg">Prescription</span>
          </div>
          <span>
            {new Date(prescription[0].created_at).toLocaleDateString("en-US", {
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
            <DialogDescription className="py-2 flex flex-col"></DialogDescription>
            <div>
              <Separator />
            </div>
          </DialogHeader>
          <div className="h-screen">
            <div className="flex justify-between">
              <div>
                <Label>Name:</Label>
                <span className="text-xs lg:text-sm">
                  {" "}
                  {patient[0].last_name}, {patient[0].first_name}{" "}
                  {patient[0].middle_name} {patient[0].suffix}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Label>Date:</Label>
                <span className="font-bold text-xs lg:text-sm">
                  {new Date(prescription[0].created_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-5">
              <span className="text-xs lg:text-sm font-bold">
                Prescription ID: {prescription[0].code}
              </span>
            </div>
            <div className="px-3 py-2">
              <FaPrescription className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex items-center justify-center gap-2 lg:gap-7 mt-7">
              <div className="flex flex-col ">
                <span className="font-bold text-xs">
                  {prescription[0].generic_name}
                  {` (${prescription[0].brand_name})`}
                  {` ${prescription[0].dosage}/${prescription[0].form}`}
                </span>
                <span className="text-xs lg:text-sm">
                  Sig: {prescription[0].sig}
                </span>
                <span className="text-xs lg:text-sm">
                  Remarks: {prescription[0].remarks}
                </span>
              </div>
              <div className="lg:ml-48 ml-7">
                <span className="text-xs lg:text-sm">
                  # {prescription[0].quantity}
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <Button onClick={() => handleOpenInNewTab()}>
                View and Print
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrescriptionCard;
