import fetchPharmacyClinic from "@/utils/data/fetch/fetchPharmacyClinic";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const useGetPartnerPharmacy = () => {
  const [partnerPharmacy, setPartnerPharmacy] = useState({});
  const [partnerLoading, setPartnerLoading] = useState(true);

  const fetchData = async () => {
    setPartnerLoading(true);
    try {
      const partner = await fetchPharmacyClinic();
      setPartnerPharmacy(partner);
    } catch (error) {
      toast.error(error);
    } finally {
      setPartnerLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const channels = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clinic_pharmacy" },
        (payload) => {
          console.log("Change received!", payload);
          // Optionally, you can refetch the data here if needed
          fetchData();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      centralSupabase.removeAllChannels();
    };
  }, []);

  return { partnerPharmacy, partnerLoading };
};

export default useGetPartnerPharmacy;
