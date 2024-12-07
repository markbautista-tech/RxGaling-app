import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { toast } from "sonner";

const AddVitals = ({ patient }) => {
  const [formData, setFormData] = useState({
    sbp: "",
    dbp: "",
    cr: "",
    rr: "",
    temperature: "",
    o2Stat: "",
    weight: "",
    height: "",
    bmi: "",
    bmiInterpretation: "",
  });

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const bmi = (weight / (height / 100) ** 2).toFixed(2); // Height in cm to meters
      let interpretation = "";

      if (bmi < 18.5) interpretation = "Underweight";
      else if (bmi < 24.9) interpretation = "Normal weight";
      else if (bmi < 29.9) interpretation = "Overweight";
      else interpretation = "Obesity";

      return { bmi, interpretation };
    }
    return { bmi: "", interpretation: "" };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Update BMI if weight or height changes
      if (name === "weight" || name === "height") {
        const { bmi, interpretation } = calculateBMI(
          updatedFormData.weight,
          updatedFormData.height
        );
        updatedFormData.bmi = bmi;
        updatedFormData.bmiInterpretation = interpretation;
      }

      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData, patient.patient_id);

    toast.success("Vitals submitted successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary">
        Add Vitals
      </DialogTrigger>
      <DialogContent className="lg:w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Vital Signs</DialogTitle>
          <DialogDescription className="py-2 flex flex-col">
            <span>{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${patient.patients?.middle_name.toUpperCase()} ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
            <span>{`${patient.patients?.age || ""} years old`}</span>
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="lg:space-y-5">
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div>
                  <Label>SBP:</Label>
                  <Input
                    type="number"
                    name="sbp"
                    value={formData.sbp}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>DBP:</Label>
                  <Input
                    type="number"
                    name="dbp"
                    value={formData.dbp}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div>
                  <Label>CR: {"(bpm)"}</Label>
                  <Input
                    type="number"
                    name="cr"
                    value={formData.cr}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>RR: {"(cpm)"}</Label>
                  <Input
                    type="number"
                    name="rr"
                    value={formData.rr}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div>
                  <Label>Temperature: {"(°C)"}</Label>
                  <Input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>O2 Stat: {"(%)"}</Label>
                  <Input
                    type="number"
                    name="o2Stat"
                    value={formData.o2Stat}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div>
                  <Label>Weight: {"(kg)"}</Label>
                  <Input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Height: {"(cm)"}</Label>
                  <Input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div>
                  <Label>Body Mass Index: {"(kg/m²)"}</Label>
                  <Input type="number" readOnly value={formData.bmi} />
                </div>
                <div>
                  <Label>BMI Interpretation:</Label>
                  <Input
                    type="text"
                    readOnly
                    value={formData.bmiInterpretation}
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

export default AddVitals;
