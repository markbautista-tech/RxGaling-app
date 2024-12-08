import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";
import { format } from "date-fns";

const time = new Date();

const formattedTime = format(time, "hh:mm:ss a");

export const updateStart = async (id) => {
  try {
    const { data, error } = await centralSupabase
      .from("appointments")
      .update({ start_time: formattedTime })
      .eq("id", id);

    if (error) {
      return { error: error.message };
    } else {
      const { data, error } = await centralSupabase
        .from("appointments")
        .update({ status: "In Progress" })
        .eq("id", id);

      if (error) {
        return { error: error.message };
      }
    }

    return { data: data, error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateEndTime = async (id) => {
  try {
    const { data, error } = await centralSupabase
      .from("appointments")
      .update({ end_time: formattedTime })
      .eq("id", id);

    if (error) {
      return { error: error.message };
    } else {
      const { data, error } = await centralSupabase
        .from("appointments")
        .update({ status: "Completed" })
        .eq("id", id);

      if (error) {
        return { error: error.message };
      }
    }

    return { data: data, error: null };
  } catch (error) {
    return { error: error.message };
  }
};
