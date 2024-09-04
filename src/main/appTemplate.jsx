import React, { useEffect } from "react";
import Sidebar from "./modules/clinic/components/sidebar";
import Header from "./components/header";

import { useLocation, useNavigate } from "react-router-dom";
import { validateUser } from "./auth/login";
import ContentRouter from "./modules/router";

const AppTemplate = () => {
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

  const location = useLocation();

  return (
    <div className="flex w-screen h-screen bg-black">
      <Sidebar />
      <main className="bg-muted w-full">
        <Header />
        <section className="pt-20 px-7">
          {/* {location.pathname === "/clinic-app/dashboard" && (
            <DashboardContent />
          )} */}
          {/* <ContentRouter /> */}
          <ContentRouter />
        </section>
      </main>
    </div>
  );
};

export default AppTemplate;
