import React from "react";
import PatientHeader from "../components/PatientHeader";
import ContentTitle from "@/main/PageContent/ContentTitle";
import { IoClose } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectMedForm from "../components/SelectMedForm";
import { Textarea } from "@/components/ui/textarea";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { SelectDate } from "../components/SelectDate";
import { Button } from "@/components/ui/button";

const AddPrescription = () => {
  return (
    <>
      <div className="p-5">
        <div className="w-full bg-white border-b shadow-md fixed top-0 left-0 px-8 lg:px-10">
          <PatientHeader />
        </div>
        <div className="mt-40 ">
          <div className="lg:pb-10 pb-5 lg:px-10 flex items-center justify-between">
            <ContentTitle title={"Add Prescription"} />
            <IoClose className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="lg:px-[200px]">
            <div className="border lg:max-w-[100%] h-fit rounded-md lg:p-10 p-5 shadow-lg">
              <div className="pb-5">
                <span className="font-semibold text-lg">ADD MEDICINE</span>
              </div>
              <form className="space-y-3">
                <div>
                  <Label>GENERIC NAME:</Label>
                  <Input type="text" placeholder="Generic Name" />
                </div>
                <div>
                  <Label>BRAND NAME:</Label>
                  <Input type="text" placeholder="Brand Name" />
                </div>
                <div className="grid grid-flow-row space-y-3 lg:gap-24 lg:grid-flow-col w-full pb-3 lg:p-0">
                  <div>
                    <Label>DOSAGE:</Label>
                    <Input type="text" placeholder="ex. 500mg" />
                  </div>
                  <div>
                    <Label>QUANTITY:</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder=""
                        className="lg:w-[250px]"
                      />
                      {/* <TiPlus className="w-7 h-7 cursor-pointer" />
                      <TiMinus className="w-7 h-7 cursor-pointer" /> */}
                    </div>
                  </div>
                </div>
                <div>
                  <SelectMedForm />
                </div>
                <div>
                  <Label>SIG:</Label>
                  <Textarea placeholder="Specific Instruction" />
                </div>
                <div>
                  <Label>DURATION:</Label>
                  <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div className="lg:flex items-center gap-5">
                      <Label>START:</Label>
                      <SelectDate />
                    </div>
                    <div className="lg:flex items-center gap-5">
                      <Label>END:</Label>
                      <SelectDate />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>REMARKS:</Label>
                  <Textarea placeholder="Remarks" />
                </div>

                <div className="lg:flex justify-end pt-8">
                  <Button className="w-full lg:w-[300px] text-lg font-bold shadow-md">
                    ADD MEDICATION
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

export default AddPrescription;
