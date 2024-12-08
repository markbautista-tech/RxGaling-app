import React, { useState } from "react";

const useAddAppointment = () => {
  const [patientID, setPatientID] = useState(null);
  const [doctorID, setDoctorID] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);

  return {
    setPatientID,
    setDoctorID,
    setAppointmentDate,
  };
};

export default useAddAppointment;
