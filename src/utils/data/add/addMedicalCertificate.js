import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addMedicalCertificate = async (cert) => {
  try {
    const { data, error } = await centralSupabase
      .from("medical_certificate")
      .insert([cert])
      .select();

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error };
  }
};

export default addMedicalCertificate;
