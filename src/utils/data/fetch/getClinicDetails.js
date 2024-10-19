import React from "react";
import { centralSupabase } from "../../supabaseClient";

const getClinicDetails = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicDetails")
      .select("*, ClinicOwnerDetails(id)");

    if (error) {
      console.log("Error fetching clinic details", error);
    }

    return data;
  } catch (error) {}
};

export default getClinicDetails;
