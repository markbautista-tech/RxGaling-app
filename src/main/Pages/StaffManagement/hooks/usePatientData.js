import getPatientDetails from "@/utils/data/fetch/getPatientDetails";
import React, { useEffect, useState } from "react";

const usePatientData = () => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      const patient_data = await getPatientDetails();

      setPatientData(patient_data);
    };

    fetchPatientData();
  }, []);

  return {
    patientData,
  };
};

export default usePatientData;
