import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegForm from "../hooks/useRegForm";

const Specialty = ({ register, errors }) => {
  return (
    <>
      <div>
        <Label>Specialization</Label>
        <Input {...register("specialty")} type="text" placeholder="" />
        {errors.specialty && (
          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
            {errors.specialty.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Specialty;
