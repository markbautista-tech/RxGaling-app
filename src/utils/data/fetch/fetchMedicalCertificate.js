import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const fetchMedicalCertificate = async (patientid) => {
  try {
    const { data, error } = await centralSupabase
      .from("medical_certificate")
      .select(`*, patients(*), users(*), clinics(*)`)
      .eq("patient_id", patientid);

    if (error) {
      return { error: error.message };
    }
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export default fetchMedicalCertificate;
