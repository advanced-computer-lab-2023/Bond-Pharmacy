import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import our custom CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.scss";

import LandingPage from "./pages/LandingPage.jsx";

import PatientRegistration from "./pages/registration/PatientRegistration.jsx";
import PharmacistRegistration from "./pages/registration/PharmacistRegistration.jsx";

import AdminHome from "./pages/home/AdminHome.jsx";
import PatientHome from "./pages/home/PatientHome.jsx";
import PharmacistHome from "./pages/home/PharmacistHome.jsx";
import AddMedicine from "../../front/src/components/AddMedicineForm";
import GetMedicines from "../../front/src/components/GetMedicineForm";
import GetMedicinesForm from "../../front/src/components/GetMedicineForm";
import AddMedicineForm from "../../front/src/components/AddMedicineForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/patient/register" element={<PatientRegistration />} />
          <Route
            path="/pharmacist/register"
            element={<PharmacistRegistration />}
          />
          <Route path="/admin/home/:username" element={<AdminHome />} />
          <Route path="/patient/home/:username" element={<PatientHome />} />
          <Route
            path="/pharmacist/home/:username"
            element={<PharmacistHome />}
          />
          <Route
            path="/pharmacist/home/add-medicine"
            element={<AddMedicineForm />}
          />
          <Route
            path="/pharmacist/home/get-medicines"
            element={<GetMedicinesForm />}
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
