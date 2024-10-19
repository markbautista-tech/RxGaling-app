import React from "react";
import { centralSupabase } from "../../supabaseClient";

export const getClinicPermit = (uid) => {
  try {
    const { data, error } = centralSupabase.storage
      .from("Clinic_Storage")
      .getPublicUrl(`${uid}/permit/${uid}-permit.jpg`);

    if (error) throw error;

    return data;
  } catch (error) {}
};

export const getClinicBIR = (uid) => {
  try {
    const { data, error } = centralSupabase.storage
      .from("Clinic_Storage")
      .getPublicUrl(`${uid}/bir/${uid}-bir.jpg`);

    if (error) throw error;

    return data;
  } catch (error) {}
};

export const getClinicPic = (uid) => {
  try {
    const { data, error } = centralSupabase.storage
      .from("Clinic_Storage")
      .getPublicUrl(`${uid}/clinic_pic/${uid}-clinic_pic.jpg`);

    if (error) throw error;

    return data;
  } catch (error) {}
};
