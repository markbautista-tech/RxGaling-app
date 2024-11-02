import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getRegNumber = async (owner_id) => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicRegistrationRequest")
      .select("registration_number")
      .eq("owner_id", owner_id);

    if (error) {
      console.log("Error fetch registration number ", error);
    }

    return data;
  } catch (error) {
    console.log("error catch reg num ", error);
  }
};

export default getRegNumber;
