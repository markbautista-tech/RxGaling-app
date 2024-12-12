import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getDoctorDetails = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("doctor_details")
      .select(`*, users(*)`);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export default getDoctorDetails;
