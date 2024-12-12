import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const medicineDispense = async (quantity, id) => {
  try {
    const { data, error } = await centralSupabase
      .from("medicine_inventory")
      .update({ quantity: quantity })
      .eq("id", id);

    if (error) {
      return { error: error.message };
    }

    return { success: data };
  } catch (error) {
    return { error: error };
  }
};

export default medicineDispense;
