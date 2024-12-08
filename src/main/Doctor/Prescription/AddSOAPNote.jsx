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
import { Check, ChevronsUpDown } from "lucide-react";
import addSOAPNote from "@/utils/data/add/addSOAPNote";

const AddSOAPNote = ({ patient }) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [soapNote, setSoapNote] = useState({
    chiefComplaint: "",
    historyOfPresentIllness: "",
    objectiveRemarks: "",
    diagnosis: "",
    plan: "",
  });
  const [loading, setLoading] = useState(false);

  const handleDateSelect = (selectedDate) => {
    setSelected(selectedDate);
    setOpen(false);
  };

  const handleToday = () => {
    setSelected(new Date());
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSoapNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const soapNoteData = {
      appointment_id: patient.id,
      patient_id: patient.patient_id,
      doctor_id: patient.doctor_id,
      clinic_id: patient.clinic_id,
      chief_complaint: soapNote.chiefComplaint,
      history_of_illness: soapNote.historyOfPresentIllness,
      obj_remarks: soapNote.objectiveRemarks,
      diagnosis: soapNote.diagnosis,
      plan: soapNote.plan,
      follow_up_checkup: selected,
    };

    const response = await addSOAPNote(soapNoteData);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("SOAP Note submitted successfully!");
    }

    console.log(soapNoteData);

    setSoapNote({
      chiefComplaint: "",
      historyOfPresentIllness: "",
      objectiveRemarks: "",
      diagnosis: "",
      plan: "",
    });
    setSelected("");

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm text-left p-2 rounded-md hover:bg-secondary">
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
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                <Label>Schedule Follow Up Checkup:</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full lg:w-[280px] justify-start text-left font-normal ${
                        !selected ? "text-muted-foreground" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selected ? (
                        format(selected, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4">
                    <DayPicker
                      mode="single"
                      selected={selected}
                      onSelect={handleDateSelect}
                      showOutsideDays
                    />
                    <div className="text-right mt-2">
                      <Button variant="outline" onClick={handleToday}>
                        Today
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter className="mt-7">
              <Button type="submit" className="w-full lg:w-[250px]">
                {loading ? "Submitting..." : "Submit Soap Note"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSOAPNote;
