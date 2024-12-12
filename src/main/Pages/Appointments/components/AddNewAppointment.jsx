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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ContentTitle from "@/main/PageContent/ContentTitle";
import { ChevronLeftCircle, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { IoAddCircle } from "react-icons/io5";
import usePatientData from "../../Patients/hooks/usePatientData";
import { SkeletonNoCircle } from "@/main/components/SkeletonNoCircle";
import useDoctorDetails from "@/main/Doctor/hooks/useDoctorDetails";
import { Badge } from "@/components/ui/badge";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import useDoctorAppointment from "@/main/Doctor/hooks/useDoctorAppointment";
import { useUser } from "@/context/UserContext";
import addAppointments from "@/utils/data/add/addAppointments";
import { toast } from "sonner";
import { getAppointmentByDoctor } from "@/utils/data/fetch/getAppointments";
import useFetchDoctorAppt from "../hooks/useFetchDoctorAppt";
import { Link, useNavigate } from "react-router-dom";
dayjs.extend(utc);
dayjs.extend(timezone);

const ITEMS_PER_PAGE = 10;

export function AddNewAppointment() {
  const navigate = useNavigate();

  const { clinicId } = useUser();
  const { patientData, patientLoading } = usePatientData();
  const { doctorDetails: rawDoctorDetails } = useDoctorDetails();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (patientData) {
      setPatients([...patientData]);
    }
  }, [patientData]);

  const [sortConfig, setSortConfig] = useState({
    key: "last_name",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState({ field: "last_name", asc: true });
  const [patientAppointment, setPatientAppointment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(patients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = patients.slice(startIndex, endIndex);

  const handleAdd = (patientId) => {
    setPatientAppointment(
      (prev) =>
        prev.includes(patientId)
          ? prev.filter((id) => id !== patientId) // Remove if already selected
          : [...prev, patientId] // Add if not selected
    );
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
  const [selected, setSelected] = useState(new Date());
  const { appointment, loading, setLoading } = useDoctorAppointment(
    selectedDoctorId,
    selected
  );
  const today = new Date().toISOString().split("T")[0];

  const appointmentArray = Array.isArray(appointment) ? appointment : [];

  const apptTotalPages = Math.ceil(appointmentArray.length / ITEMS_PER_PAGE);
  const apptStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const apptEndIndex = apptStartIndex + ITEMS_PER_PAGE;
  const apptCurrentData = appointmentArray.slice(apptStartIndex, apptEndIndex);

  const handleSelectDoctor = (docId) => {
    setSelectedDoctorId((prev) => (prev === docId ? null : docId));
  };

  const [currentStep, setCurrentStep] = useState(1);
  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const appointment = {
      patient_id: patientAppointment[0],
      doctor_id: selectedDoctorId,
      clinic_id: clinicId,
      appointment_date: selected,
      status: "Scheduled",
    };

    const response = await addAppointments(appointment);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Appointment Scheduled Successfully");
      setLoading(false);
      navigate("/clinic-app/appointments");
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-3 py-3">
          <Link to="/clinic-app/appointments">
            <ChevronLeftCircle className="cursor-pointer" />
          </Link>
          <ContentTitle title={"Add New Appointments"} />
        </div>
        <Separator />
        <div className="flex gap-3 justify-end mt-3">
          {currentStep > 1 && (
            <Button
              variant="secondary"
              className="w-32"
              onClick={goToPreviousStep}
            >
              Back
            </Button>
          )}
          {currentStep <= 2 && (
            <Button
              disabled={currentStep === 1 && patientAppointment.length == 0}
              className="w-32"
              onClick={goToNextStep}
            >
              Next
            </Button>
          )}
          {currentStep === 3 && (
            <Button className="w-32" onClick={() => handleSubmit()}>
              Add
            </Button>
          )}
        </div>
        <div>
          {currentStep === 1 && (
            <div className="my-5 border-2 bottom-10 overflow-y-auto no-scrollbar rounded-md lg:mx-32 shadow-md p-2">
              <span className="font-bold">Select Patient</span>
              <div className="pb-3">
                <Input
                  placeholder="Search..."
                  className="text-xs lg:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                {patientLoading ? (
                  <SkeletonNoCircle />
                ) : currentData.length > 0 ? (
                  currentData.map((patient, index) => (
                    <div
                      key={index}
                      className="p-2 border flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="text-wrap text-xs lg:text-sm">
                          {`Name: ${patient.last_name}, ${patient.first_name} ${patient.middle_name?.[0] || ""}. ${patient.suffix || ""}`}
                        </span>
                        <span className="text-wrap text-xs lg:text-sm">
                          {`Age: ${patient.age} | ${patient.gender}`}
                        </span>
                      </div>
                      <Button
                        variant={
                          patientAppointment.includes(patient.id)
                            ? ""
                            : "outline"
                        }
                        className="lg:w-[100px]"
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
                    </div>
                  ))
                ) : (
                  <p>No records found</p>
                )}
              </div>
              <Pagination>
                <PaginationContent className="flex items-center space-x-2 py-4">
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((page) => Math.max(page - 1, 1));
                      }}
                      aria-disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-md text-xs ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-purple-600"
                      }`}
                    >
                      Previous
                    </PaginationPrevious>
                  </PaginationItem>

                  {/* Page Numbers with Hidden Previous Number */}
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;

                    // Display logic for ellipses and page numbers
                    const isFirstPage = pageNumber === 1;
                    const isLastPage = pageNumber === totalPages;
                    const isCurrentPage = pageNumber === currentPage;
                    const isNextPage = pageNumber === currentPage + 1;

                    // Hide the "previous" page
                    if (pageNumber === currentPage - 1) {
                      return null;
                    }

                    if (
                      !isFirstPage &&
                      !isLastPage &&
                      !isCurrentPage &&
                      !isNextPage
                    ) {
                      return (
                        <PaginationItem
                          key={pageNumber}
                          className="hidden sm:block"
                        >
                          <span className="px-3 py-1 text-gray-500 text-xs">
                            ...
                          </span>
                        </PaginationItem>
                      );
                    }

                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNumber);
                          }}
                          className={`px-3 py-1 border rounded-md text-xs ${
                            isCurrentPage
                              ? "bg-purple-600 text-white"
                              : "text-purple-600 hover:bg-purple-100"
                          }`}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((page) =>
                          Math.min(page + 1, totalPages)
                        );
                      }}
                      aria-disabled={currentPage === totalPages}
                      className={`px-3 py-1 border rounded-md text-xs ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-purple-600"
                      }`}
                    >
                      Next
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          {currentStep === 2 && (
            <div className="my-5 border-2 bottom-10 overflow-y-auto no-scrollbar rounded-md lg:mx-32 shadow-md p-2">
              <span className="font-bold">Select Doctor</span>
              <div className="pb-3 flex flex-col lg:flex-row gap-3">
                <Input
                  placeholder="Search..."
                  className="text-xs lg:text-sm"
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
              <div>
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
                            {doctor.users?.doctor_details[0]?.specialization ||
                              "Not specified"}
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
                              onClick={() => handleSelectDoctor(doctor.user_id)}
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
            </div>
          )}
          {currentStep === 3 && (
            <div className="my-5 border-2 bottom-10 overflow-y-auto no-scrollbar rounded-md lg:mx-32 shadow-md p-2">
              <span className="font-bold">Set Appointment</span>
              <div className="flex gap-5 items-center">
                <Label className="text-nowrap">Select Date: </Label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="p-2 w-full border rounded-md"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  min={today}
                />
              </div>
              <div className="mt-3">
                <span className="text-sm">Current Doctor Appointment</span>
                <div>
                  {loading ? (
                    <SkeletonNoCircle />
                  ) : apptCurrentData.length > 0 ? (
                    apptCurrentData.map((appt, index) => (
                      <div
                        key={index}
                        className="border border-primary p-3 flex items-center gap-5"
                      >
                        <span className="text-wrap text-xs lg:text-sm">
                          {++index}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-wrap text-xs lg:text-sm">
                            {`Name: ${appt.patients?.last_name}, ${appt.patients?.first_name} ${appt.patients?.middle_name?.[0] || ""}. ${appt.patients?.suffix || ""}`}
                          </span>
                          <span className="text-wrap text-xs lg:text-sm">
                            {`Age: ${appt.patients?.age} | ${appt.patients?.gender}`}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="italic text-center">
                      {selected
                        ? "No appointments found"
                        : "Select a date to view appointments"}
                    </p>
                  )}
                </div>
              </div>
              <Pagination>
                <PaginationContent className="flex items-center space-x-2 py-4">
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((page) => Math.max(page - 1, 1));
                      }}
                      aria-disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-md text-xs ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-purple-600"
                      }`}
                    >
                      Previous
                    </PaginationPrevious>
                  </PaginationItem>

                  {/* Page Numbers with Hidden Previous Number */}
                  {Array.from({ length: apptTotalPages }).map((_, index) => {
                    const pageNumber = index + 1;

                    // Display logic for ellipses and page numbers
                    const isFirstPage = pageNumber === 1;
                    const isLastPage = pageNumber === apptTotalPages;
                    const isCurrentPage = pageNumber === currentPage;
                    const isNextPage = pageNumber === currentPage + 1;

                    // Hide the "previous" page
                    if (pageNumber === currentPage - 1) {
                      return null;
                    }

                    if (
                      !isFirstPage &&
                      !isLastPage &&
                      !isCurrentPage &&
                      !isNextPage
                    ) {
                      return (
                        <PaginationItem
                          key={pageNumber}
                          className="hidden sm:block"
                        >
                          <span className="px-3 py-1 text-gray-500 text-xs">
                            ...
                          </span>
                        </PaginationItem>
                      );
                    }

                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNumber);
                          }}
                          className={`px-3 py-1 border rounded-md text-xs ${
                            isCurrentPage
                              ? "bg-purple-600 text-white"
                              : "text-purple-600 hover:bg-purple-100"
                          }`}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((page) =>
                          Math.min(page + 1, apptTotalPages)
                        );
                      }}
                      aria-disabled={currentPage === apptTotalPages}
                      className={`px-3 py-1 border rounded-md text-xs ${
                        currentPage === apptTotalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-purple-600"
                      }`}
                    >
                      Next
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
