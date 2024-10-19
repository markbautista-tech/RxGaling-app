import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import ClinicApp from "./modules/clinic/clinicApp";
import LoginForm2 from "./components/loginForm2";
import AppTemplate from "./appTemplate";
import LandingPage from "./components/landing";

import PatientRegistration from "./PatientsManagement/components/patientReg";

export default function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" replace to='/login/*' exact element={<LandingPage />} />
        <Route path="/clinic-app/*" element={<AppTemplate />} />
        <Route path="/login/*" element={<LoginForm2 />} />
        <Routes
          path="/patient-registration/*"
          element={<PatientRegistration />}
        />
      </Routes>
    </Suspense>
  );
}
