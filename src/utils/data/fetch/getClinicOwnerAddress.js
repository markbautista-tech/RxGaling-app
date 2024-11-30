import React from "react";
import { centralSupabase } from "../../supabaseClient";

const getClinicOwnerAddress = async () => {
  try {
    const { data, error } = await centralSupabase.from("addresses").select("*");

    if (error) {
      console.log("Error fetching clinic owner address", error);
    }

    return data;
  } catch (error) {
    console.log("Error catch clinic owner address", error);
  }
};

export default getClinicOwnerAddress;
