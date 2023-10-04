import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientRegistrationForm from "./pages/patientRegistration.js";
import LandingPage from "./pages/LandingPage.js";
import AdminPanel from "./pages/admin.js";
import PharmacistRegistrationForm from "./pages/pharmacistRegistration.js";

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
            path="/patient"
            element={<PatientRegistrationForm/>}
            />
            <Route
            path="/pharmacist"
            element={<PharmacistRegistrationForm/>}
            />
            <Route
            path="/admin"
            element={<AdminPanel/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
