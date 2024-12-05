import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import { ArrowUpDown, Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import SearchBar from "../../components/Search";
import ContentTitle from "../../../PageContent/ContentTitle";
import CreateClinicDoctors from "./create";

import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import classNames from "classnames";
import AddDoctor from "@/main/Doctor/components/AddDoctor";
import AddNewExistingDoctor from "@/main/Doctor/components/AddNewExistingDoctor";
import DoctorAction from "@/main/Doctor/components/DoctorAction";
import useDoctorDetails from "@/main/Doctor/hooks/useDoctorDetails";

const ClinicDoctors = () => {
  const { doctorDetails: rawDoctorDetails } = useDoctorDetails();

  // Ensure doctorDetails is always an array
  const doctorDetails = Array.isArray(rawDoctorDetails)
    ? rawDoctorDetails.filter((doctor) => doctor.role === "Doctor")
    : [];

  // Static arrays for filtering
  const statuses = ["Active", "On Leave", "Retired"];
  const specializations = [
    "Community and Family Medicine",
    "Internal Medicine",
    "Pediatrics",
    "Obstetrics and Gynecology",
    "Surgery",
    "General Medicine",
  ];

  // State for search, sorting, and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "All Specializations"
  );
  const [sortOrder, setSortOrder] = useState({ field: "last_name", asc: true });

  // Sorting logic
  const sortBy = (field) => {
    setSortOrder((prev) => ({
      field,
      asc: prev.field === field ? !prev.asc : true,
    }));
  };

  const sortedData = [...doctorDetails]
    .filter((doctor) =>
      doctor.users?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (doctor) =>
        selectedSpecialization === "All Specializations" ||
        doctor.users?.doctor_details[0]?.specialization ===
          selectedSpecialization
    )
    .sort((a, b) => {
      const fieldA = (a.users?.[sortOrder.field] || "").toLowerCase();
      const fieldB = (b.users?.[sortOrder.field] || "").toLowerCase();
      return fieldA.localeCompare(fieldB) * (sortOrder.asc ? 1 : -1);
    });

  // console.log(sortedData);

  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
        <ContentTitle title="Clinic Doctors" />
        <div className="relative flex">
          <AddNewExistingDoctor />
        </div>
      </div>
      <div className="py-4">
        <Separator orientation="horizontal" className="w-full" />
      </div>
      <div className="mt-4">
        <div className="flex gap-3 mb-4">
          <Input
            placeholder="Search doctor lastname..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            onValueChange={(value) => setSelectedSpecialization(value)}
            defaultValue="All Specializations"
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Specializations">
                All Specializations
              </SelectItem>
              {specializations.map((spec, index) => (
                <SelectItem value={spec} key={index}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table className="border-t-2">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => sortBy("name")}
                  className="font-bold flex items-center text-primary"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-primary font-bold">
                Specialization
              </TableHead>
              <TableHead className="text-primary font-bold">Schedule</TableHead>
              <TableHead className="text-primary font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((doctor, index) => (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell className="">
                    <Avatar>
                      <AvatarImage src={doctor.users?.image || ""} />{" "}
                      {/* Corrected to nested image */}
                      <AvatarFallback>
                        {doctor.users?.last_name?.[0]?.toUpperCase() || "?"}{" "}
                        {/* Safe access to first initial */}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-bold">
                    {`Dr. ${doctor.users?.last_name}, ${doctor.users?.first_name} ${doctor.users?.middle_name?.[0]}. ${doctor.users?.doctor_details[0]?.professional_extension}.` ||
                      "Unknown"}{" "}
                  </TableCell>
                  <TableCell className="">
                    {doctor.users?.doctor_details[0]?.specialization ||
                      "Not specified"}
                  </TableCell>
                  <TableCell className="flex flex-col">
                    <span>{doctor.working_days}</span>
                    <span>{doctor.working_hours}</span>
                  </TableCell>
                  <TableCell className="">
                    <DoctorAction doctor={doctor} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center p-4">
                  No doctors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ClinicDoctors;
