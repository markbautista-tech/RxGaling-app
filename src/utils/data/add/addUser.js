import { centralSupabase } from "../../supabaseClient";

const AddUserEmailRole = async (email, password, role) => {
  try {
    const { data, error } = await centralSupabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {},
      },
      redirectTo: "http://localhost:3000/user-login",
    });

    if (error) {
      return "Error Signing up clinic user: ", error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default AddUserEmailRole;
