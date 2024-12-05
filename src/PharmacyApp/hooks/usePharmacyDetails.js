import getPharmacyDetails from "@/utils/data/fetch/getPharmacyDetails";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";

const usePharmacyDetails = () => {
  const [pharmacyDetails, setPharmacyDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [unverifiedCount, setUnverifiedCount] = useState(0);
  const [requestData, setRequestData] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const pharmacy = await getPharmacyDetails();
      setPharmacyDetails(pharmacy);
      // Count unverified pharmacies after fetching data
      const unverifiedPharmacies = pharmacy.filter(
        (pharm) => pharm.status === "Unverified"
      );
      setUnverifiedCount(unverifiedPharmacies.length);

      setRequestData(unverifiedPharmacies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const channels = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pharmacy" },
        (payload) => {
          // Update unverified count if the change affects pharmacy status
          if (payload.new.status === "Unverified" && !payload.old.status) {
            setUnverifiedCount((prevCount) => prevCount + 1);
          } else if (
            payload.old.status === "Unverified" &&
            !payload.new.status
          ) {
            setUnverifiedCount((prevCount) => prevCount - 1);
          }

          fetchData();
        }
      )
      .subscribe();

    return () => {
      centralSupabase.removeChannel(channels);
    };
  }, []);

  return { pharmacyDetails, loading, unverifiedCount, requestData };
};

export default usePharmacyDetails;
