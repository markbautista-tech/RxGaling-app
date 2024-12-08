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
import getVitalSigns from "@/utils/data/fetch/getVitalSigns";

const VitalRecordCard = ({ patient, vitalSigns }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full text-sm text-left py-3 px-5 rounded-lg hover:bg-secondary shadow-md flex border justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-lg">Vital Signs</span>
            <span className="text-[16px]">
              {patient.clinics?.name.toUpperCase()}
            </span>
          </div>
          <span>
            {new Date(patient.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </DialogTrigger>
        <DialogContent className="w-[600px] items-start">
          <DialogHeader>
            <DialogTitle>Vital Signs</DialogTitle>
            <DialogDescription className="py-2 flex flex-col"></DialogDescription>
            <Separator />
          </DialogHeader>
          <div className="flex flex-col">
            <div>
              <div className="lg:space-y-5">
                <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                  <div>
                    <Label>SBP:</Label>
                    <Input
                      type="number"
                      name="sbp"
                      readOnly
                      value={vitalSigns.sbp}
                      className="bg-gray-200"
                    />
                  </div>
                  <div>
                    <Label>DBP:</Label>
                    <Input
                      type="number"
                      name="dbp"
                      readOnly
                      value={vitalSigns.dbp}
                      className="bg-gray-200"
                    />
                  </div>
                </div>
                <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                  <div>
                    <Label>CR: {"(bpm)"}</Label>
                    <Input
                      type="number"
                      name="cr"
                      readOnly
                      value={vitalSigns.cr}
                      className="bg-gray-200"
                    />
                  </div>
                  <div>
                    <Label>RR: {"(cpm)"}</Label>
                    <Input
                      type="number"
                      name="rr"
                      readOnly
                      value={vitalSigns.rr}
                      className="bg-gray-200"
                    />
                  </div>
                </div>
                <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                  <div>
                    <Label>Temperature: {"(°C)"}</Label>
                    <Input
                      type="number"
                      name="temperature"
                      readOnly
                      value={vitalSigns.temperature}
                      className="bg-gray-200"
                    />
                  </div>
                  <div>
                    <Label>O2 Stat: {"(%)"}</Label>
                    <Input
                      type="number"
                      name="o2Stat"
                      readOnly
                      value={vitalSigns.o2_stat}
                      className="bg-gray-200"
                    />
                  </div>
                </div>
                <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                  <div>
                    <Label>Weight: {"(kg)"}</Label>
                    <Input
                      type="number"
                      name="weight"
                      readOnly
                      value={vitalSigns.weight}
                      className="bg-gray-200"
                    />
                  </div>
                  <div>
                    <Label>Height: {"(cm)"}</Label>
                    <Input
                      type="number"
                      name="height"
                      readOnly
                      value={vitalSigns.height}
                      className="bg-gray-200"
                    />
                  </div>
                </div>
                <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                  <div>
                    <Label>Body Mass Index: {"(kg/m²)"}</Label>
                    <Input
                      type="number"
                      readOnly
                      value={vitalSigns.bmi}
                      className="bg-gray-200"
                    />
                  </div>
                  <div>
                    <Label>BMI Interpretation:</Label>
                    <Input
                      type="text"
                      readOnly
                      value={vitalSigns.bmi_interpretation}
                      className="bg-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VitalRecordCard;
