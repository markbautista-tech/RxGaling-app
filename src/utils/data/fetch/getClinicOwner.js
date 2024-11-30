import React from "react";
import { centralSupabase } from "../../supabaseClient";

const getClinicOwner = async (id) => {
  try {
    const { data, error } = await centralSupabase
      .from("users")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log("Error fetching clinic owner details", error);
    }
    return data;
  } catch (error) {
    console.log("Error get clinic owner details", error);
  }
};

export default getClinicOwner;
