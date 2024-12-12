import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const updateDocOnline = async (id, online) => {
  try {
    const { data, error } = await centralSupabase
      .from("doctor_details")
      .update({ is_absent: online })
      .eq("user_id", id);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error };
  }
};

export default updateDocOnline;
