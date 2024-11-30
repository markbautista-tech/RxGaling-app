import React from "react";
import { centralSupabase } from "../../supabaseClient";

const getAddresses = async (id) => {
  try {
    const { data, error } = await centralSupabase
      .from("addresses")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log("Error fetching address", error);
    }

    return data;
  } catch (error) {
    console.log("Error catch address", error);
  }
};

export default getAddresses;
