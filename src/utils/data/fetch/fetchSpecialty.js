import React, { useEffect, useState } from "react";
import { centralSupabase } from "../../supabaseClient";

const fetchSpecialty = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("Specialty")
      .select(`*, UserDetails(id)`);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log("Error fetching specialty", error);
  }
};

export default fetchSpecialty;
