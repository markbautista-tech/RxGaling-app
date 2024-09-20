import { useNavigate } from "react-router-dom";
import { centralSupabase } from "../supabaseClient";

export default async function checkAuth() {
  // const navigate = useNavigate();
  const { data, error } = await centralSupabase.auth.getUser();

  // if (error) {
  //   navigate("/login");
  //   return { unauthorized: true };
  // }
}
