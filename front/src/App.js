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
import Login from "./pages/login.js";
import ForgotPassword from "./pages/forgotPassword.js";
import ResetPassword from "./pages/resetPassword.js";
import RoleContext from "./pages/RoleContext.js";
import UsernameContext from "./pages/UsernameContext.js";


function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  return (
    <div className="App">
    <UsernameContext.Provider value={{ username, setUsername }}>
    <RoleContext.Provider value={{ role, setRole }}>  
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword/>}/>
            <Route path="resetPassword" element={<ResetPassword/>}/>
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
    </UsernameContext.Provider>
    </div>
  );
}

export default App;
