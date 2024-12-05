import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getPharmacyDetails = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("pharmacy")
      .select(`*, users(*, addresses(*)), addresses(*)`);

    if (error) {
      console.log("Error fetching pharmacy details", error);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export default getPharmacyDetails;
