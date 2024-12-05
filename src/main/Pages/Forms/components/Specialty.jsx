import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegForm from "../hooks/useRegForm";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const Specialty = ({ register, errors, control, specialty }) => {
  const specializations = [
    "Community and Family Medicine",
    "Internal Medicine",
    "Pediatrics",
    "Obstetrics and Gynecology",
    "Surgery",
    "General Medicine",
  ];

  return (
    <>
      <div>
        <Label htmlFor="specialty">Specialization</Label>
        <Controller
          name="specialty"
          control={control}
          {...(specialty ? { defaultValue: specialty } : {})}
          render={({ field }) => (
            <Select
              id="specialty"
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={specialty || "Select specialization"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {specializations.map((specialty, ids) => (
                    <SelectItem key={ids} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.specialty && (
          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
            {errors.specialty.message}
          </p>
        )}
        {/* <Label>Specialization</Label>
        <Input {...register("specialty")} type="text" placeholder="" />
        {errors.specialty && (
          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
            {errors.specialty.message}
          </p>
        )} */}
      </div>
    </>
  );
};

export default Specialty;
