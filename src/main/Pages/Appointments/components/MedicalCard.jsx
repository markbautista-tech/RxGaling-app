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
import { pdf } from "@react-pdf/renderer";
import MedicalCertificates from "@/PDF/MedicalCertifcate";

const MedicalCard = ({ patient, medCerts }) => {
  const dateCreated = new Date(medCerts.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const patientName = `${patient[0].last_name}, ${patient[0].first_name} ${patient[0].middle_name[0]} ${patient[0].suffix}`;

  const data = {
    date: dateCreated,
    name: patientName,
    age: patient[0].age,
    impression: medCerts[0].clinical_impression,
    recommendation: medCerts[0].recommendation,
    consulted_on: medCerts[0].consulted_on,
    days_needed: medCerts[0].days_needed,
    disclaimer: medCerts[0].disclaimer,
  };

  const handleOpenInNewTab = () => {
    const pdfDoc = <MedicalCertificates data={data} />;
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
            <span className="font-bold lg:text-lg">Medical Certificate</span>
          </div>
          <span>
            {new Date(medCerts[0].created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </DialogTrigger>
        <DialogContent className="lg:w-[800px] bottom-10 overflow-y-auto max-h-[80vh]">
          <DialogHeader className="text-left">
            <DialogTitle>
              <span>Medical Certificate</span>
            </DialogTitle>
            <DialogDescription className="py-2 flex flex-col"></DialogDescription>
            <div>
              <Separator />
            </div>
            <div>
              <p>
                This is to certify that{" "}
                <b>
                  {patient[0]?.last_name.toUpperCase()},{" "}
                  {patient[0].first_name.toUpperCase()}{" "}
                  {patient[0]?.middle_name.toUpperCase()}{" "}
                  {patient[0]?.suffix.toUpperCase() || ""}
                  {" ,"}
                </b>
                {patient[0].age} years old, consulted on{" "}
                <b>{medCerts[0].consulted_on}</b> with the following clinical
                impression{" "}
              </p>
              <Textarea
                defaultValue={medCerts[0].clinical_impression}
                readOnly
                className="my-2"
              />
              <p>
                And would need medical attention for{" "}
                <b>{medCerts[0].days_needed}</b> day(s) barring complications.
              </p>
              <p></p>
              <span className="mt-3">Further Recommendations: </span>
              <Textarea
                defaultValue={medCerts[0].recommendation}
                readOnly
                className="my-2"
              />
              <p>Dsclaimer:</p>
              <p className="italic text-xs">{medCerts[0].disclaimer}</p>
            </div>
            <div className="flex justify-end mt-5">
              <Button onClick={() => handleOpenInNewTab()}>
                View and Print
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MedicalCard;
