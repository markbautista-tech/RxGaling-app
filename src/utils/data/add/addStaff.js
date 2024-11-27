import { useNavigate } from "react-router-dom";
import { centralSupabase } from "../../supabaseClient";
import checkAuth from "../checkAuth";
const getRegionName = async (regionId) => {
  try {
    const response = await fetch(`https://psgc.cloud/api/regions/${regionId}`);
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getProvinceName = async (provinceId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/provinces/${provinceId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCityMuniName = async (cityMuniId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/cities-municipalities/${cityMuniId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBarangayName = async (barangayId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/barangays/${barangayId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const addStaff = async (userData, addressData) => {
  const { data: address_data, error: address_error } = await centralSupabase
    .from("addresses")
    .insert([addressData])
    .select();

  if (address_error) {
    console.log("Address: Server Error ", address_error);
    return { error: address_error };
  }

  const { data, error } = await centralSupabase
    .from("users")
    .insert([{ ...userData, address_id: address_data[0].id }]);

  if (error) {
    console.log("UserDetails: Server Error ", error);
    return { error: error };
  }

  return data;
};

export { addStaff };
