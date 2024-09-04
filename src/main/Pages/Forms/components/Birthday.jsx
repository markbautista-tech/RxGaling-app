import React from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Birthday = () => {
  return (
    <>
      <div className="grid grid-row-3 lg:grid-cols-3 gap-3">
        <div className="">
          <Label htmlFor="month">Month</Label>
          <Select>
            <SelectTrigger id="month">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Label htmlFor="day">Day</Label>
          <Input
            id="day"
            type="number"
            min="1"
            max="31"
            placeholder="DD"
            className="w-full"
          />
        </div>
        <div className="">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            min="1900"
            max="2100"
            placeholder="YYYY"
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Birthday;
