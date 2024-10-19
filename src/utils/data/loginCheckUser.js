import React from "react";
import { centralSupabase } from "../supabaseClient";

export const loginCheckUser = async (givenEmail) => {
  try {
    const { data, error } = await centralSupabase
      .from("UserRoles")
      .select("role")
      .eq("user_email", givenEmail);

    if (error) {
      console.error("Error fetching user roles:", error);
    }
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Catch error check user role", error);
  }
};
