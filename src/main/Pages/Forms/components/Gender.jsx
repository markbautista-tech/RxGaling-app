import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../schema/registrationSchema";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useRegForm from "../hooks/useRegForm";

const SelectGender = ({ control, errors, gender }) => {
  return (
    <div className="">
      <div className="grid lg:grid-flow-col gap-3">
        <div className="w-full">
          <Label htmlFor="gender">Gender</Label>
          <Controller
            name="gender"
            control={control}
            {...(gender ? { defaultValue: gender } : {})}
            render={({ field }) => (
              <Select
                id="gender"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={ gender || "Select gender" } />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Gender-noncomforming">
                      Gender-noncomforming
                    </SelectItem>
                    <SelectItem value="Nonbinary">Nonbinary</SelectItem>
                    <SelectItem value="Prefer not to say">
                      Prefer not to say
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.gender && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.gender.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectGender;
