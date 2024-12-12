import { fetchAllMedicine } from "@/utils/data/fetch/fetchMedicine";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";

const useMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [medLoading, setMedLoading] = useState(false);

  const fetchMedicines = async () => {
    setMedLoading(true);
    const meds = await fetchAllMedicine();

    setMedicines(meds);

    setMedLoading(false);
  };

  useEffect(() => {
    fetchMedicines();

    const channel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "medicine_inventory" },
        (payload) => {
          console.log("Change received!", payload);
          fetchMedicines();
        }
      )
      .subscribe();

    return () => {
      centralSupabase.removeAllChannels();
    };
  }, []);

  return {
    medicines,
    medLoading,
  };
};

export default useMedicines;
