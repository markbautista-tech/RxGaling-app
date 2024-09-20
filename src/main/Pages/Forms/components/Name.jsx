import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegForm from "../hooks/useRegForm";

const NameComponent = ({ register, errors }) => {
  return (
    <div className="lg:flex gap-3 items-start">
      <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
        <div className="">
          <Label htmlFor="fname">First Name</Label>
          <Input {...register("fname")} type="text" placeholder="Juan" />
          {errors.fname && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.fname.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="mname">Middle Name</Label>
          <Input {...register("mname")} type="text" placeholder="Manansala" />
          {errors.mname && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.mname.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lname">Last Name</Label>
          <Input {...register("lname")} type="text" placeholder="Dela Cruz" />
          {errors.lname && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.lname.message}
            </p>
          )}
        </div>
      </div>
      <div className="">
        <Label htmlFor="ename">Ext. Name</Label>
        <Input
          {...register("extname")}
          type="text"
          placeholder="Sr Jr I II III"
        />
        {errors.extname && (
          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
            {errors.extname.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default NameComponent;
