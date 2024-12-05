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

export const getUserData = async () => {
  try {
    const { data: userData, error: userDataError } = await centralSupabase
      .from("users")
      .select();

    if (userDataError) {
      return { error: userDataError.message };
    } else {
      return userData;
    }
  } catch (err) {
    return { err: err.message };
  }
};
