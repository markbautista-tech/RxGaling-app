import React from "react";
import { centralSupabase } from "../../supabaseClient";

const getClinicRequest = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicRegistrationRequest")
      .select("*, ClinicOwnerDetails(first_name, middle_name, last_name)")
      .eq("status", "Requested");

    if (error) {
      console.log("Error fetching clinic request", error);
    }

    return data;
  } catch (error) {
    console.log("Catch Error clinic request", error);
  }
};

export default getClinicRequest;
