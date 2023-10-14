import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientRegistrationForm from "./pages/patientRegistration.js";
import LandingPage from "./pages/LandingPage.js";
import AdminPanel from "./pages/admin.js";
import PharmacistRegistrationForm from "./pages/pharmacistRegistration.js";
import PatientHome from "./pages/patient.js";
import PharmacistHome from "./pages/pharmacist.js";
import SearchMedicine from "./pages/searchMedicine.js"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
            path="/"
            element={<LandingPage/>}
            />
            <Route
            path="/patient/register"
            element={<PatientRegistrationForm/>}
            />
            <Route
            path="/patient/home"
            element={<PatientHome/>}
            />
            
            <Route
            path="/patient/search"
            element={<SearchMedicine/>}
            />

            <Route
            path="/admin/search"
            element={<SearchMedicine/>}
            />

        

            <Route
            path="/pharmacist/search"
            element={<SearchMedicine/>}
            />
            <Route
            path="/pharmacist/home"
            element={<PharmacistHome/>}
            />
            <Route
            path="/admin/home"
            element={<AdminPanel/>}
            />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
