import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useClinicRegForm from "../hooks/useClinicRegForm";
import ClinicAddress from "./ClinicAddress";
import { useFileSchema } from "../schema/fileShema";

const ClinicDetailsForm = ({ register, errors, control }) => {
  const { handleBIRUpload, handlePermitUpload, handleClinicPicUpload } =
    useFileSchema();

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
                <div className="space-y-3 lg:space-y-5">
                  <p className="italic text-sm lg:text-md">
                    Please upload pictures for the following:
                  </p>
                  <div>
                    <Label>Mayor's Permit</Label>
                    <Input
                      ref={register}
                      name="permit"
                      type="file"
                      onChange={handlePermitUpload}
                    />
                    {errors.permit && (
                      <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                        {errors.permit.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>BIR</Label>
                    <Input
                      ref={register}
                      name="bir"
                      type="file"
                      onChange={handleBIRUpload}
                    />
                    {errors.bir && (
                      <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                        {errors.bir.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Clinic Picture</Label>
                    <Input
                      ref={register}
                      name="clinic_pic"
                      type="file"
                      onChange={handleClinicPicUpload}
                    />
                    {errors.clinic_pic && (
                      <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                        {errors.clinic_pic.message}
                      </p>
                    )}
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
