import React from "react";
import { centralSupabase } from "../../supabaseClient";

const addClinicRequest = async (givenData) => {
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  const dataSubmit = {
    owner_id: givenData.owner_id,
    status: "Requested",
    registration_number: `${randomNumber}${currentDate}`,
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
