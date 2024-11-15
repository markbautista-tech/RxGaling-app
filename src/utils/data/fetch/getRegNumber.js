import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getRegNumber = async (owner_id) => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicRegistrationRequest")
      .select("*")
      .eq("owner_id", owner_id);

    if (error) {
      console.log("Error fetch registration number ", error);
    }

    return data[0].registration_number;
  } catch (error) {
    console.log("error catch reg num ", error);
  }
};

export default getRegNumber;
