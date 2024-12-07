import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const fetchPharmacyClinic = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("clinic_pharmacy")
      .select(`*, pharmacy(*)`);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (err) {
    return { error: err };
  }
};

export default fetchPharmacyClinic;

export const selectPharmaClinic = async (pharmacyid) => {
  try {
    const { data, error } = await centralSupabase
      .from("clinic_pharmacy")
      .select("*")
      .eq("pharmacy_id", pharmacyid);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (err) {
    return { error: err };
  }
};
