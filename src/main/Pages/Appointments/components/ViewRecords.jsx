import React, { useEffect } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import VitalRecordCard from "./VitalRecordCard";
import getVitalSigns from "@/utils/data/fetch/getVitalSigns";
import { SkeletonNoCircle } from "@/main/components/SkeletonNoCircle";

const ViewRecords = ({ patient }) => {
  const [vitalSigns, setVitalSigns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchedVitals = async () => {
      setLoading(true);
      const vs = await getVitalSigns(patient.patient_id);
      setVitalSigns(vs);
      setLoading(false);
    };
    fetchedVitals();
  }, [patient.patient_id]);
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary">
          View Records
        </DialogTrigger>
        <DialogContent className=" bottom-0 items-start">
          <DialogHeader>
            <DialogTitle>Medical Records</DialogTitle>
            <DialogDescription className="py-2 flex flex-col">
              <span className="text-lg">{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${patient.patients?.middle_name.toUpperCase()} ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
              <span>{`${patient.patients?.age || ""} years old`}</span>
            </DialogDescription>
            <Separator />
            <div className="lg:px-32 flex flex-col gap-3 items-start h-full">
              {loading ? (
                <SkeletonNoCircle />
              ) : vitalSigns.length > 0 ? (
                vitalSigns.map((vitals, ids) => (
                  <VitalRecordCard
                    key={ids}
                    patient={patient}
                    vitalSigns={vitals}
                  />
                ))
              ) : (
                <p className="italic">No vital signs record</p>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewRecords;
