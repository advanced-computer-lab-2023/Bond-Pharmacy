import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import PatientRegistrationForm from "./pages/patientRegistration.js";
import LandingPage from "./pages/LandingPage.js";
import AdminPanel from "./pages/admin.js";
import PharmacistRegistrationForm from "./pages/pharmacistRegistration.js";
import PatientHome from "./pages/patient.js";
import PharmacistHome from "./pages/pharmacist.js";
import SearchMedicine from "./pages/searchMedicine.js"
import MedicinePatient from "./pages/MedicinePatient.js";
import DummyCartScreen from "./pages/cart.js";
import ResetPassword from "./pages/ResetPassword.js";
import OtpVerification from "./pages/OtpVerification.js";
import RoleContext from "./pages/RoleContext.js";


import Login from "./pages/login.js";

function App() {
  const [role, setRole] = useState('');

  return (
    <div className="App">
    <RoleContext.Provider value={{ role, setRole }}> 
      <BrowserRouter>
        <div className="pages">
          <Routes>
          <Route 
            path="/login"
            element={<Login/>}
            />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/verifyOTP" element={<OtpVerification/>} />
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
            element={<MedicinePatient/>}
            />
             <Route
            path="/patient/cart"
            element={<DummyCartScreen/>}
            />

            <Route
            path="/admin/search"
            element={<SearchMedicine/>}
            />

        
            <Route
            path="/pharmacist/register"
            element={<PharmacistRegistrationForm/>}
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
    </RoleContext.Provider>
    </div>
  );
}

export default App;
