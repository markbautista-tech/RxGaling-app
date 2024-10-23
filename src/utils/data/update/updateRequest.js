import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";
import { useNavigate } from "react-router-dom";

export const declineRequest = async (ownerId) => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicRegistrationRequest")
      .update({ status: "Decline" })
      .eq("owner_id", ownerId);

    if (error) {
      return error;
    }

    return "success";
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = async (ownerId) => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicRegistrationRequest")
      .update({ status: "Accepted" })
      .eq("owner_id", ownerId);

    if (error) {
      return error;
    }

    return "success";
  } catch (error) {
    console.log(error);
  }
};
