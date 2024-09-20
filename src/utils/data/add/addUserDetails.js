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

const addUserDetails = async (userData) => {
  // const navigate = useNavigate();

  const {
    region,
    province,
    city_muni,
    barangay,
    add_address,
    specialty,
    license,
    ptr_num,
    s2_license_num,
    ...userDetails
  } = userData;
  // const {age,birthday,contact_num,email,ext_name,first_name,gender,last_name,middle_name,...userAddres} = userData

  console.log(userDetails);

  const auth = checkAuth();

  // if (auth.unathorized) {
  //   navigate("/login");
  //   return;
  // }

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

  const userSpecialty = {
    user_id: data[0].id,
    specialty: userData.specialty,
  };

  if (data) {
    const { data, error } = await centralSupabase
      .from("Specialty")
      .insert([userSpecialty])
      .select();

    if (error) {
      console.log("UserDetails: Server Error ", error);
      return { error: error };
    }
  }

  const licenseNum = [
    {
      user_id: data[0].id,
      license: userData.license,
      type: "License Number",
    },
    {
      user_id: data[0].id,
      license: userData.ptr_num,
      type: "PTR Number",
    },
    {
      user_id: data[0].id,
      license: userData.s2_license_num,
      type: "S2 License Number",
    },
  ];

  if (data) {
    const { data, error } = await centralSupabase
      .from("License")
      .insert(licenseNum)
      .select();

    if (error) {
      console.log("UserDetails: Server Error ", error);
      return { error: error };
    }
  }

  // console.log("userAddress", userAddress);
  // console.log(data[0].id);
};

export default addUserDetails;
