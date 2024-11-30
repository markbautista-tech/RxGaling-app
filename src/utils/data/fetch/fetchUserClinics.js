import { useQuery } from "@tanstack/react-query";
import { centralSupabase } from "../../supabaseClient";

// Function to fetch data from Supabase
const getUserClinics = async (user_id) => {
  const { data, error } = await centralSupabase
    .from("clinic_staffs")
    .select(`
      clinics!inner (
        id,
        name
      )
    `)
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  const clinics = data.map((item) => item.clinics);
  return clinics;
};

export const useUserClinics = (user_id) => {
  return useQuery({
    queryKey: ["user_clinics", user_id],
    queryFn: () => getUserClinics(user_id),
    enabled: !!user_id, // Ensures the query runs only if `user_id` is provided
  });
};

export default useUserClinics;
