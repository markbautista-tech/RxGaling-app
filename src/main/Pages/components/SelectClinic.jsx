import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ClinicCard from "./ClinicCard";
import { useLocation } from "react-router-dom";

const clinic = [
  {
    logo: "/src/assets/acculife logo.svg",
    name: "Acculife Medical Laboratory",
    patient: "0 patients",
    appointments: "0 appointments",
  },
];

export function SelectClinic() {
  const location = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          Select Clinic
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[200px] lg:w-[500px]">
        <SheetHeader>
          <SheetTitle>Select your Clinic</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        {clinic.map((clinics, ids) => (
          <div key={ids}>
            <div className="w-full shadow-md rounded-sm">
              <SheetClose className="text-left w-full ">
                <ClinicCard
                  logo={clinics.logo}
                  name={clinics.name}
                  desc={
                    location.pathname === "/appointments"
                      ? clinics.appointments
                      : clinics.patient
                  }
                />
              </SheetClose>
            </div>
          </div>
        ))}

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
