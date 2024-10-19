import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFileSchema } from "../schema/fileShema";

const ClinicFiles = ({ register, errors }) => {
  const { handleBIRUpload, handlePermitUpload, handleClinicPicUpload } =
    useFileSchema();

  return (
    <>
      <div>
        <div className="space-y-3 lg:space-y-5">
          <p className="italic text-sm lg:text-md">
            Please upload pictures for the following:
          </p>
          <div>
            <Label>Mayor's Permit</Label>
            <Input
              type="file"
              onChange={handlePermitUpload}
              {...register("permit")}
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
              type="file"
              onChange={handleBIRUpload}
              {...register("bir")}
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
              type="file"
              onChange={handleClinicPicUpload}
              {...register("clinic_pic")}
            />
            {errors.clinic_pic && (
              <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                {errors.clinic_pic.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicFiles;
