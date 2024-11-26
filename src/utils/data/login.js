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
      let user_role;
      const { data: [user_data], error } = await centralSupabase
        .from("users")
        .select()
        .eq("email", email);
      const { first_name, gender, id, last_name, last_visited_clinic_id, middle_name, mobile_number, suffix } = user_data;

      if(!last_visited_clinic_id){
        const { data: [clinic_staff_data], error: clinic_staff_error } = await centralSupabase
          .from("clinic_staffs")
          .select()
          .eq("user_id", id);
        const { clinic_id, role } = clinic_staff_data;

        if(clinic_id){
          const { error } = await centralSupabase
            .from("users")
            .update({ last_visited_clinic_id: clinic_id })
            .eq("id", id);
  
          if(error){
            throw new Error(error);
          }
          else{
            last_visited_clinic_id = clinic_id;
            user_role = role
          }
        }
      }
      else{
        const { data: [clinic_staff_data], error } = await centralSupabase
        .from("clinic_staffs")
          .select()
          .eq("user_id", id)
          .eq("clinic_id", last_visited_clinic_id);

        if(error){
          throw new Error(error);
          }
          else{
            user_role = clinic_staff_data.role;
          }
      }

      return {
        first_name, gender, id, last_name, middle_name, mobile_number, suffix, email,
        clinic_id: last_visited_clinic_id,
        role: user_role
      };
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchAuth() {
  const { data, error } = await centralSupabase.auth.getUser();

  return error ? { error: "Unauthorized" } : data;
}
