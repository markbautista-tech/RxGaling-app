import getAppointments from "@/utils/data/fetch/getAppointments";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const appt = await getAppointments();
      setAppointments(appt);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();

    const channels = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        (payload) => {
          console.log("Change received!", payload);
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      centralSupabase.removeAllChannels();
    };
  }, []);

  return {
    appointments,
    loading,
    setDate,
    date,
  };
};

export default useAppointments;
