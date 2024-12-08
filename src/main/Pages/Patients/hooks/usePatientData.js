import getPatientDetails from "@/utils/data/fetch/getPatientDetails";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";

const usePatientData = () => {
  const [patientData, setPatientData] = useState([]);

  const fetchPatientData = async () => {
    const patient_data = await getPatientDetails();
    setPatientData(patient_data);
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
  };
};

export default usePatientData;
