import React from "react";
import { centralSupabase } from "../../supabaseClient";

const getClinicAddress = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicAddress")
      .select("*, ClinicDetails(id)");

    if (error) {
      console.log("Error fetching clinic address");
    }

    return data;
  } catch (error) {}
};

export default getClinicAddress;
