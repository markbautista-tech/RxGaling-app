import React from "react";
import { centralSupabase } from "../supabaseClient";

export async function login(email, password) {
  try {
    const { data: authData, error: authError } =
      await centralSupabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      throw new Error(authError.message);
    }

    let userRole;
    const { data: users, error: userError } = await centralSupabase
      .from("users")
      .select()
      .eq("email", email);

    if (userError) {
      throw new Error(userError.message);
    }

    const userData = users[0];
    if (!userData) {
      if (authData.user?.user_metadata?.role === "admin") {
        return authData;
      }
      throw new Error("User data not found.");
    }

    let {
      first_name,
      gender,
      id,
      last_name,
      last_visited_clinic_id,
      last_visited_pharmacy_id,
      middle_name,
      mobile_number,
      suffix,
    } = userData;

    if (last_visited_clinic_id === null && last_visited_pharmacy_id === null) {
      // Fetch clinic staff role
      const { data: clinicStaff, error: clinicStaffError } =
        await centralSupabase.from("clinic_staffs").select().eq("user_id", id);

      if (clinicStaffError) {
        throw new Error(clinicStaffError.message);
      }

      if (clinicStaff?.length > 0) {
        const { clinic_id, role } = clinicStaff[0];
        last_visited_clinic_id = clinic_id;

        const { error: updateError } = await centralSupabase
          .from("users")
          .update({ last_visited_clinic_id: clinic_id })
          .eq("id", id);

        if (updateError) {
          throw new Error(updateError.message);
        }

        userRole = role;
      } else {
        // Fetch pharmacy staff role if no clinic role exists
        const { data: pharmacyStaff, error: pharmacyStaffError } =
          await centralSupabase
            .from("pharmacy_staffs")
            .select()
            .eq("user_id", id);

        if (pharmacyStaffError) {
          throw new Error(pharmacyStaffError.message);
        }

        if (pharmacyStaff?.length > 0) {
          const { pharmacy_id, role } = pharmacyStaff[0];
          last_visited_pharmacy_id = pharmacy_id;

          const { error: updateError } = await centralSupabase
            .from("users")
            .update({ last_visited_pharmacy_id: pharmacy_id })
            .eq("id", id);

          if (updateError) {
            throw new Error(updateError.message);
          }

          userRole = role;
        } else {
          userRole = authData.user.user_metadata.role;
        }
      }
      console.log(last_visited_clinic_id);
    } else {
      const { data: clinicStaff, error: clinicError } = await centralSupabase
        .from("clinic_staffs")
        .select()
        .eq("user_id", id)
        .eq("clinic_id", last_visited_clinic_id);

      if (clinicError) {
        throw new Error(clinicError.message);
      }

      if (clinicStaff?.length > 0) {
        userRole = clinicStaff[0].role;
      } else {
        const { data: pharmacyStaff, error: pharmacyError } =
          await centralSupabase
            .from("pharmacy_staffs")
            .select()
            .eq("user_id", id)
            .eq("pharmacy_id", last_visited_pharmacy_id);

        if (pharmacyError) {
          throw new Error(pharmacyError.message);
        }

        if (pharmacyStaff?.length > 0) {
          userRole = pharmacyStaff[0].role;
        } else {
          userRole = authData.user.user_metadata.role;
        }
      }
    }

    return {
      first_name,
      gender,
      id,
      last_name,
      middle_name,
      mobile_number,
      suffix,
      email,
      clinic_id: last_visited_clinic_id,
      pharmacy_id: last_visited_pharmacy_id,
      role: userRole,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "An error occurred during login.");
  }
}

export async function fetchAuth() {
  try {
    const { data: authData, error: authError } =
      await centralSupabase.auth.getUser();

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData?.user) {
      throw new Error("No user is currently logged in.");
    }

    const { data: users, error: userError } = await centralSupabase
      .from("users")
      .select()
      .eq("email", authData.user.email);

    if (userError) {
      throw new Error(userError.message);
    }

    const userData = users[0];
    if (!userData) {
      if (authData.user.user_metadata.role === "admin") {
        return authData;
      }
      throw new Error("User data not found.");
    }

    let {
      first_name,
      gender,
      id,
      last_name,
      last_visited_clinic_id,
      last_visited_pharmacy_id,
      middle_name,
      mobile_number,
      suffix,
    } = userData;

    let userRole;

    // Handle clinic staff logic
    if (last_visited_clinic_id) {
      const { data: clinicStaff, error: clinicError } = await centralSupabase
        .from("clinic_staffs")
        .select()
        .eq("user_id", id)
        .eq("clinic_id", last_visited_clinic_id || null);

      if (clinicError) {
        throw new Error(clinicError.message);
      }

      if (clinicStaff?.length > 0) {
        userRole = clinicStaff[0].role;
      }
    }

    // Handle pharmacy staff logic
    if (last_visited_pharmacy_id) {
      const { data: pharmacyStaff, error: pharmacyError } =
        await centralSupabase
          .from("pharmacy_staffs")
          .select()
          .eq("user_id", id)
          .eq("pharmacy_id", last_visited_pharmacy_id || null);

      if (pharmacyError) {
        throw new Error(pharmacyError.message);
      }

      if (pharmacyStaff?.length > 0) {
        userRole = pharmacyStaff[0].role;
      }
    }

    // Fallback logic for missing last_visited_clinic_id or last_visited_pharmacy_id
    if (!last_visited_clinic_id && !last_visited_pharmacy_id) {
      // Try fetching clinic staff role
      const { data: clinicStaff, error: clinicStaffError } =
        await centralSupabase.from("clinic_staffs").select().eq("user_id", id);

      if (clinicStaffError) {
        throw new Error(clinicStaffError.message);
      }

      if (clinicStaff?.length > 0) {
        const { clinic_id, role } = clinicStaff[0];
        last_visited_clinic_id = clinic_id;

        const { error: updateError } = await centralSupabase
          .from("users")
          .update({ last_visited_clinic_id: clinic_id || null }) // Avoid invalid bigint syntax
          .eq("id", id);

        if (updateError) {
          throw new Error(updateError.message);
        }

        userRole = role;
      } else {
        // Try fetching pharmacy staff role
        const { data: pharmacyStaff, error: pharmacyStaffError } =
          await centralSupabase
            .from("pharmacy_staffs")
            .select()
            .eq("user_id", id);

        if (pharmacyStaffError) {
          throw new Error(pharmacyStaffError.message);
        }

        if (pharmacyStaff?.length > 0) {
          const { pharmacy_id, role } = pharmacyStaff[0];
          last_visited_pharmacy_id = pharmacy_id;

          const { error: updateError } = await centralSupabase
            .from("users")
            .update({ last_visited_pharmacy_id: pharmacy_id || null }) // Avoid invalid bigint syntax
            .eq("id", id);

          if (updateError) {
            throw new Error(updateError.message);
          }

          userRole = role;
        }
      }
    }

    return {
      first_name,
      gender,
      id,
      last_name,
      middle_name,
      mobile_number,
      suffix,
      email: authData.user.email,
      clinic_id: last_visited_clinic_id || null,
      pharmacy_id: last_visited_pharmacy_id || null,
      role: userRole,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || "An error occurred during authentication."
    );
  }
}
