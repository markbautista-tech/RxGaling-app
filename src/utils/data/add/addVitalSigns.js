import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addVitalSigns = async (vitals) => {
  try {
    const { data, error } = await centralSupabase
      .from("vital_signs")
      .insert([vitals])
      .select();

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

export default addVitalSigns;
