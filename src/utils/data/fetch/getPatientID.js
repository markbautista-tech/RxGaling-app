import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getPatientID = async () => {
  const { data: patientIDData, error: patientIDError } = await centralSupabase
    .from("patients")
    .select("id_number")
    .order("created_at", { ascending: false })
    .limit(1); // Get only the last inserted record

  if (patientIDError) {
    return { error: patientIDError };
  }

  return patientIDData?.[0];
};

export default getPatientID;
