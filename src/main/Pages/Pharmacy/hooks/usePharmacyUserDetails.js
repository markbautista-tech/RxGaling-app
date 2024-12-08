import { useEffect, useState } from "react";
import { getAllUsersPharmacies } from "@/utils/data/fetch/fetchUserPharmacies";
import { centralSupabase } from "@/utils/supabaseClient";

const usePharmacyUserDetails = () => {
  const [pharmacyUser, setPharmacyUser] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchData = async () => {
    try {
      const users = await getAllUsersPharmacies();
      setPharmacyUser(users);
    } catch (err) {
      setError("Failed to fetch pharmacy user");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Subscribe to real-time updates
    const channel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pharmacy_staffs" },
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
    pharmacyUser,
    loading,
    error,
  };
};

export default usePharmacyUserDetails;
