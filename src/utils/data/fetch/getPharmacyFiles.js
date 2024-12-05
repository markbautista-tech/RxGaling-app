import React from "react";
import { centralSupabase } from "../../supabaseClient";

export const getFDA = async (name) => {
  try {
    const { data, error } = await centralSupabase.storage
      .from("Pharmacy_Storage")
      .getPublicUrl(`${name}/fda/${name}-fda.jpg`);

    if (error) throw error;

    return data;
  } catch (error) {}
};

export const getPic = async (name) => {
  try {
    const { data, error } = await centralSupabase.storage
      .from("Pharmacy_Storage")
      .getPublicUrl(`${name}/pic/${name}-pic.jpg`);

    if (error) throw error;

    return data;
  } catch (error) {}
};
