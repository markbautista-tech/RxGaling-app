import { useUser } from "@/context/UserContext";
import fetchMedicine from "@/utils/data/fetch/fetchMedicine";
import { getPharmacyID } from "@/utils/data/fetch/fetchUserPharmacies";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";

const useFetchMedicines = () => {
  const { ownerId } = useUser();
  const [medicines, setMedicines] = useState([]);
  const [medLoading, setMedLoading] = useState(false);
  const [pharID, setPharID] = useState([]);

  // Fetch pharmacy ID
  useEffect(() => {
    const fetchPharID = async () => {
      try {
        const pharmaID = await getPharmacyID(ownerId);
        setPharID(pharmaID);
      } catch (error) {
        console.error("Error fetching pharmacy ID:", error);
      }
    };

    if (ownerId) {
      fetchPharID();
    }
  }, [ownerId]);

  // Fetch medicines when pharmacy ID is available
  useEffect(() => {
    const getMedicines = async () => {
      if (!pharID[0]?.pharmacy_id) return; // Wait for pharmacy ID to be available

      setMedLoading(true);
      try {
        const meds = await fetchMedicine(pharID[0].pharmacy_id);
        setMedicines(meds);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setMedLoading(false);
      }
    };

    getMedicines();

    // Subscribe to Supabase changes
    const channel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "medicine_inventory" },
        (payload) => {
          console.log("Change received!", payload);
          getMedicines();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [pharID]);

  return { medicines, medLoading, pharID };
};

export default useFetchMedicines;
