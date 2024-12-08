import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const fetchPrescription = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("prescription")
      .select(`*, patients(*), users(*), clinics(*)`);

    if (error) {
      return { error: error.message };
    }
  } catch (error) {
    return { error: error };
  }
};

export default fetchPrescription;

export const fetchPrescriptionWithId = async (id) => {
  try {
    const { data, error } = await centralSupabase
      .from("prescription")
      .select(`*, patients(*), users(*), clinics(*)`)
      .eq("patient_id", id);

    if (error) {
      return { error: error.message };
    }
  } catch (error) {
    return { error: error };
  }
};
