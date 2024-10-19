import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registrationSchema } from "../schema/registrationSchema";

import { Label } from "@/components/ui/label";
import
  {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useRegForm from "../hooks/useRegForm";

const Birthday = ({ register, control, errors }) =>
{
  const { age, setAge } = useRegForm();

  const calculateAge = (year) =>
  {
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  };

  return (
    <>
      <div>
        <div>
          <Label className="text-md">Birthday</Label>
        </div>
        <div className="w-full grid grid-row-4 lg:grid-cols-4 gap-3">
          {/* Month */}
          <div>
            <Label htmlFor="month">Month</Label>
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <Select {...register("email_add")} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">January</SelectItem>
                    <SelectItem value="02">February</SelectItem>
                    <SelectItem value="03">March</SelectItem>
                    <SelectItem value="04">April</SelectItem>
                    <SelectItem value="05">May</SelectItem>
                    <SelectItem value="06">June</SelectItem>
                    <SelectItem value="07">July</SelectItem>
                    <SelectItem value="08">August</SelectItem>
                    <SelectItem value="09">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.month && (
              <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                {errors?.month?.message}
              </p>
            )}
          </div>

          {/* Day */}
          <div>
            <Label htmlFor="day">Day</Label>
            <Input
              {...register("day")}
              id="day"
              type="number"
              min="1"
              max="31"
              placeholder="DD"
              className="w-full"
            />
            {errors.day && (
              <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                {errors.day.message}
              </p>
            )}
          </div>

          {/* Year */}
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              {...register("year")}
              id="year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              placeholder="YYYY"
              className="w-full"
              onChange={(e) =>
              {
                const year = e.target.value;
                setAge(calculateAge(year));
              }}
            />
            {errors.year && (
              <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                {errors.year.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div className="w-full">
            <Label>Age</Label>
            <Input
              {...register("age")}
              type="number"
              value={age || ""}
              placeholder=""
              readOnly
            />
            {errors.age && (
              <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                {errors.age.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Birthday;
