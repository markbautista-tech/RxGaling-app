import React from "react";
import { centralSupabase } from "../supabaseClient";

export async function pharmacyLogin(email, password) {
  try {
    const { data, error } = await centralSupabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error;
    } else {
      let user_role;
      const {
        data: [user_data],
        error,
      } = await centralSupabase.from("users").select().eq("email", email);

      if (!user_data) {
        if (data.user.user_metadata.role === "admin") {
          return data;
        }

        throw new Error("User data not found.");
      }

      let {
        first_name,
        gender,
        id,
        last_name,
        last_visited_pharmacy_id,
        middle_name,
        mobile_number,
        suffix,
      } = user_data;

      if (!last_visited_pharmacy_id) {
        const { data, error: pharmacy_staff_error } = await centralSupabase
          .from("pharmacy_staffs")
          .select()
          .eq("user_id", id)
          .limit(1); // Ensure only one item is fetched

        if (pharmacy_staff_error) {
          throw new Error(pharmacy_staff_error.message);
        }

        // Check if data exists and is not empty
        if (data && data.length > 0) {
          const { pharmacy_id, role } = data[0]; // Access the first item safely

          if (pharmacy_id) {
            const { error } = await centralSupabase
              .from("users")
              .update({ last_visited_pharmacy_id: pharmacy_id })
              .eq("id", id);

            if (error) {
              throw new Error(error.message);
            } else {
              last_visited_pharmacy_id = pharmacy_id;
              user_role = role;
            }
          }
        } else {
          throw new Error("No pharmacy staff data found for the given user.");
        }
      } else {
        const { data, error } = await centralSupabase
          .from("pharmacy_staffs")
          .select()
          .eq("user_id", id)
          .eq("pharmacy_id", last_visited_pharmacy_id)
          .limit(1);

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.length > 0) {
          user_role = data[0].role;
        } else {
          throw new Error(
            "No pharmacy staff data found for the given user and pharmacy."
          );
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
        pharmacy_id: last_visited_pharmacy_id,
        role: user_role,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchPharmacyAuth() {
  const { data, error } = await centralSupabase.auth.getUser();

  // Add a check for null or undefined user
  if (!data || !data.user) {
    return new Error("No user is currently logged in.");
  }

  let user_role;

  const {
    data: [user_data],
    error: userError,
  } = await centralSupabase.from("users").select().eq("email", data.user.email);

  if (userError) {
    throw new Error(userError.message);
  }

  // Ensure user_data is defined before destructuring
  if (!user_data) {
    if (data.user.user_metadata.role === "admin") {
      return data;
    }

    throw new Error("User data not found.");
  }

  let {
    first_name,
    gender,
    id,
    last_name,
    last_visited_pharmacy_id,
    middle_name,
    mobile_number,
    suffix,
  } = user_data;

  if (!last_visited_pharmacy_id) {
    const {
      data: [pharmacy_staff_data],
      error: pharmacy_staff_error,
    } = await centralSupabase
      .from("pharmacy_staffs")
      .select()
      .eq("user_id", id);
    const { pharmacy_id, role } = pharmacy_staff_data;

    if (pharmacy_id) {
      const { error } = await centralSupabase
        .from("users")
        .update({ last_visited_pharmacy_id: pharmacy_id })
        .eq("id", id);

      if (error) {
        throw new Error(error);
      } else {
        last_visited_pharmacy_id = pharmacy_id;
        user_role = role;
      }
    }
  } else {
    const {
      data: [pharmacy_staff_data],
      error,
    } = await centralSupabase
      .from("pharmacy_staffs")
      .select()
      .eq("user_id", id)
      .eq("pharmacy_id", last_visited_pharmacy_id);

    if (error) {
      throw new Error(error);
    } else {
      user_role = pharmacy_staff_data.role;
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
    email: data.user.email,
    pharmacy_id: last_visited_pharmacy_id,
    role: user_role,
  };
}
