import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
function PatientHome() {
    return(
        <body>
      <div className="title">
        <h1>Welcome to El7a2ni Pharmacy</h1>
        <p>Please select your preference:</p>
        <div className="role-buttons">
          <Link to="/patient/search" className="button">
            Search Medicines
          </Link>
        </div>
      </div>
    </body>
    );
    }

export default PatientHome;