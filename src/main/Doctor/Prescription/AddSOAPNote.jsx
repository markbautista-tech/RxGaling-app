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

const AddSOAPNote = ({ patient }) => {
  const [soapNote, setSoapNote] = useState({
    chiefComplaint: "",
    historyOfPresentIllness: "",
    objectiveRemarks: "",
    diagnosis: "",
    plan: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSoapNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted SOAP Note:", soapNote);
    // Add your API call or submission logic here
    alert("SOAP Note submitted successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary">
        Add SOAP Note
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
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <Label className="text-gray-500">SUBJECTIVE</Label>
                <div>
                  <Label>Chief Complaint:</Label>
                  <Textarea
                    className="shadow-sm bg-gray-100"
                    name="chiefComplaint"
                    value={soapNote.chiefComplaint}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>History of Present Illness:</Label>
                  <Textarea
                    className="shadow-sm bg-gray-100"
                    name="historyOfPresentIllness"
                    value={soapNote.historyOfPresentIllness}
                    onChange={handleInputChange}
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
                    value={soapNote.objectiveRemarks}
                    onChange={handleInputChange}
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
                    value={soapNote.diagnosis}
                    onChange={handleInputChange}
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
                    value={soapNote.plan}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-7">
              <Button type="submit" className="w-full lg:w-[250px]">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSOAPNote;
