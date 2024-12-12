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
import { Link } from "react-router-dom";

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
          {/* <ViewRecords patient={patient} /> */}
          <Link to={`/clinic-app/patient/records/${patient.id}`}>
            <Button
              variant="ghost"
              text-left
              className="w-full text-sm justify-start p-2 rounded-md hover:bg-secondary"
            >
              Manage Records
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PatientAction;
