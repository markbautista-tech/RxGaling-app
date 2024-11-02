import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContentTitle from "@/main/PageContent/ContentTitle";
import React from "react";
import PatientHeader from "../components/PatientHeader";
import { IoClose } from "react-icons/io5";

const AddVitals = () => {
  return (
    <>
      <div className="p-5">
        <div className="w-full bg-white border-b shadow-md fixed top-0 left-0 px-8 lg:px-10">
          <PatientHeader />
        </div>

        <div className="mt-40 ">
          <div className="lg:pb-10 pb-5 lg:px-10 flex items-center justify-between">
            <ContentTitle title={"Add Vitals"} />
            <IoClose className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="lg:px-[300px]">
            <div className="bg-gray-300 lg:max-w-[100%] h-fit rounded-md lg:p-10 p-5 shadow-lg lg:flex justify-center">
              <form>
                <div className="lg:space-y-5">
                  <div className="grid grid-flow-row gap-3 lg:gap-24 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label className="text-lg">SBP:</Label>
                      <Input type="number" className="lg:w-[250px]" />
                    </div>
                    <div>
                      <Label className="text-lg">DBP:</Label>
                      <Input type="number" className="lg:w-[250px]" />
                    </div>
                  </div>
                  <div className="grid grid-flow-row gap-3 lg:gap-24 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label className="text-lg">CR: {"(bpm)"}</Label>
                      <Input type="number" className="lg:w-[250px]" />
                    </div>
                    <div>
                      <Label className="text-lg">RR: {"(cpm)"}</Label>
                      <Input type="number" className="lg:w-[250px]" />
                    </div>
                  </div>
                  <div className="grid grid-flow-row gap-3 lg:gap-24 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label className="text-lg">Temperature: {"(°C)"}</Label>
                      <Input type="number" className="lg:w-[250px]" />
                    </div>
                    <div>
                      <Label className="text-lg">O2 Stat: {"(%)"}</Label>
                      <Input type="number" className="lg:w-[250px]" />
                    </div>
                  </div>
                  <div className="grid grid-flow-row gap-3 lg:gap-24 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label className="text-lg">Weight: {"(kg)"}</Label>
                      <Input type="number" className="lg:w-[250px]" />
                    </div>
                    <div>
                      <Label className="text-lg">Height: {"(cm)"}</Label>
                      <Input type="number" className="lg:w-[250px]" />
                    </div>
                  </div>
                  <div className="grid grid-flow-row gap-3 lg:gap-24 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label className="text-lg">
                        Body Mass Index: {"(kg/m²)"}
                      </Label>
                      <Input type="number" readOnly className="lg:w-[250px]" />
                    </div>
                    <div>
                      <Label className="text-lg">BMI Interpretation:</Label>
                      <Input type="text" readOnly className="lg:w-[250px]" />
                    </div>
                  </div>
                </div>

                <div className="lg:flex justify-end pt-8">
                  <Button className="w-full lg:w-[300px] text-lg font-bold shadow-md">
                    ADD
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVitals;
