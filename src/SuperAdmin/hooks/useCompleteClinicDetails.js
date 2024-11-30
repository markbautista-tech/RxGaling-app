import { getCompleteClinicDetails } from "@/utils/data/fetch/getClinicDetails";
import React, { useEffect, useState } from "react";

const useCompleteClinicDetails = () => {
  const [clinicDetails, setClinicDetails] = useState([]);

  useEffect(() => {
    const fetchClinicDetails = async () => {
      const clinic = await getCompleteClinicDetails();

      setClinicDetails(clinic);
    };
    fetchClinicDetails();
  }, []);

  return {
    clinicDetails,
  };
};

export default useCompleteClinicDetails;
