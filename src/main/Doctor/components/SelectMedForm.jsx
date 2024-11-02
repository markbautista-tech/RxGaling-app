import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SelectMedForm = () => {
  return (
    <>
      <Label>FORM:</Label>
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Form" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="pill">Pill</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
            <SelectItem value="capsule">Capsule</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectMedForm;
