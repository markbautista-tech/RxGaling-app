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

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const NewBirthday = ({ control, errors, watch, birthdate }) => {
  const [month, setMonth] = useState(birthdate.split("-")[1]);
  const [day, setDay] = useState(birthdate.split("-")[2]);
  const [year, setYear] = useState(birthdate.split("-")[0]);

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

  const generateDayOptions = (selectedDay) => {
    const daysInMonth =
      selectedMonth && selectedYear
        ? getDaysInMonth(selectedMonth, selectedYear)
        : 31;
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = (i + 1).toString().padStart(2, "0");
      return (
        <SelectItem key={day} value={day} selected={day === selectedDay}>
          {day}
        </SelectItem>
      );
    });
  };

  const generateYearOptions = (selectedYear) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1899 }, (_, i) => {
      const year = (currentYear - i).toString();
      return (
        <SelectItem key={year} value={year} selected={year === selectedYear}>
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
      <div className="w-full grid grid-row-4 lg:grid-cols-3 gap-3">
        {/* Month */}
        <div>
          <Label htmlFor="month">Month</Label>
          <Controller
            name="month"
            control={control}
            {...(month ? { defaultValue: month } : {})}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  setMonth(value);
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger id="month">
                  <SelectValue placeholder={months ? months[month - 1] : "Select month"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem selected={month === "01"} value="01">January</SelectItem>
                  <SelectItem selected={month === "02"} value="02">February</SelectItem>
                  <SelectItem selected={month === "03"} value="03">March</SelectItem>
                  <SelectItem selected={month === "04"} value="04">April</SelectItem>
                  <SelectItem selected={month === "05"} value="05">May</SelectItem>
                  <SelectItem selected={month === "06"} value="06">June</SelectItem>
                  <SelectItem selected={month === "07"} value="07">July</SelectItem>
                  <SelectItem selected={month === "08"} value="08">August</SelectItem>
                  <SelectItem selected={month === "09"} value="09">September</SelectItem>
                  <SelectItem selected={month === "10"} value="10">October</SelectItem>
                  <SelectItem selected={month === "11"} value="11">November</SelectItem>
                  <SelectItem selected={month === "12"} value="12">December</SelectItem>
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
            {...(day ? { defaultValue: day } : {})}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="day">
                  <SelectValue placeholder={day || "DD"} />
                </SelectTrigger>
                <SelectContent>{generateDayOptions(day)}</SelectContent>
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
            {...(year ? { defaultValue: year } : {})}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setAge(calculateAge(value));
                }}
                value={field.value}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder={year || "YYYY"} />
                </SelectTrigger>
                <SelectContent>{generateYearOptions(year)}</SelectContent>
              </Select>
            )}
          />
          {errors.year && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.year.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewBirthday;
