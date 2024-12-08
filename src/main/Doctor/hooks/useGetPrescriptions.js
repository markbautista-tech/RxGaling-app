import fetchPrescription from "@/utils/data/fetch/fetchPrescription";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect } from "react";

const useGetPrescriptions = (id) => {
  const [prescriptions, setPrescriptions] = React.useState([]);
  const [presLoading, setPresLoading] = React.useState(true);
  const [prescriptionWithId, setPrescriptionWithId] = React.useState([]);

  const fetchPres = async () => {
    setPresLoading(true);
    const prescribe = await fetchPrescription();

    setPrescriptions(prescribe);
    setPresLoading(false);
  };

  const fetchPresId = async () => {
    setPresLoading(true);
    const prescribe = await fetchPrescription(id);

    setPrescriptionWithId(prescribe);
    setPresLoading(false);
  };

  useEffect(() => {
    fetchPres();
    fetchPresId();

    const channels = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prescription" },
        (payload) => {
          console.log("Change received!", payload);
          fetchPres();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return {
    prescriptions,
    presLoading,
    prescriptionWithId,
  };
};

export default useGetPrescriptions;
