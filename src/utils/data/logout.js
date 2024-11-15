import React from "react";
import { centralSupabase } from "../supabaseClient";

export async function logout() {
  try {
    const { error } = await centralSupabase.auth.signOut();

    if (!error) {
      return "success";
    }
  } catch (error) {
    throw error;
  }
}
