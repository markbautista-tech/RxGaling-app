import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addAppointments = async (givendata) => {
  const appointment = {};
  try {
    const { data, error } = await centralSupabase
      .from("appointments")
      .insert([])
      .select();

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
};

export default addAppointments;
