import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

const inviteNewStaff = async (email, clinicId, role) => {
  try {
    const { data: staff, error: staffError } = await centralSupabase
      .from("users")
      .insert({ email: email })
      .select();

    if (staffError) {
      return { error: staffError.message };
    } else {
      const { data: clinicStaff, error: clinicStaffError } =
        await centralSupabase.from("clinic_staffs").insert({
          clinic_id: clinicId,
          user_id: staff[0].id,
          role: role,
          status: "Pending",
        });

      if (clinicStaffError) {
        return { error: clinicStaffError };
      } else {
      }

      return { success: "Invitation sent successfully", userID: staff[0].id };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export default inviteNewStaff;
