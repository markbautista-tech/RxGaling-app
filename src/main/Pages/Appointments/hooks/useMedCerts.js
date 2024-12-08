import fetchMedicalCertificate from "@/utils/data/fetch/fetchMedicalCertificate";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect } from "react";

const useMedCerts = (id) => {
  const [medCerts, setMedCerts] = React.useState([]);
  const [certsLoading, setCertsLoading] = React.useState(false);

  const fetchMedCerts = async () => {
    setCertsLoading(true);
    const medcert = await fetchMedicalCertificate(id);

    setMedCerts(medcert);
    setCertsLoading(false);
  };

  useEffect(() => {
    fetchMedCerts();

    const channels = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "medical_certificate" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return {
    medCerts,
    certsLoading,
  };
};

export default useMedCerts;
