import fetchSOAPNote from "@/utils/data/fetch/fetchSOAPNote";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";

const useSOAPNotes = (patienid) => {
  const [soapNotes, setSoapNotes] = useState([]);
  const [soapLoading, setSoapLoading] = useState(false);

  const fetchsoap = async () => {
    setSoapLoading(true);
    const soap = await fetchSOAPNote(patienid);
    setSoapNotes(soap);
    setSoapLoading(false);
  };

  useEffect(() => {
    fetchsoap();

    const channels = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "soap_note" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [patienid]);

  return {
    soapNotes,
    soapLoading,
  };
};

export default useSOAPNotes;
