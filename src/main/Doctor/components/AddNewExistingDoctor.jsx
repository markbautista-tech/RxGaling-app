import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaUserDoctor } from "react-icons/fa6";
import { ChevronDown, FolderInput, SquarePlus } from "lucide-react";
import AddDoctor from "./AddDoctor";
import ImportDoctor from "./ImportDoctor";

const AddNewExistingDoctor = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant=""
            className="rounded-md border flex items-center space-x-2"
          >
            <FaUserDoctor className="w-6 h-6" />
            <span className="hidden sm:block">Add Doctor</span>{" "}
            <ChevronDown className="w-6 h-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="end">
          <div className="grid gap-1">
            <AddDoctor />
            <ImportDoctor />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddNewExistingDoctor;
