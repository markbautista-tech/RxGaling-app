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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import addSOAPNote from "@/utils/data/add/addSOAPNote"; // You can replace this with your actual function to handle the data.
import addMedicalCertificate from "@/utils/data/add/addMedicalCertificate";

const AddMedicalCertidicate = ({ patient }) => {
  const [date, setDate] = useState("");
  const [clinicalImpression, setClinicalImpression] = useState("");
  const [daysNeeded, setDaysNeeded] = useState(0);
  const [recommendations, setRecommendations] = useState("");
  const [disclaimer, setDisclaimer] = useState(
    "This certificate is being issued upon the request of the above-mentioned for whatever purpose it may serve, except those of a medico-legal nature."
  );

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Collect form data
    const certificateData = {
      patient_id: patient.patient_id,
      doctor_id: patient.doctor_id,
      appointment_id: patient.id,
      name: `${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${patient.patients?.middle_name.toUpperCase()}`,
      age: patient.patients?.age || "",
      consulted_on: date,
      clinical_impression: clinicalImpression,
      days_needed: daysNeeded,
      recommendation: recommendations,
      disclaimer,
    };

    const response = await addMedicalCertificate(certificateData);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Medical Certificate Added Successfully");
    }

    setDate("");
    setClinicalImpression("");
    setDaysNeeded(0);
    setRecommendations("");

    console.log(certificateData);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm text-left p-2 rounded-md hover:bg-secondary">
        Medical Certificate
      </DialogTrigger>
      <DialogContent className="lg:w-full">
        <DialogHeader>
          <DialogTitle>Medical Certificate</DialogTitle>
          <DialogDescription className="py-2 flex flex-col">
            {/* Patient's name and age (optional) */}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto no-scrollbar lg:px-3">
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div className="flex flex-col lg:flex-row gap-3">
                <p>
                  This is to certify that{" "}
                  <b>
                    {patient.patients?.last_name.toUpperCase()},{" "}
                    {patient.patients?.first_name.toUpperCase()}{" "}
                    {patient.patients?.middle_name.toUpperCase()}
                    {", "} {patient.patients?.suffix.toUpperCase() || ""}{" "}
                  </b>
                  {patient.patients?.age || ""} years old, consulted on
                </p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-100 p-1 rounded-md shadow-sm"
                />
                <p>with the following clinical impression</p>
              </div>
              <Textarea
                className="bg-gray-100"
                value={clinicalImpression}
                onChange={(e) => setClinicalImpression(e.target.value)}
              />
              <div className="flex gap-3 items-center">
                <p>And would need medical attention for</p>
                <Input
                  type="number"
                  className="bg-gray-100 w-14"
                  value={daysNeeded}
                  onChange={(e) => setDaysNeeded(e.target.value)}
                />
                <p>day(s) barring complications.</p>
              </div>
              <div>
                <p>Further Recommendations:</p>
                <Textarea
                  className="bg-gray-100"
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                />
              </div>
              <div>
                <p>Disclaimer:</p>
                <Textarea
                  className="bg-gray-100"
                  value={disclaimer}
                  onChange={(e) => setDisclaimer(e.target.value)}
                />
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

export default AddMedicalCertidicate;
