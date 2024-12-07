import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addMedicine = async (meds) => {
  try {
    const { data, error } = await centralSupabase
      .from("medicine_inventory")
      .insert([meds])
      .select();

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export default addMedicine;
