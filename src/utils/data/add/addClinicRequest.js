import React from "react";
import { centralSupabase } from "../../supabaseClient";

const addClinicRequest = async (givenData) => {
  const dataSubmit = {
    owner_id: givenData.owner_id,
    status: "Requested",
  };

  try {
    const { data, error } = await centralSupabase
      .from("ClinicRegistrationRequest")
      .insert([dataSubmit])
      .select();

    if (error) {
      console.log("Error add request", error);
    } else {
      console.log("Successfull request submission.");
    }
  } catch (error) {
    console.log("Catch error add request");
  }
};

export default addClinicRequest;
