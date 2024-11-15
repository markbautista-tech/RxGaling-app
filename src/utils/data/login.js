import React from "react";
import { centralSupabase } from "../supabaseClient";

export async function login(email, password) {
  try {
    const { data, error } = await centralSupabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error;
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchAuth() {
  const { data, error } = await centralSupabase.auth.getUser();

  return error ? { error: "Unauthorized" } : data;
}
