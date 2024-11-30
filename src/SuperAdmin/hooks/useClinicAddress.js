import React, { useEffect, useState } from "react";

const useClinicAddress = () => {
  const [clinicRegion, setClinicRegion] = useState("");
  const [clinicProvince, setClinicProvince] = useState("");
  const [clinicCityMuni, setClinicCityMuni] = useState("");
  const [clinicBarangay, setClinicBarangay] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Fetch error: ", err);
      return null;
    }
  };

  const getClinicRegionName = async (regionId) => {
    const data = await fetchData(`https://psgc.cloud/api/regions/${regionId}`);
    if (data) {
      setClinicRegion(data.name);
    }
  };

  const getClinicProvinceName = async (provinceId) => {
    const data = await fetchData(
      `https://psgc.cloud/api/provinces/${provinceId}`
    );
    if (data) {
      setClinicProvince(data.name);
    }
  };

  const getClinicCityMuniName = async (cityMuniId) => {
    const data = await fetchData(
      `https://psgc.cloud/api/cities-municipalities/${cityMuniId}`
    );
    if (data) {
      setClinicCityMuni(data.name);
    }
  };

  const getClinicBarangayName = async (barangayId) => {
    const data = await fetchData(
      `https://psgc.cloud/api/barangays/${barangayId}`
    );
    if (data) {
      setClinicBarangay(data.name);
    }
  };

  return {
    getClinicRegionName,
    getClinicProvinceName,
    getClinicCityMuniName,
    getClinicBarangayName,
    clinicRegion,
    clinicProvince,
    clinicCityMuni,
    clinicBarangay,
  };
};

export default useClinicAddress;
