import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const fetchSOAPNote = async (patientid) => {
  try {
    const { data, error } = await centralSupabase
      .from("soap_note")
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

export default fetchSOAPNote;
