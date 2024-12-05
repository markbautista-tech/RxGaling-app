import { getClinicDoctor } from "@/utils/data/fetch/fetchUserClinics";
import { centralSupabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";

const useDoctorDetails = () => {
  const [doctorDetails, setDoctorDetails] = useState({});

  const fetchDoctorDetails = async () => {
    const users = await getClinicDoctor();

    setDoctorDetails(users);
  };

  useEffect(() => {
    fetchDoctorDetails();

    const channel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clinic_staffs" },
        (payload) => {
          console.log("Change received!", payload);
          fetchDoctorDetails(); // Refresh data upon change
        }
      )
      .subscribe();

    // Cleanup function to unsubscribe on unmount
    return () => {
      centralSupabase.removeChannel(channel);
    };
  }, []);

  return {
    doctorDetails,
  };
};

export default useDoctorDetails;
