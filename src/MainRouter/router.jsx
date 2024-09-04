import { Route, Routes, Link, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import PageTemplate from "../main/modules/PageTemplate";
import UserRegistration from "../main/Pages/Forms/UserRegistration";

const MainRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" /> */}
        <Route path="/clinic-app/*" element={<PageTemplate />} />
        <Route path="/registration/*" element={<UserRegistration />} />
      </Routes>
    </>
  );
};

export default MainRouter;
