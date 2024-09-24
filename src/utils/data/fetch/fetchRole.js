import React, { useEffect, useState } from "react";
import { centralSupabase } from "../../supabaseClient";

const fetchRole = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicRoles")
      .select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.log("Error fecthing clinic role", error);
  }
};

export default fetchRole;
