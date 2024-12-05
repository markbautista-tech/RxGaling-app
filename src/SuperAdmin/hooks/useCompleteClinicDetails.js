import { getCompleteClinicDetails } from "@/utils/data/fetch/getClinicDetails";
import { centralSupabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

const useCompleteClinicDetails = () => {
  const [clinicDetails, setClinicDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch clinic details on component mount
    const fetchClinicDetails = async () => {
      setLoading(true);
      const clinic = await getCompleteClinicDetails();
      setClinicDetails(clinic);
      setLoading(false);
    };

    fetchClinicDetails();

    const channel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clinics" },
        (payload) => {
          fetchClinicDetails();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      centralSupabase.removeChannel(channel);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return {
    clinicDetails,
    loading,
  };
};

export default useCompleteClinicDetails;
