import { useNavigate } from "react-router-dom";
import { centralSupabase } from "../../supabaseClient";
import e from "cors";

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
    city,
    barangay,
    address_line,
    specialization,
    license_number,
    ptr_number,
    s2_number,
    prc_number,
    professional_extension,
    ...userDetails
  } = userData;

  const { data: address_data, error } = await centralSupabase
    .from("addresses")
    .insert([{
        region,
        province,
        city,
        barangay,
        address_line,
      },
    ])
    .select();

  if(error){
    console.log("UserDetails: Server Error ", error);
    return { error: error };
  }
  else{
    const { data: user_data, error } = await centralSupabase
    .from("users")
    .insert([{...userDetails, address_id: address_data[0].id}])
    .select();

    if(error){
      console.log("UserDetails: Server Error ", error);
      return { error: error };
    }
    else{
      const { data, error } = await centralSupabase
        .from("doctor_details")
        .insert({
          user_id: user_data[0].id,
          license_number,
          ptr_number,
          s2_number,
          prc_number,
          professional_extension,
        })
        .select();

      if(error){
        console.log("UserDetails: Server Error ", error);
        return { error: error };
      }
      else{
        return data;
      }
    }
  }
};

export default addUserDetails;
