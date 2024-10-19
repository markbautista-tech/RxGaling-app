import React from "react";
import { centralSupabase } from "../../supabaseClient";

export const addClinicOwnerAddress = async (givenData) => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicOwnerAddress")
      .insert(givenData)
      .select();

    if (error) {
      console.log("Error inserting clinic owner address", error);
    }
  } catch (error) {
    console.log("catch error owner address", error);
  }
};
