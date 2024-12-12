import { getAppointmentByDoctor } from "@/utils/data/fetch/getAppointments";
import React, { useEffect, useState } from "react";

const useFetchDoctorAppt = () => {
  const [appointmentDoc, setAppointmentDoc] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = useState(null);
  const [doctorid, setDoctorId] = useState(null);

  const fetchedAppt = async () => {
    if (!doctorid || !date) return;
    setLoading(true);
    try {
      const appt = await getAppointmentByDoctor(doctorid, date);
      setAppointmentDoc(appt);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  useEffect(() => {
    fetchedAppt();
  }, [doctorid, date]); // Only execute when doctorid or date changes

  return {
    appointmentDoc,
    loading,
    setDate,
    setDoctorId,
  };
};

export default useFetchDoctorAppt;
