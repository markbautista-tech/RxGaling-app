import { useNavigate } from "react-router-dom";
import { centralSupabase } from "../supabaseClient";
import checkAuth from "./checkAuth";

const userDetails = async () => {
  // const navigate = useNavigate();

  // const auth = checkAuth();

  // if (auth.unathorized) {
  //   navigate("/login");
  //   return;
  // }

  const { data, error } = await centralSupabase.from("UserDetails").select("*");

  if (error) {
    // console.log(error.message);
    return "UserDetails: Server Error";
  }

  return data;
};

export default userDetails;
