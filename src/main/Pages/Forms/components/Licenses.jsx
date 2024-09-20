import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegForm from "../hooks/useRegForm";

const Licenses = ({ register, errors }) => {
  return (
    <>
      <div>
        <Label>License Number</Label>
        <Input {...register("license_num")} type="text" placeholder="" />
        {errors.license_num && (
          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
            {errors.license_num.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Licenses;
