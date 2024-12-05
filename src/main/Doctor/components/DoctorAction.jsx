import React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  MoreHorizontal,
  Edit,
  Copy,
  Archive,
  AlertCircle,
  CalendarPlus,
  FileText,
  User,
  Edit2,
  MoreVertical,
} from "lucide-react";
import ShowDetails from "./ShowDetails";
import Scheduler from "@/main/Pages/StaffManagement/components/Scheduler";

const DoctorAction = ({ doctor }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="center">
          <div className="grid gap-2">
            <ShowDetails doctor={doctor} />
            <Scheduler doctor={doctor} />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DoctorAction;
