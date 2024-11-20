import React, { useEffect, useState } from "react";
import { centralSupabase } from "../../supabaseClient";

const getClinicRequest = async () => {
  // const [clinicRequests, setClinicRequests] = useState([]);

  // const getInitialRequests = async () => {
  try {
    const { data, error } = await centralSupabase
      .from("ClinicRegistrationRequest")
      .select("*, ClinicOwnerDetails(first_name, middle_name, last_name)")
      .eq("status", "Requested");

    if (error) {
      console.log("Error fetching clinic request", error);
    } else {
      return data;
    }
  } catch (error) {
    console.log("Catch Error clinic request", error);
  }
  // };

  // useEffect(() => {
  //   getInitialRequests();

  //   const channels = centralSupabase
  //     .channel("custom-all-channel")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "ClinicRegistrationRequest" },
  //       (payload) => {
  //         console.log("Change received!", payload);
  //         // Optionally, you can refetch the data or update the state directly based on the payload
  //         getClinicRequest(); // Refetch data after change
  //       }
  //     )
  //     .subscribe();

  //   // Cleanup subscription on component unmount
  //   return () => {
  //     channels.unsubscribe();
  //   };
  // }, []);

  // return data;
};

export default getClinicRequest;
