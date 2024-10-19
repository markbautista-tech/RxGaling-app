import React from "react";
import { centralSupabase } from "../../supabaseClient";

const addClinicAddress = async (givenData) => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicAddress")
      .insert([givenData])
      .select();

    if (error) {
      console.log("Error inserting clinic address", error);
    } else {
      console.log("Successfull add clinic address.");
    }
  } catch (error) {
    console.log("catch error inserting clinic address", error);
  }
};

export default addClinicAddress;
