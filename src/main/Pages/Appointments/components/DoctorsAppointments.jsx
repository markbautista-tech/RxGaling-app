import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useDoctorDetails from "@/main/Doctor/hooks/useDoctorDetails";

const DoctorsAppointments = () => {
  const { doctorDetails: rawDoctorDetails } = useDoctorDetails();

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState({
    field: "last_name",
    asc: true,
  });
  const doctorDetails = Array.isArray(rawDoctorDetails)
    ? rawDoctorDetails.filter((doctor) => doctor.role === "Doctor")
    : [];

  const sortedData = [...doctorDetails]
    .filter((doctor) =>
      doctor.users?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = (a.users?.[sortOrder.field] || "").toLowerCase();
      const fieldB = (b.users?.[sortOrder.field] || "").toLowerCase();
      return fieldA.localeCompare(fieldB) * (sortOrder.asc ? 1 : -1);
    });

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button>Select Doctor</Button>
        </SheetTrigger>
        <SheetContent
          className="w-full lg:w-[500px] overflow-y-auto no-scrollbar"
          side="left"
        >
          <SheetHeader>
            <SheetTitle>Select Doctor</SheetTitle>
            <SheetDescription className="text-left">
              Select a doctor to see their available appointments.
            </SheetDescription>
            <div className="py-2">
              <Input
                placeholder="Search doctor lastname..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <Separator orientation="horizontal" />
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-2 pt-3">
            {sortedData.length > 0 ? (
              sortedData.map((doctor, ids) => (
                <div key={ids}>
                  <div className="bg-gray-100 shadow-md py-4 px-3 rounded-md flex flex-col cursor-pointer hover:scale-105 transition-all">
                    <span className="font-bold">
                      {`Dr. ${doctor.users?.last_name}, ${doctor.users?.first_name} ${doctor.users?.middle_name?.[0]}. ${doctor.users?.doctor_details[0]?.professional_extension}.` ||
                        "Unknown"}{" "}
                    </span>
                    <span>
                      {doctor.users?.doctor_details[0]?.specialization ||
                        "Not specified"}
                    </span>
                    <span className="text-xs lg:text-sm">
                      {`${doctor.working_days} | ${doctor.working_hours}`}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No doctors found</div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DoctorsAppointments;
