import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addAppointments = async (givendata) => {
  try {
    const { data, error } = await centralSupabase
      .from("appointments")
      .insert([givendata])
      .select();

    if (error) {
      return { error: error.message };
    }

    return { success: data };
  } catch (err) {
    return { error: err.message };
  }
};

export default addAppointments;
