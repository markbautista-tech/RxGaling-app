import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getPatientDetails = async () => {
  const { data: patientdata, error: patienterror } = await centralSupabase
    .from("patients")
    .select(`*, addresses(region, province, city, barangay, address_line)`);

  if (patienterror) {
    console.log("Patient data error: ", patienterror);
  } else {
    return patientdata;
  }
};

export default getPatientDetails;

export const getPatientById = async (id) => {
  try {
    const { data: patientdata, error: patienterror } = await centralSupabase
      .from("patients")
      .select("*")
      .eq("id", id);

    if (patienterror) {
      return { error: patienterror.message };
    }

    return patientdata;
  } catch (error) {
    return { error: error.message };
  }
};
