import React, { useState } from "react";
import ContentTitle from "../../PageContent/ContentTitle";

import "./style/index.css";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TbCalendarMonth, TbMenu2, TbX } from "react-icons/tb";

import { Separator } from "@/components/ui/separator";
import PickDate from "../components/PickDate";
import { AddNewAppointment } from "./components/AddNewAppointment";
import SearchBar from "../components/Search";
import { DoctorOrdate } from "./components/DoctorOrDate";
import { SelectClinic } from "../components/SelectClinic";
import AddAppointments from "./components/AddAppointments";
import DoctorsAppointments from "./components/DoctorsAppointments";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import useAppointments from "./hooks/useAppointments";
import usePickDate from "../hooks/usePickDate";
import { SkeletonLoading } from "@/main/components/Skeleton";
import { Button } from "@/components/ui/button";
import AppointmentsAction from "./components/AppointmentsAction";

const Appointments = () => {
  const { user, role } = useUser();
  const { appointments, loading } = useAppointments(role, user.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(new Date());
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (selectedDate) => {
    setSelected(selectedDate);
    setOpen(false);
  };

  const handleToday = () => {
    setSelected(new Date());
    setOpen(false);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.patients?.last_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate =
      selected &&
      new Date(appointment.appointment_date).toDateString() ===
        selected.toDateString();

    return matchesSearch && matchesDate;
  });

  return (
    <>
      <div className="w-full h-screen">
        {/* Page Header */}
        <div className="py-2 lg:py-4 flex justify-between items-center">
          <ContentTitle title="Appointments" />
          {role !== "Owner" && role !== "Clinic Administrator" && (
            <AddAppointments trigger="Add Appointments" />
          )}
        </div>
        {/* Separator */}
        <div className="py-1 lg:py-3">
          <Separator orientation="horizontal" className="w-full" />
        </div>
        {/* Search and Filters */}
        <div className="py-1 lg:py-4 w-full flex gap-3 flex-col lg:flex-row">
          <Input
            placeholder="Search for appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full lg:w-[280px] justify-start text-left font-normal ${
                      !selected ? "text-muted-foreground" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selected ? (
                      format(selected, "yyyy-MM-dd")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={handleDateSelect}
                    showOutsideDays
                  />
                  <div className="text-right mt-2">
                    <Button variant="outline" onClick={handleToday}>
                      Today
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {role !== "Doctor" && <DoctorsAppointments />}
          </div>
        </div>
        <div className="bg-white border border-gray-300 h-full flex rounded-lg shadow-lg mb-10 overflow-auto">
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Status</TableHead>
                {role !== "Owner" && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {loading ? (
                <SkeletonLoading /> // Loading placeholder
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment, index) => (
                  <TableRow key={index}>
                    {/* Patient Name */}
                    <TableCell>
                      {`${appointment.patients?.last_name || ""}, ${
                        appointment.patients?.first_name || ""
                      } ${appointment.patients?.middle_name || ""}`}
                    </TableCell>

                    {/* Appointment Date */}
                    <TableCell>
                      {appointment.appointment_date || "--"}
                    </TableCell>

                    {/* Appointment Duration */}
                    <TableCell>
                      {`${appointment.start_time || "--"} - ${appointment.end_time || "--"}`}
                    </TableCell>

                    {/* Doctor Name */}
                    <TableCell>{`Dr. ${appointment.users?.last_name || "--"}`}</TableCell>

                    {/* Appointment Status */}
                    <TableCell>{appointment.status || "Unknown"}</TableCell>

                    {/* Actions */}
                    {role !== "Owner" && (
                      <TableCell>
                        <AppointmentsAction patient={appointment} />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No appointments available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Appointments;
