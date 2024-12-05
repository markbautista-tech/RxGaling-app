import React, { useState, useEffect } from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleMinus, CirclePlus, Minus, Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

import { IoIosAddCircle } from "react-icons/io";
import usePatientData from "../../Patients/hooks/usePatientData";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import useDoctorDetails from "@/main/Doctor/hooks/useDoctorDetails";
import PickDate from "../../components/PickDate";
import usePickDate from "../../hooks/usePickDate";
import useAddAppointment from "../hooks/useAddAppointment";

const AddAppointments = ({ trigger }) => {
  const navigate = useNavigate();

  const { patientData } = usePatientData();
  const { doctorDetails: rawDoctorDetails } = useDoctorDetails();
  const [patients, setPatients] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "last_name",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [patientAppointment, setPatientAppointment] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: "last_name", asc: true });

  // Sorting logic

  useEffect(() => {
    if (patientData) {
      setPatients([...patientData]);
    }
  }, [patientData]);

  const [currentStep, setCurrentStep] = useState(1);

  const handleAdd = (patientId) => {
    setPatientAppointment(
      (prev) =>
        prev.includes(patientId)
          ? prev.filter((id) => id !== patientId) // Remove if already selected
          : [...prev, patientId] // Add if not selected
    );
  };

  const handleRemove = () => {
    setPatientAppointment(null);
  };

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const sortBy = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction:
        prevState.key === key && prevState.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const specializations = [
    "Community and Family Medicine",
    "Internal Medicine",
    "Pediatrics",
    "Obstetrics and Gynecology",
    "Surgery",
    "General Medicine",
  ];

  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "All Specializations"
  );

  useEffect(() => {
    let sortedPatients = [...patientData];

    if (sortConfig.key) {
      sortedPatients.sort((a, b) => {
        if (a[sortConfig.key]?.toLowerCase() < b[sortConfig.key]?.toLowerCase())
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key]?.toLowerCase() > b[sortConfig.key]?.toLowerCase())
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    if (searchTerm) {
      sortedPatients = sortedPatients.filter(
        (patient) =>
          patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.id_number.toString().includes(searchTerm)
      );
    }

    setPatients(sortedPatients);
  }, [sortConfig, searchTerm, patientData]);

  const doctorDetails = Array.isArray(rawDoctorDetails)
    ? rawDoctorDetails.filter((doctor) => doctor.role === "Doctor")
    : [];

  const getCurrentDayAndTime = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date();
    const currentDay = days[currentDate.getDay()];

    // Convert current time to minutes for easier comparison
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

    return { currentDay, currentTime };
  };

  // Function to check if a doctor is available
  const isDoctorAvailable = (doctor) => {
    const { currentDay, currentTime } = getCurrentDayAndTime();

    // Split working days and check if today is included
    const workingDays = doctor.working_days
      .split(", ")
      .map((day) => day.trim());

    // Parse working hours into start and end in minutes
    const [startHourStr, endHourStr] = doctor.working_hours.split(" - ");
    const startHour =
      new Date(`1970-01-01 ${startHourStr}`).getHours() * 60 +
      new Date(`1970-01-01 ${startHourStr}`).getMinutes();
    const endHour =
      new Date(`1970-01-01 ${endHourStr}`).getHours() * 60 +
      new Date(`1970-01-01 ${endHourStr}`).getMinutes();

    // Check if today is a working day and the current time is within the working hours
    return (
      workingDays.includes(currentDay) &&
      currentTime >= startHour &&
      currentTime <= endHour
    );
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
    .filter(isDoctorAvailable)
    .sort((a, b) => {
      const fieldA = (a.users?.[sortOrder.field] || "").toLowerCase();
      const fieldB = (b.users?.[sortOrder.field] || "").toLowerCase();
      return fieldA.localeCompare(fieldB) * (sortOrder.asc ? 1 : -1);
    });

  const isDoctorOffline = (doctor) => !isDoctorAvailable(doctor);

  const sortedNonOnlineData = [...doctorDetails]
    .filter((doctor) =>
      doctor.users?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (doctor) =>
        selectedSpecialization === "All Specializations" ||
        doctor.users?.doctor_details[0]?.specialization ===
          selectedSpecialization
    )
    .filter(isDoctorOffline)
    .sort((a, b) => {
      const fieldA = (a.users?.[sortOrder.field] || "").toLowerCase();
      const fieldB = (b.users?.[sortOrder.field] || "").toLowerCase();
      return fieldA.localeCompare(fieldB) * (sortOrder.asc ? 1 : -1);
    });

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleSelectDoctor = (docId) => {
    setSelectedDoctorId((prev) => (prev === docId ? null : docId));
  };

  const { setPatientID, setDoctorID, setAppointmentDate } = useAddAppointment();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState(new Date());

  const handleDateSelect = (selectedDate) => {
    setSelected(selectedDate);
    setOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    setSelected(today);
    setDate(today);
    setOpen(false);
  };

  const handleSubmit = () => {
    setPatientID(patientAppointment);
    setDoctorID(selectedDoctorId);
    setAppointmentDate(selected);

    setSelectedDoctorId(null);
    setPatientAppointment([]);
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <DialogHeader className="m-0 sticky bg-white top-0 z-50">
              <div className="flex justify-between w-full">
                {currentStep > 1 && (
                  <Button variant="secondary" onClick={goToPreviousStep}>
                    Back
                  </Button>
                )}
                {currentStep <= 2 && (
                  <Button
                    onClick={goToNextStep}
                    disabled={
                      currentStep === 1 && patientAppointment.length == 0
                    }
                    className="w-32"
                  >
                    Next
                  </Button>
                )}
              </div>
              <DialogTitle className="text-md lg:text-xl">
                Add New Appointments
              </DialogTitle>
              {/* <DialogDescription className="lg:text-md">
   
              </DialogDescription> */}

              <div className="grid grid-rows-2 lg:flex gap-5 pt-5">
                <Input
                  type="text"
                  placeholder="Search patient's last name or ID number"
                  className="text-xs lg:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="border border-primary bg-primary/10"
                  onClick={() => navigate("/clinic-app/patients")}
                >
                  Add New Patient
                </Button>
              </div>
            </DialogHeader>
            <div className="flex items-start">
              <Table className="border-t-2 border-primary mt-4 items-start">
                <TableHeader>
                  <TableRow>
                    <TableHead className="lg:w-[100px]">
                      <Button
                        variant="ghost"
                        onClick={() => sortBy("id_number")}
                        className="font-bold text-xs lg:text-sm"
                      >
                        ID Number <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="lg:w-[400px]">
                      <Button
                        variant="ghost"
                        onClick={() => sortBy("last_name")}
                        className="font-bold text-xs lg:text-sm"
                      >
                        Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell font-bold">
                      Age
                    </TableHead>
                    <TableHead className="hidden lg:table-cell font-bold">
                      Gender
                    </TableHead>
                    <TableHead className="w-[50px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.length > 0 ? (
                    patients.map((patient) => (
                      <TableRow
                        key={patient.id}
                        className={
                          patientAppointment.includes(patient.id)
                            ? "bg-secondary hover:bg-secondary cursor-pointer text-xs lg:text-sm"
                            : "cursor-pointer text-xs lg:text-sm hover:bg-secondary"
                        }
                      >
                        <TableCell className="text-center w-[50px]">
                          {patient.id_number}
                        </TableCell>
                        <TableCell>
                          <div className="text-left">
                            <span className="">
                              {patient.last_name}
                              {", "}
                            </span>
                            <span>
                              {`${patient.first_name} ${patient.middle_name?.[0] || ""}. ${patient.suffix || ""}`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {patient.age || "N/A"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {patient.gender || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            className="lg:w-[100px] hover:bg-primary/10"
                            onClick={() => handleAdd(patient.id)}
                          >
                            {patientAppointment.includes(patient.id) ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                            <span className="hidden lg:block">
                              {patientAppointment.includes(patient.id)
                                ? "Remove"
                                : "Add"}
                            </span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-4 text-gray-500"
                      >
                        No patient records available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* <DialogFooter>
              <Button
                className="w-full lg:w-[150px] text-lg"
                disabled={!patientAppointment}
              >
                Next
              </Button>
            </DialogFooter> */}
          </>
        );

      case 2:
        return (
          <>
            <DialogHeader>
              <div className="flex justify-between w-full">
                {currentStep > 1 && (
                  <Button
                    variant="secondary"
                    onClick={goToPreviousStep}
                    className="w-32"
                  >
                    Back
                  </Button>
                )}
                {currentStep <= 2 && (
                  <Button
                    onClick={goToNextStep}
                    disabled={
                      currentStep === 1 &&
                      patientAppointment.length == 0 &&
                      handleSelectDoctor.length == 0
                    }
                    className="w-32"
                  >
                    Next
                  </Button>
                )}
              </div>
              <DialogTitle className="text-md lg:text-xl">
                Select Doctor to Consult
              </DialogTitle>
            </DialogHeader>
            <div className="w-full">
              <Card>
                <CardHeader>
                  <div className="grid grid-rows-2 lg:flex gap-5">
                    <Input
                      type="text"
                      placeholder="Search Doctor..."
                      className="text-xs lg:text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select
                      onValueChange={(value) =>
                        setSelectedSpecialization(value)
                      }
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
                </CardHeader>
                <CardContent className="h-[400px] overflow-y-auto no-scrollbar">
                  <div className="flex flex-col gap-2 pt-3 lg:px-20">
                    {sortedData.length > 0 ? (
                      sortedData.map((doctor, ids) => (
                        <div key={ids}>
                          <div
                            className={`shadow-md py-4 px-3 rounded-md flex flex-col cursor-pointer 
                                ${selectedDoctorId === doctor.user_id ? "bg-primary/10 border border-primary" : "bg-gray-100"}`}
                            onClick={() => handleSelectDoctor(doctor.user_id)}
                          >
                            <div className="flex flex-col lg:flex-row lg:gap-10 lg:justify-between">
                              <div>
                                <span className="font-bold">
                                  {`Dr. ${doctor.users?.last_name}, ${doctor.users?.first_name} ${doctor.users?.middle_name?.[0]}. ${doctor.users?.doctor_details[0]?.professional_extension}.` ||
                                    "Unknown"}{" "}
                                </span>
                              </div>
                              <span>
                                {doctor.users?.doctor_details[0]
                                  ?.specialization || "Not specified"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs lg:text-sm">
                                {`${doctor.working_days} | ${doctor.working_hours}`}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-green-500 border-green-500"
                              >
                                Online
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        No doctors found online today
                      </div>
                    )}
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Offline Doctors</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-3 pt-3 lg:px-20">
                          {sortedNonOnlineData.length > 0 ? (
                            sortedNonOnlineData.map((doctor, ids) => (
                              <div key={ids}>
                                <div
                                  className={`shadow-md py-4 px-3 rounded-md flex flex-col cursor-pointer 
                                ${selectedDoctorId === doctor.user_id ? "bg-primary/10 border border-primary" : "bg-gray-100"}`}
                                  onClick={() =>
                                    handleSelectDoctor(doctor.user_id)
                                  }
                                >
                                  <div className="flex flex-col lg:flex-row lg:gap-10 lg:justify-between">
                                    <div className="flex items-center gap-3">
                                      <span className="font-bold">
                                        {`Dr. ${doctor.users?.last_name}, ${doctor.users?.first_name} ${doctor.users?.middle_name?.[0]}. ${doctor.users?.doctor_details[0]?.professional_extension}.` ||
                                          "Unknown"}{" "}
                                      </span>
                                    </div>
                                    <span>
                                      {doctor.users?.doctor_details[0]
                                        ?.specialization || "Not specified"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-xs lg:text-sm">
                                      {`${doctor.working_days} | ${doctor.working_hours}`}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="border-black"
                                    >
                                      Offline
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-gray-500">
                              No doctors found
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <DialogHeader>
              <div className="flex justify-between w-full">
                {currentStep > 1 && (
                  <Button
                    variant="secondary"
                    onClick={goToPreviousStep}
                    className="w-32"
                  >
                    Back
                  </Button>
                )}
                {currentStep <= 2 && (
                  <Button
                    onClick={goToNextStep}
                    disabled={
                      currentStep === 1 &&
                      patientAppointment.length == 0 &&
                      handleSelectDoctor.length == 0
                    }
                    className="w-32"
                  >
                    Next
                  </Button>
                )}
              </div>

              <DialogTitle className="text-md lg:text-xl">
                Current Doctor Appointments
              </DialogTitle>
              <div className="flex justify-between items-center">
                <div>
                  <span className="mr-4">Select date:</span>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full lg:w-[280px] justify-start text-left font-normal",
                          !selected && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selected ? (
                          format(selected, "yyyy - MM - dd")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                      <DayPicker
                        showOutsideDays
                        mode="single"
                        selected={selected}
                        onSelect={handleDateSelect}
                      />
                      <div className="text-right">
                        <Button
                          variant="outline"
                          className="w-32 shadow-md border-blue-500"
                          onClick={handleToday}
                        >
                          Today
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="w-32" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </DialogHeader>
            <div>
              <div className="flex justify-end"></div>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CalendarIcon />
          <span className="hidden lg:block">{trigger}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full lg:max-w-[1000px] max-h-auto p-3 lg:p-5 rounded-md bottom-10">
        {renderStepContent()}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointments;
