import { useQuery } from "@tanstack/react-query";
import { centralSupabase } from "../../supabaseClient";

// Function to fetch data from Supabase
const getUserDetails = async (user_id) => {
  const { data: [data], error } = await centralSupabase
  .from("users")
  .select(`
    id,
    first_name,
    middle_name,
    last_name,
    suffix,
    mobile_number,
    birthdate,
    gender,
    address: addresses (
      id,
      province,
      region,
      city,
      barangay,
      address_line
    )
  `)
  .eq("id", user_id);

  if (error) {
    throw error;
  }

  return data;
};

export const useUserDetails = (user_id) => {
  return useQuery({
    queryKey: ["user_details", user_id],
    queryFn: () => getUserDetails(user_id),
    enabled: !!user_id, // Ensures the query runs only if `user_id` is provided
  });
};

export default useUserDetails;
