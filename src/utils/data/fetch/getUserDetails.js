import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const getUserEmail = async (userId) => {
  try {
    const { data: userEmail, error: userEmailError } = await centralSupabase
      .from("users")
      .select()
      .eq("id", userId);

    if (userEmailError) {
      return { error: userEmailError.message };
    } else {
      return { email: userEmail[0].email };
    }
  } catch (err) {
    return { err: err.message };
  }
};

export default getUserEmail;
