import React, { useEffect, useState } from "react";
import { centralSupabase } from "../../supabaseClient";

const getClinicRequest = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("clinics")
      .select("*, users(first_name, middle_name, last_name)")
      .eq("status", "Unverified");

    if (error) {
      console.log("Error fetching clinic request", error);
    } else {
      return data;
    }
  } catch (error) {
    console.log("Catch Error clinic request", error);
  }
};

export default getClinicRequest;
