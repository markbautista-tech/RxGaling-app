import "./App.css";
import ClinicApp from "./main/modules/clinic/clinicApp";
import LoginForm from "./main/components/loginForm";
import AppTemplate from "./main/appTemplate";
import LoginForm2 from "./main/components/loginForm2";
import AppRouter from "./main/router";
import LandingPage from "./main/components/landing";
import PageTemplate from "./main/modules/PageTemplate";
import MainRouter from "./MainRouter/router";

function App() {
  return (
    <>
      {/* <ClinicApp /> */}
      {/* <LoginForm /> */}
      {/* <LoginForm2/> */}
      {/* <AppTemplate /> */}

      {/* <LandingPage /> */}

      {/* <AppRouter /> */}
      {/* <PageTemplate /> */}
      <MainRouter />
    </>
  );
}

export default App;
