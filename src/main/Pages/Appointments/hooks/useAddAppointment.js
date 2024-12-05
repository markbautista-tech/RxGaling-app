import React, { useState } from "react";

const useAddAppointment = () => {
  const [patientID, setPatientID] = useState(null);
  const [doctorID, setDoctorID] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);

  const dateObject = new Date(appointmentDate);
  const formattedDate = dateObject.toISOString().slice(0, 10);

  return {
    setPatientID,
    setDoctorID,
    setAppointmentDate,
  };
};

export default useAddAppointment;
