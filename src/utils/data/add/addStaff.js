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

const addStaff = async (userData) => {
  const { region, province, city_muni, barangay, add_address, ...userDetails } =
    userData;

  console.log(userDetails);

  const { data, error } = await centralSupabase
    .from("UserDetails")
    .insert([userDetails])
    .select();

  if (error) {
    console.log("UserDetails: Server Error ", error);
    return { error: error };
  }

  const userAddress = {
    user_id: data[0].id,
    region: await getRegionName(userData.region),
    province: await getProvinceName(userData.province),
    city_muni: await getCityMuniName(userData.city_muni),
    barangay: await getBarangayName(userData.barangay),
    add_address: userData.add_address,
  };

  if (data) {
    const { data, error } = await centralSupabase
      .from("Address")
      .insert([userAddress])
      .select();

    if (error) {
      console.log("UserDetails: Server Error ", error);
      return { error: error };
    }
  }
  return data;
};

export { addStaff };
