import { Button } from "@/components/ui/button";
import {
  Dialog,
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

export function AddNewAppointment() {
  const [isActive, setIsActive] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="" className="rounded-md border">
          Add Appointment
          {/* <IoAddCircle className="w-8 h-8 cursor-pointer lg:w-10 lg:h-10" /> */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New or Exisiting Patient?</DialogTitle>
          <DialogDescription>
            Is it New patient or has Existing record?
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-row gap-4 py-4">
          <div
            className={
              isActive === "New"
                ? "bg-primary/30 text-primary- font-medium p-3 text-center rounded-md shadow-md cursor-pointer lg:text-lg border border-primary"
                : "bg-secondary font-medium p-3 text-center rounded-md shadow-md cursor-pointer lg:text-lg"
            }
            onClick={() => setIsActive("New")}
          >
            New Patient
          </div>
          <div
            className={
              isActive === "Existing"
                ? "bg-primary/30 text-primary- font-medium p-3 text-center rounded-md shadow-md cursor-pointer lg:text-lg border border-primary"
                : "bg-secondary font-medium p-3 text-center rounded-md shadow-md cursor-pointer lg:text-lg"
            }
            onClick={() => setIsActive("Existing")}
          >
            Existing Patient
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
