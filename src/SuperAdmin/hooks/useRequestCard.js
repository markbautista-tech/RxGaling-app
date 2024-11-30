import { useEffect, useState } from "react";
import { toast } from "sonner";
import { centralSupabase } from "@/utils/supabaseClient";
import getClinicRequest from "@/utils/data/fetch/getClinicRequest";

const useRequestCard = () => {
  const [request, setRequest] = useState(null);
  const [clinicOwner, setClinicOwner] = useState([]);
  const [clinic, setClinic] = useState([]);

  // Function to fetch clinic owners
  const getClinicOwner = async () => {
    try {
      const { data: clinicOwner, error: clinicOwnerError } =
        await centralSupabase.from("users").select("*");

      if (clinicOwnerError) {
        toast.error(clinicOwnerError.message);
      } else {
        return clinicOwner;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch clinic data
  const getClinic = async () => {
    try {
      const { data: clinic, error: clinicError } = await centralSupabase
        .from("clinics")
        .select("*, users(first_name, middle_name, last_name)")
        .eq("status", "Unverified");

      if (clinicError) {
        toast.error(clinicError.message);
      } else {
        return clinic;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const fetchRequest = async () => {
    const req = await getClinicRequest();
    const owner = await getClinicOwner();
    const clinicData = await getClinic();

    setClinicOwner(owner);
    setClinic(clinicData);
    setRequest(req);
  };

  // Function to count requests
  const countRequest = () => {
    return clinic ? clinic.length : null;
  };

  const getClinicName = (ownerId) => {
    const clinicName = clinic.find((name) => name.owner_id === ownerId);
    return clinicName ? clinicName.name : "No Clinic";
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchRequest();

    // Supabase real-time subscriptions for both 'clinics' and 'users' tables
    const clinicChannel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clinics" },
        (payload) => {
          console.log("Clinic change received!", payload);
          fetchRequest(); // Refresh data on change
        }
      )
      .subscribe();

    const userChannel = centralSupabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        (payload) => {
          console.log("User change received!", payload);
          fetchRequest(); // Refresh data on change
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      centralSupabase.removeChannel(clinicChannel);
      centralSupabase.removeChannel(userChannel);
    };
  }, []);

  return { clinicOwner, clinic, countRequest, getClinicName };
};

export default useRequestCard;
