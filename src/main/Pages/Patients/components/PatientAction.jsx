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
  Ellipsis,
  Menu,
} from "lucide-react";
import AddAppointmentsAction from "./AddAppointmentsAction";
import ViewRecords from "../../Appointments/components/ViewRecords";

const PatientAction = ({ patient }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis className="h-6 w-6" />
        {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        </Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="center">
        <div className="grid gap-2">
          <ViewRecords patient={patient} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PatientAction;
