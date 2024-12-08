import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getVitalSigns = async (patientid) => {
  try {
    const { data, error } = await centralSupabase
      .from("vital_signs")
      .select(`*, patients(*), users(*), clinics(*)`)
      .eq("patient_id", patientid);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error };
  }
};

export default getVitalSigns;
