import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingUI from "../components/loadingUI";
import PatientManagement from "../PatientsManagement/patientManagement";

// const Dashboard = lazy(() => import("./clinic/Dashboard/dashboard"));
const UserManagement = lazy(
  () => import("../UserManagement/userManagementPage")
);

export default function ContentRouter() {
  return (
    <Suspense fallback={<LoadingUI />}>
      <Routes>
        {/* <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/user-management/*" element={<UserManagement />} />
        <Route path="/patient-management/*" element={<PatientManagement />} /> */}
        <Route path="/loading" element={<LoadingUI />} />
      </Routes>
    </Suspense>
  );
}
