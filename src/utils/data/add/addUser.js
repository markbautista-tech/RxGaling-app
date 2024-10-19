import { centralSupabase } from "../../supabaseClient";

const AddUserEmailRole = async (userData) => {
  try {
    const { data, error } = await centralSupabase.auth.admin.createUser({
      email: userData.email,
      password: "123456789",
      // raw_user_meta_data: {
      //   role: userData.role,
      // },
    });

    if (error) {
      console.error("Add User error:", error.message);
      return { error };
    }

    console.log("User created successfully:", data);
    // return { data };
  } catch (err) {
    console.error("Error creating user:", err);
    return { error: err };
  }
};

export default AddUserEmailRole;
