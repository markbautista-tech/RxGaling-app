import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getDoctorAppointment = async (doctorId, date) => {
  try {
    const { data, error } = await centralSupabase
      .from("appointments")
      .select(`*, users(*), patient(*)`)
      .eq("doctor_id, appointment_date", doctorId, date);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export default getDoctorAppointment;