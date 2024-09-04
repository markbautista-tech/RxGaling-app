import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { IoAddCircle } from "react-icons/io5";
import { AddNewAppointment } from "./AddNewAppointment";

export function DoctorOrdate({ trigger }) {
  const [isActive, setIsActive] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="" className="rounded-md border">
          {trigger}
          {/* <IoAddCircle className="w-8 h-8 cursor-pointer lg:w-10 lg:h-10" /> */}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>By Doctor or by Date?</DialogTitle>
          <DialogDescription>
            Is the patient wants an appointment by Doctor or Date? Click next to
            continue
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-row gap-4 py-4">
          <div
            className={
              isActive === "Date"
                ? "bg-primary/30 text-primary- font-medium p-3 text-center rounded-md shadow-md cursor-pointer lg:text-lg border border-primary"
                : "bg-secondary font-medium p-3 text-center rounded-md shadow-md cursor-pointer lg:text-lg"
            }
            onClick={() => setIsActive("Date")}
          >
            Date
          </div>
          <div
            className={
              isActive === "Doctor"
                ? "bg-primary/30 text-primary- font-medium p-3 text-center rounded-md shadow-md cursor-pointer lg:text-lg border border-primary"
                : "bg-secondary font-medium p-3 text-center rounded-md shadow-md cursor-pointer lg:text-lg"
            }
            onClick={() => setIsActive("Doctor")}
          >
            Doctor
          </div>
        </div>
        <DialogFooter>
          {/* <AddNewAppointment /> */}

          <Button type="submit">Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
