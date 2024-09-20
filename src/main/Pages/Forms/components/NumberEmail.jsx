import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegForm from "../hooks/useRegForm";

const NumberEmail = ({ register, errors }) => {
  return (
    <>
      <div>
        <Label>Mobile Number</Label>
        <Input {...register("contact_num")} type="number" placeholder="" />
        {errors.contact_num && (
          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
            {errors.contact_num.message}
          </p>
        )}
      </div>
      <div>
        <Label>Email</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="example@gmail.com"
        />
        {errors.email && (
          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
            {errors.email.message}
          </p>
        )}
      </div>
    </>
  );
};

export default NumberEmail;
