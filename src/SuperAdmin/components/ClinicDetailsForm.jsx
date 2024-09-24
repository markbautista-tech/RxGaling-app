import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useClinicRegForm from "../hooks/useClinicRegForm";
import ClinicAddress from "./ClinicAddress";

const ClinicDetailsForm = ({ register, errors, control }) => {
  return (
    <>
      <div>
        <div>
          <div className="p-5 lg:px-20">
            <div className="pb-3">
              <p className="font-bold text-md lg:text-xl">Clinic Details</p>
            </div>
            <div className="space-y-3 lg:space-y-5">
              <div>
                <Label>Clinic Name</Label>
                <Input {...register("clinic_name")} type="text" />
              </div>
              <div className="space-y-3 lg:space-y-5">
                <div>
                  <ClinicAddress
                    register={register}
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className="space-y-3 lg:space-y-5">
                  <p className="italic text-sm lg:text-md">
                    Please upload pictures for the following:
                  </p>
                  <div>
                    <Label>Mayor's Permit</Label>
                    <Input {...register("permit")} type="file" />
                  </div>
                  <div>
                    <Label>BIR</Label>
                    <Input {...register("bir")} type="file" />
                  </div>
                  <div>
                    <Label>Clinic Picture</Label>
                    <Input {...register("clinic_pic")} type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicDetailsForm;
