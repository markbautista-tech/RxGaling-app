import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useClinicRegForm from "../hooks/useClinicRegForm";
import ClinicAddress from "./ClinicAddress";
import ClinicFiles from "./ClinicFiles";

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
                {errors.clinic_name && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.clinic_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-3 lg:space-y-5">
                <div>
                  <ClinicAddress
                    register={register}
                    errors={errors}
                    control={control}
                  />
                </div>
                <ClinicFiles register={register} errors={errors} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicDetailsForm;
