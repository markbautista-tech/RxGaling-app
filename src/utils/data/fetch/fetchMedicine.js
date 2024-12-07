import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const fetchMedicine = async (phId) => {
  try {
    const { data, error } = await centralSupabase
      .from("medicine_inventory")
      .select("*")
      .eq("pharmacy_id", phId);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (err) {
    return { error: err };
  }
};

export default fetchMedicine;
