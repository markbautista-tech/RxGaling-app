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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import useMedicines from "../hooks/useMedicines";
import { toast } from "sonner";
import useGetPrescriptions from "../hooks/useGetPrescriptions";
import addPrescription from "@/utils/data/add/addPrescription";
import { updateEndTime } from "@/utils/data/update/updateAppoitnmentTime";

const forms = [
  "Capsule",
  "Cream",
  "Gel",
  "Injection",
  "Ointment",
  "Patch",
  "Pill",
  "Solution",
  "Suspension",
  "Syrup",
  "Tablet",
];

const generateUniqueCode = (prescriptions) => {
  const currentYear = new Date().getFullYear();

  const generateCode = () => {
    const randomPart1 = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    const randomPart2 = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    return `${currentYear}-${randomPart1}-${randomPart2}`;
  };

  let newCode;
  let isUnique = false;

  while (!isUnique) {
    newCode = generateCode();
    isUnique = !prescriptions.some(
      (prescription) => prescription.code === newCode
    );
  }

  return newCode;
};

const AddPrescription = ({ patient }) => {
  const { prescriptions: rawPrescriptions } = useGetPrescriptions();
  const { medicines: rawMedicines, medLoading } = useMedicines();

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
  const [searchQuery, setSearchQuery] = useState("");
  const medicines = Array.isArray(rawMedicines) ? rawMedicines : [];
  const prescriptions = Array.isArray(rawPrescriptions) ? rawMedicines : [];
  const newPrescriptionCode = generateUniqueCode(prescriptions);

  const filteredMedicines = medicines.filter((med) =>
    med.generic_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medication = {
      code: newPrescriptionCode,
      appointment_id: patient.id,
      patient_id: patient.patient_id,
      doctor_id: patient.doctor_id,
      clinic_id: patient.clinic_id,
      generic_name: formData.genericName,
      brand_name: formData.brandName,
      dosage: formData.dosage,
      quantity: formData.quantity,
      form: formData.form,
      sig: formData.sig,
      start_day: formData.startDate ? formData.startDate : null,
      end_day: formData.endDate ? formData.endDate : null,
    };

    console.log("Submitted Prescription:", medication);

    const response = await addPrescription(medication);

    if (response.error) {
      toast.error(response.error);
    } else {
      await updateEndTime(patient.id);
      toast.success("Prescription submitted successfully!");
    }

    setFormData({
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
  };

  const handleMedicineSelect = (med) => {
    setFormData((prev) => ({
      ...prev,
      genericName: med.generic_name,
      brandName: med.brand_name,
      dosage: med.dosage,
      form: med.form,
    }));
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
      <DialogTrigger className="text-sm text-left p-2 rounded-md hover:bg-secondary">
        Add Prescription
      </DialogTrigger>
      <DialogContent className="lg:w-[800px] bottom-10 overflow-y-auto max-h-[80vh]">
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
          <div className="flex justify-end">
            <Popover>
              <PopoverTrigger className="text-xs lg:text-sm">
                Search Medicines
              </PopoverTrigger>
              <PopoverContent
                className="w-[400px] p-3 overflow-y-auto no-scrollbar max-h-[80vh]"
                align="end"
              >
                <Input
                  placeholder="Search medicine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex flex-col space-y-2 mt-3">
                  {filteredMedicines.length > 0 ? (
                    filteredMedicines.map((med, index) => (
                      <div
                        key={index}
                        className="shadow-md rounded-md hover:bg-secondary py-3 px-2 flex flex-col cursor-pointer border"
                        onClick={() => handleMedicineSelect(med)}
                      >
                        <div className="flex justify-between">
                          <span className="text-">{med.generic_name}</span>
                          <span className="text-sm">{med.form}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex gap-3">
                            <span className="text-xs text-gray-500">
                              {med.brand_name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {med.dosage}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {`# ${med.quantity}`}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No medicines found.</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
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
                    {forms.map((form, id) => (
                      <SelectItem key={id} value={form}>
                        {form}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
