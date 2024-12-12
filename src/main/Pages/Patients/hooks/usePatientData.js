import getPatientDetails from "@/utils/data/fetch/getPatientDetails";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";

const usePatientData = () => {
  const [patientData, setPatientData] = useState([]);
  const [patientLoading, setPatientLoading] = useState(false);

  const fetchPatientData = async () => {
    setPatientLoading(true);
    const patient_data = await getPatientDetails();
    setPatientData(patient_data);
    setPatientLoading(false);
  };

  useEffect(() => {
    fetchPatientData();

    // Set up Supabase channel to listen for changes
    const channel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "patients" },
        (payload) => {
          console.log("Change received!", payload);
          fetchPatientData();
        }
      )
      .subscribe();

    return () => {
      centralSupabase.removeAllChannels();
    };
  }, []);

  return {
    patientData,
    patientLoading,
  };
};

export default usePatientData;
