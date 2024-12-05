import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const addSchedule = async (workingdays, workinghours, id, updated_at) => {
  try {
    const { data, error } = await centralSupabase
      .from("clinic_staffs")
      .update({
        working_days: workingdays,
        working_hours: workinghours,
        updated_at: updated_at,
      })
      .eq("user_id", id);

    if (error) {
      return { error: error.message };
    }

    return { success: "Schedule set successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

export default addSchedule;
