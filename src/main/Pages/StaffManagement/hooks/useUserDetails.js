import { useEffect, useState } from "react";
import { getAllUsersClinics } from "@/utils/data/fetch/fetchUserClinics";
import { centralSupabase } from "@/utils/supabaseClient";

const useUserDetails = () => {
  const [userClinics, setUserClinics] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsersClinics();
        setUserClinics(users);
      } catch (err) {
        setError("Failed to fetch user clinics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Subscribe to real-time updates
    const channel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clinic_staffs" },
        (payload) => {
          console.log("Change received!", payload);
          fetchData(); // Refresh data upon change
        }
      )
      .subscribe();

    // Cleanup function to unsubscribe on unmount
    return () => {
      centralSupabase.removeChannel(channel);
    };
  }, []);

  return {
    userClinics,
    loading,
    error,
  };
};

export default useUserDetails;
