import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const countClinicReq = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicRegistrationRequest")
      .select("*")
      .eq("status", "Requested");

    if (error) {
      console.log(error);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default countClinicReq;
