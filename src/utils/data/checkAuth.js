import { useNavigate } from "react-router-dom";
import { centralSupabase } from "../supabaseClient";

export default async function checkAuth() {
  const { data, error } = await centralSupabase.auth.getUser();
}
