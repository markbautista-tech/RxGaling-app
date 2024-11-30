import React from "react";
import { centralSupabase } from "../../supabaseClient";

export const getClinicPermit = (name) => {
  try {
    const { data, error } = centralSupabase.storage
      .from("Clinic_Storage")
      .getPublicUrl(`${name}/permit/${name}-permit.jpg`);

    if (error) throw error;

    return data;
  } catch (error) {}
};

export const getClinicBIR = (name) => {
  try {
    const { data, error } = centralSupabase.storage
      .from("Clinic_Storage")
      .getPublicUrl(`${name}/bir/${name}-bir.jpg`);

    if (error) throw error;

    return data;
  } catch (error) {}
};

export const getClinicPic = (name) => {
  try {
    const { data, error } = centralSupabase.storage
      .from("Clinic_Storage")
      .getPublicUrl(`${name}/clinic_pic/${name}-clinic_pic.jpg`);

    if (error) throw error;

    return data;
  } catch (error) {}
};
