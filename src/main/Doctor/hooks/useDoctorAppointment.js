import { useState, useEffect } from "react";
import getDoctorAppointment from "@/utils/data/fetch/getDoctorAppointment";
import { centralSupabase } from "@/utils/supabaseClient";

const useDoctorAppointment = () => {
  const [appointment, setAppointment] = useState(null); // Initialize as null or empty array
  const [loading, setLoading] = useState(false);
  const [doctorID, setDoctorID] = useState(null); // Initialize as null to indicate no selection
  const [date, setDate] = useState(null); // Initialize as null for no default date

  const fetchAppointment = async () => {
    if (!doctorID || !date) return; // Ensure doctorID and date are set

    setLoading(true);

    try {
      const appointmentData = await getDoctorAppointment(doctorID, date);
      setAppointment(appointmentData);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments when doctorID or date changes
  useEffect(() => {
    fetchAppointment();

    const channels = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        (payload) => {
          console.log("Change received!", payload);
          fetchAppointment();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [doctorID, date]);

  return {
    appointment,
    loading,
    setDoctorID,
    setDate,
  };
};

export default useDoctorAppointment;
