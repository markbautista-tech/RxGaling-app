import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Birthday = ({ control, errors, watch, birthdate, setAge, age }) => {
  const [month, setMonth] = useState(birthdate?.split("-")[1]);
  const [day, setDay] = useState(birthdate?.split("-")[2]);
  const [year, setYear] = useState(birthdate?.split("-")[0]);

  const selectedMonth = watch("month");
  const selectedYear = watch("year");

  // Function to calculate age
  const calculateAge = (birthYear, birthMonth, birthDay) => {
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    let age = today.getFullYear() - birthYear;
    const monthDiff = today.getMonth() - (birthMonth - 1);
    const dayDiff = today.getDate() - birthDay;

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--; // Adjust age if the birthday hasn't been reached this year
    }
    return age;
  };

  // Calculate age when year, month, or day changes
  useEffect(() => {
    if (selectedYear && selectedMonth && day) {
      const newAge = calculateAge(selectedYear, selectedMonth, day);
      setAge(newAge);
    }
  }, [selectedYear, selectedMonth, day]);

  // Function to get days in the selected month and year
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
        <SelectItem key={day} value={day}>
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
            defaultValue={month || ""}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  setMonth(value);
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger id="month">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((monthName, index) => (
                    <SelectItem
                      key={index}
                      value={(index + 1).toString().padStart(2, "0")}
                    >
                      {monthName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.month && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.month.message}
            </p>
          )}
        </div>

        {/* Day */}
        <div>
          <Label htmlFor="day">Day</Label>
          <Controller
            name="day"
            control={control}
            defaultValue={day || ""}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  setDay(value);
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger id="day">
                  <SelectValue placeholder="DD" />
                </SelectTrigger>
                <SelectContent>{generateDayOptions(day)}</SelectContent>
              </Select>
            )}
          />
          {errors?.day && (
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
            defaultValue={year || ""}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  setYear(value);
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>{generateYearOptions(year)}</SelectContent>
              </Select>
            )}
          />
          {errors?.year && (
            <p className="text-red-400 italic text-xs py-1 lg:text-sm">
              {errors.year.message}
            </p>
          )}
        </div>
        <div>
          <Label>Age </Label>
          <Input value={age ?? ""} readOnly />
        </div>
      </div>
    </div>
  );
};

export default Birthday;
