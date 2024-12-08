import { useQuery } from "@tanstack/react-query";
import { centralSupabase } from "../../supabaseClient";

// Function to fetch data from Supabase
const getUserPharmacies = async (user_id) => {
  const { data, error } = await centralSupabase
    .from("pharmacy_staffs")
    .select(
      `
      pharmacy!inner (
        id,
        name
      )
    `
    )
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  const pharmacies = data.map((item) => item.pharmacy);
  return pharmacies;
};

export const useUserPharmacies = (user_id) => {
  return useQuery({
    queryKey: ["user_pharmacies", user_id],
    queryFn: () => getUserPharmacies(user_id),
    enabled: !!user_id, // Ensures the query runs only if `user_id` is provided
  });
};

export default useUserPharmacies;

export const getAllUsersPharmacies = async () => {
  const { data, error } = await centralSupabase
    .from("pharmacy_staffs")
    .select(
      "*, users(first_name, middle_name, last_name, suffix, birthdate, mobile_number, email)"
    );

  if (error) {
    return { error: error.message };
  }

  return data;
};

export const getClinicDoctor = async () => {
  const { data, error } = await centralSupabase.from("clinic_staffs").select(
    `*, 
      clinics(name),
      users(
        *,
        addresses(region,province,city,barangay,address_line),
        doctor_details(*)
      )`
  );

  if (error) {
    return { error: error.message };
  }

  return data;
};

export const getPharmacyID = async (ownerid) => {
  try {
    const { data, error } = await centralSupabase
      .from("pharmacy_staffs")
      .select("pharmacy_id")
      .eq("user_id", ownerid);

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (err) {
    return { error: err };
  }
};
