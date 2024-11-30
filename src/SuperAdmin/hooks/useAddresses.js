import React, { useEffect, useState } from "react";

const useAddresses = () => {
  const [regionName, setRegionName] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [cityMuniName, setCityMuniName] = useState("");
  const [barangayName, setBarangayName] = useState("");

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

  const getRegionName = async (regionId) => {
    const data = await fetchData(`https://psgc.cloud/api/regions/${regionId}`);
    if (data) {
      setRegionName(data.name);
    }
  };

  const getProvinceName = async (provinceId) => {
    const data = await fetchData(
      `https://psgc.cloud/api/provinces/${provinceId}`
    );
    if (data) {
      setProvinceName(data.name);
    }
  };

  const getCityMuniName = async (cityMuniId) => {
    const data = await fetchData(
      `https://psgc.cloud/api/cities-municipalities/${cityMuniId}`
    );
    if (data) {
      setCityMuniName(data.name);
    }
  };

  const getBarangayName = async (barangayId) => {
    const data = await fetchData(
      `https://psgc.cloud/api/barangays/${barangayId}`
    );
    if (data) {
      setBarangayName(data.name);
    }
  };

  return {
    getRegionName,
    regionName,
    getProvinceName,
    provinceName,
    getCityMuniName,
    cityMuniName,
    getBarangayName,
    barangayName,
  };
};

export default useAddresses;
