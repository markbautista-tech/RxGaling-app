import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDoctorAppointment from "../hooks/useDoctorAppointment";
import { Input } from "@/components/ui/input";

const AppointmentsDoctor = ({ doctorid, date }) => {
  const { appointment, setDoctorID, loading, setDate } = useDoctorAppointment();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setDoctorID(doctorid);
    setDate(date);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredAppointments = Array.isArray(appointment)
    ? appointment.filter((appt) =>
        `${appt.patientName}`.toLowerCase().includes(searchQuery)
      )
    : [];

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Input
          type="text"
          placeholder="Search appointments..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Number</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments?.length > 0 ? (
            filteredAppointments.map((appt, index) => (
              <TableRow key={index}>
                <TableCell>{appt.id}</TableCell>
                <TableCell>{`${appt.patient?.last_name}, ${appt.patient?.first_name} ${appt.patient?.middle_name}`}</TableCell>
                <TableCell>{appt.appointment_date}</TableCell>
                <TableCell>
                  {`${appt.start_time || ""}-${appt.end_time || ""}` || "--"}
                </TableCell>
                <TableCell>{appt.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                No appointments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AppointmentsDoctor;
