import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegForm from "../hooks/useRegForm";

const OtherLicense = ({ register, errors }) => {
  return (
    <>
      <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
        <div>
          <Label>PTR Number</Label>
          <Input {...register("ptr_num")} type="text" placeholder="" />
          {errors.ptr_num && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.ptr_num.message}
            </p>
          )}
        </div>
        <div>
          <Label>S2 License Number</Label>
          <Input {...register("s2_license_num")} type="text" placeholder="" />
          {errors.s2_license_num && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.s2_license_num.message}
            </p>
          )}
        </div>
        <div>
          <Label>PRC License Number</Label>
          <Input {...register("prc_no")} type="text" placeholder="" />
          {errors.prc_no && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.prc_no.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default OtherLicense;
