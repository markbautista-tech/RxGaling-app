import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Users } from "lucide-react";
import AddUser from "./AddUser";
import ImportStaff from "./ImportStaff";

const AddNewExistingStaff = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant=""
            className="rounded-md border flex items-center space-x-2"
          >
            <Users className="w-6 h-6" />
            <span className="hidden sm:block">Add Staff</span>{" "}
            <ChevronDown className="w-6 h-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="end">
          <div className="grid gap-1">
            <AddUser />
            <ImportStaff />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddNewExistingStaff;
