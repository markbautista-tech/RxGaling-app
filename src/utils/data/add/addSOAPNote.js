import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addSOAPNote = async (soap) => {
  try {
    const { data, error } = await centralSupabase
      .from("soap_note")
      .insert([soap])
      .select();

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error };
  }
};

export default addSOAPNote;
