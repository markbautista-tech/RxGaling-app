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
import SelectMedForm from "../components/SelectMedForm";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const AddPrescription = ({ patient }) => {
  const [formData, setFormData] = useState({
    genericName: "",
    brandName: "",
    dosage: "",
    quantity: "",
    form: "",
    sig: "",
    startDate: null,
    endDate: null,
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Prescription:", formData);
    alert("Prescription submitted successfully!");
  };

  const renderDatePicker = (label, field) => (
    <div className="lg:flex items-center gap-5">
      <Label>{label}:</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full lg:w-[280px] justify-start text-left font-normal ${
              !formData[field] ? "text-muted-foreground" : ""
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData[field]
              ? format(formData[field], "yyyy-MM-dd")
              : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <DayPicker
            mode="single"
            selected={formData[field]}
            onSelect={(date) => handleDateChange(field, date)}
            showOutsideDays
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary">
        Add Prescription
      </DialogTrigger>
      <DialogContent className="lg:w-[800px] bottom-10">
        <DialogHeader className="text-left">
          <DialogTitle>
            <span>Add Prescription</span>
          </DialogTitle>
          <DialogDescription className="py-2 flex flex-col">
            <span>{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${
              patient.patients?.middle_name.toUpperCase() || ""
            } ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
            <span>{`${patient.patients?.age || ""} years old`}</span>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto no-scrollbar lg:px-3"
        >
          <div className="space-y-5 text-left">
            <div>
              <Label>GENERIC NAME:</Label>
              <Input
                type="text"
                name="genericName"
                value={formData.genericName}
                onChange={handleInputChange}
                placeholder="Generic Name"
              />
            </div>
            <div>
              <Label>BRAND NAME:</Label>
              <Input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                placeholder="Brand Name"
              />
            </div>
            <div className="grid grid-flow-row lg:grid-flow-col gap-5">
              <div>
                <Label>DOSAGE:</Label>
                <Input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  placeholder="ex. 500mg"
                />
              </div>
              <div>
                <Label>QUANTITY:</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label>FORM:</Label>
              <Select
                onValueChange={(value) => handleSelectChange("form", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pill">Pill</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="capsule">Capsule</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <SelectMedForm />
            </div>
            <div>
              <Label>SIG:</Label>
              <Textarea
                name="sig"
                value={formData.sig}
                onChange={handleInputChange}
                placeholder="Specific Instruction"
              />
            </div>
            <div>
              <Label>DURATION:</Label>
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                {renderDatePicker("START", "startDate")}
                {renderDatePicker("END", "endDate")}
              </div>
            </div>
            <div>
              <Label>REMARKS:</Label>
              <Textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Remarks"
              />
            </div>
          </div>
          <DialogFooter className="mt-7">
            <Button type="submit" className="w-full lg:w-[250px]">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPrescription;
