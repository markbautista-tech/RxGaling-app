import React, { useState } from "react";

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

const SelectGender = () => {
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");

  const handleGenderChange = (value) => {
    setGender(value);
    if (value !== "other") {
      setOtherGender("");
    }
  };

  return (
    <div className="">
      <div className="grid lg:grid-flow-col gap-3">
        <div className="w-full">
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender" onValueChange={handleGenderChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {gender === "other" && (
          <div>
            <Label className="italic">Please specify gender</Label>
            <Input
              id="gender-other"
              type="text"
              placeholder=""
              value={otherGender}
              onChange={(e) => setOtherGender(e.target.value)}
              className="flex-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectGender;
