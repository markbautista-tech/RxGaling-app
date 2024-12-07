import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getAppointments = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("appointments")
      .select(`*, patients(*), users(*)`);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (err) {
    return { error: err };
  }
};

export default getAppointments;

export const getAppointmentByDoctor = async (doctorId) => {
  try {
    const { data, error } = await centralSupabase
      .from("appointments")
      .select(`*, doctor_details(*), patients(*)`)
      .eq("doctor_id", doctorId);

    if (error) {
      return { error: error.message };
    }
  } catch (err) {
    return { error: err };
  }
};
