import { centralSupabase } from "../../supabaseClient";

const addUserDetails = async (userData, userid) => {
  // Debug: Log userData and userid
  console.log("User ID:", userid);
  console.log("User Data:", userData);

  if (!userid) {
    console.error("Error: User ID is undefined or null.");
    return { error: "User ID is required." };
  }

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
    email,
    ...userDetails
  } = userData;

  try {
    // Insert address and get the returned data
    const { data: address_data, error: addressError } = await centralSupabase
      .from("addresses")
      .insert([
        {
          region,
          province,
          city,
          barangay,
          address_line,
        },
      ])
      .select();

    if (addressError) {
      throw new Error(`Address Insertion Error: ${addressError.message}`);
    }

    if (!address_data || address_data.length === 0) {
      throw new Error("Address data is missing after insertion.");
    }

    const addressId = address_data[0].id;
    console.log("Address ID:", addressId);

    // Update the user data with the address ID
    const { data: user_data, error: userError } = await centralSupabase
      .from("users")
      .update({ ...userDetails, address_id: addressId })
      .eq("id", userid)
      .select();

    if (userError) {
      throw new Error(`User Update Error: ${userError.message}`);
    }

    // Insert doctor details
    const { data: doctor_data, error: doctorError } = await centralSupabase
      .from("doctor_details")
      .insert({
        user_id: userid,
        license_number,
        ptr_number,
        s2_number,
        prc_number,
        professional_extension,
        specialization,
      })
      .select();

    if (doctorError) {
      throw new Error(`Doctor Details Insertion Error: ${doctorError.message}`);
    }

    return doctor_data;
  } catch (error) {
    console.error("Operation failed:", error.message);
    return { error: error.message };
  }
};

export default addUserDetails;
