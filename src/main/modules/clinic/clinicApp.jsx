import Sidebar from "./components/sidebar";
import Header from "../../components/header";
import { useEffect } from "react";
import { centralSupabase } from "../../../utils/supabaseClient";
import { validateUser } from "../../auth/login";
import { useNavigate } from "react-router-dom";

const ClinicApp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function validate() {
      const response = await validateUser();
      if (response === "unauthorized") {
        navigate("/login");
      }
    }
    validate();
  });
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
};

export default ClinicApp;
