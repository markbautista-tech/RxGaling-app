import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addPharmacyClinic = async (givendata) => {
  const ids = {
    pharmacy_id: givendata.pharmacy_id,
    clinic_id: givendata.clinic_id,
  };

  try {
    const { data, error } = await centralSupabase
      .from("clinic_pharmacy")
      .insert([ids])
      .select();

    if (error) {
      return { error: error.message };
    }
    return { success: data };
  } catch (err) {
    return { error: err };
  }
};

export default addPharmacyClinic;
