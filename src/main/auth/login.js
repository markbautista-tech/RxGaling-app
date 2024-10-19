import { useNavigate } from "react-router-dom";
import { centralSupabase } from "../../utils/supabaseClient";
import { loginCheckUser } from "../../utils/data/loginCheckUser";

async function signInWithEmail(givendata) {
  try {
    const { data, error } =
      await centralSupabase.auth.signInWithPassword(givendata);

    if (error) {
      return "Invalid credentials!";
    } else {
      // const user_id = userID.user.id;

      const user_role = await loginCheckUser(givendata.email);

      if (user_role[0].role === "Super Admin") {
        return "admin";
      }
    }
  } catch (error) {
    console.log(error.message);
    return "Something went wrong!";
  }
}

export const validateUser = async () => {
  const { data, error } = await centralSupabase.auth.getUser();
  if (error) return "unauthorized";
};

export const logout = async () => {
  const navigate = useNavigate();
  const { error } = await centralSupabase.auth.signOut();
  if (!error) {
    navigate("/user-login");
  }
};
export default signInWithEmail;
