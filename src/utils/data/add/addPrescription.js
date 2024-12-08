import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addPrescription = async (prescribe) => {
  try {
    const { data, error } = await centralSupabase
      .from("prescription")
      .insert([prescribe])
      .select();

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export default addPrescription;
