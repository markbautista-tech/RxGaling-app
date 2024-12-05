import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addClinicUser = async (email, password) => {
  try {
    const { data, error } = await centralSupabase.auth.signUp({
      email: email,
      password: password,
      options: {},
      redirectTo: "http://localhost:3000/",
    });

    if (error) {
      return "Error Signing up clinic owner: ", error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default addClinicUser;
