import getVitalSigns from "@/utils/data/fetch/getVitalSigns";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";

const useGetVitals = (id) => {
  const [vitals, setVitals] = useState([]);
  const [vitalLoading, setVitalLoading] = useState(false);

  const fetchVitals = async () => {
    setVitalLoading(true);
    const v = await getVitalSigns(id);

    setVitals(v);

    setVitalLoading(false);
  };

  useEffect(() => {
    fetchVitals();

    const channels = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vital_signs" },
        (payload) => {
          console.log("Change received!", payload);
          fetchVitals();
        }
      )
      .subscribe();

    return () => {
      centralSupabase.removeAllChannels();
    };
  }, [id]);

  return {
    vitals,
    vitalLoading,
  };
};

export default useGetVitals;
