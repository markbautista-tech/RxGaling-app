import React from "react";
import { centralSupabase } from "../../supabaseClient";

const getClinicDetails = async (id) => {
  try {
    const { data, error } = await centralSupabase
      .from("clinics")
      .select("*")
      .eq("owner_id", id);

    if (error) {
      console.log("Error fetching clinic details", error);
    }
    return data;
  } catch (error) {}
};

export default getClinicDetails;

export const getCompleteClinicDetails = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("clinics")
      .select(
        `*, users(first_name, middle_name, last_name, suffix, addresses(region,province,city,barangay,address_line)), addresses(region, province, city, barangay, address_line)`
      );

    if (error) {
      console.log("Error fetching clinic details", error);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const getClinicData = async (clinicId) => {
  try {
    const { data, error } = await centralSupabase
      .from("clinics")
      .select()
      .eq("id", clinicId);

    if (error) {
      return { error: error.message };
    } else {
      return data[0].name;
    }
  } catch (err) {
    return { error: err.message };
  }
};
