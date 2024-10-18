import { useNavigate } from "react-router-dom";
import { centralSupabase } from "../supabaseClient";
import checkAuth from "./checkAuth";

const userDetails = async (role="*") => {
  // const navigate = useNavigate();

  // const auth = checkAuth();

  // if (auth.unathorized) {
  //   navigate("/login");
  //   return;
  // }

  try {
    const { data, error } = await centralSupabase
      .from("UserDetails")
      // .select(`*, Specialty(specialty), role(${role})`);
      .select(`*, Specialty(specialty) `);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Error fetching UserDetails:", err.message);
    return "UserDetails: Server Error";
  }
};

export default userDetails;
