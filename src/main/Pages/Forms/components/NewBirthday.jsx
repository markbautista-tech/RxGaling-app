import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registrationSchema } from "../schema/registrationSchema";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useRegForm from "../hooks/useRegForm";
import { Input } from "@/components/ui/input";
import staffRegForm from "../hooks/staffRegForm";

const NewBirthday = ({ register, control, errors, watch }) => {
  const [age, setAge] = useState(null);

  // Watch the values of month and year
  const selectedMonth = watch("month");
  const selectedYear = watch("year");

  const calculateAge = (year) => {
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDayOptions = () => {
    const daysInMonth =
      selectedMonth && selectedYear
        ? getDaysInMonth(selectedMonth, selectedYear)
        : 31;
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = (i + 1).toString().padStart(2, "0");
      return (
        <SelectItem key={day} value={day}>
          {day}
        </SelectItem>
      );
    });
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1899 }, (_, i) => {
      const year = (currentYear - i).toString();
      return (
        <SelectItem key={year} value={year}>
          {year}
        </SelectItem>
      );
    });
  };

  return (
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
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              >
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
          <Controller
            name="day"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="day">
                  <SelectValue placeholder="DD" />
                </SelectTrigger>
                <SelectContent>{generateDayOptions()}</SelectContent>
              </Select>
            )}
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
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setAge(calculateAge(value));
                }}
                value={field.value}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>{generateYearOptions()}</SelectContent>
              </Select>
            )}
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
            value={age ? age : ""}
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
  );
};

export default NewBirthday;
