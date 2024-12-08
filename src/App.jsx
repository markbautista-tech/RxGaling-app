import "./App.css";
import ClinicApp from "./main/modules/clinic/clinicApp";
import LoginForm from "./main/components/loginForm";
import AppTemplate from "./main/appTemplate";
import LoginForm2 from "./main/components/loginForm2";
import AppRouter from "./main/router";
import LandingPage from "./main/components/landing";
import PageTemplate from "./main/modules/PageTemplate";
import MainRouter from "./MainRouter/router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { UserProvider } from "./context/UserContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { UserPharmacyProvider } from "@/context/UserPharmacyContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors />
        <UserProvider>
          <UserPharmacyProvider>
            <MainRouter />
          </UserPharmacyProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
