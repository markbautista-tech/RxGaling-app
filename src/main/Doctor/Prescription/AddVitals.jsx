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
import addVitalSigns from "@/utils/data/add/addVitalSigns";
import { updateStart } from "@/utils/data/update/updateAppoitnmentTime";

const AddVitals = ({ patientid, userid, clinicid }) => {
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
  const [vLoading, setVLoading] = useState(false);

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const bmi = (weight / (height / 100) ** 2).toFixed(2);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVLoading(true);

    const vitals_data = {
      patient_id: patientid,
      doctor_id: userid,
      clinic_id: clinicid,
      sbp: formData.sbp,
      dbp: formData.dbp,
      cr: formData.cr,
      rr: formData.rr,
      temperature: formData.temperature,
      o2_stat: formData.o2Stat,
      weight: formData.weight,
      height: formData.height,
      bmi: formData.bmi,
      bmi_interpretation: formData.bmiInterpretation,
    };

    const response = await addVitalSigns(vitals_data);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Vitals submitted successfully!");
      setVLoading(false);

      setFormData({
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
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-auto text-sm text-left p-2 rounded-md hover:bg-secondary border border-primary">
        Add Vitals
      </DialogTrigger>
      <DialogContent className="lg:w-[800px] pb-20 lg:pb-10">
        <DialogHeader className="text-left">
          <DialogTitle>Add Vital Signs</DialogTitle>
          <DialogDescription className="py-2 flex flex-col"></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto no-scrollbar lg:px-3">
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
                {vLoading ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddVitals;
