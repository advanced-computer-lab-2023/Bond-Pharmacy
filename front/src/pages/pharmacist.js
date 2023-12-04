import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddMedicineForm from "../components/AddMedicineForm";
import GetMedicinesForm from "../components/GetMedicineForm";
function PharmacistHome() {
  const [newMed, setNewMed] = useState({ name: "", ingredients: "", price: "", quantity: "" });
  const [newInfo, setNewInfo] = useState({ name: "", ingredients: "", price: "" });
  const [medicines, setMedicines] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [medicineAdded, setMedicineAdded] = useState(false);

  // File upload state
  const [idDocument, setIdDocument] = useState(null);
  const [pharmacyDegreeDocument, setPharmacyDegreeDocument] = useState(null);
  const [workingLicenseDocument, setWorkingLicenseDocument] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/Pharmacist/viewMedicineQS");
        const data = await response.json();
        setMedicines(data.medicineQS);
        setMedicineAdded(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [medicineAdded]);

  const handleAddMed = async (e) => {
    e.preventDefault();

    // Construct the newMed object with file data
    const formData = new FormData();
    formData.append("name", newMed.name);
    formData.append("ingredients", newMed.ingredients);
    formData.append("price", newMed.price);
    formData.append("quantity", newMed.quantity);
    formData.append("idDocument", idDocument);
    formData.append("pharmacyDegreeDocument", pharmacyDegreeDocument);
    formData.append("workingLicenseDocument", workingLicenseDocument);

    try {
      const response = await axios.post("http://localhost:4000/api/Pharmacist/addMedicine", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        const json = await response.json();
        alert(json.error);
      }

      if (response.ok) {
        alert("Med added Successfully");
        setMedicineAdded(true);
      }
    } catch (error) {
      console.error("Error adding med:", error);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // Send a PATCH request to your backend API to add the new family member
    axios
      .patch("http://localhost:4000/api/Pharmacist/editMedicineIandP", newInfo)
      .then((response) => {
        alert("Med updated Successfully");
      })
      .catch((error) => {
        alert("Error updating med");
      });
  };

  return (
    <body>
      <div className="title">
        <h1>Search Medicines</h1>
        <p>Please select your preference:</p>
        <div className="role-buttons">
          <Link to="/patient/search" className="button">
            Search Medicines
          </Link>
        </div>
      </div>
              <AddMedicineForm/>
        <GetMedicinesForm/>
            <h4>Pharmacist Home</h4>
            {/* <div className="form-container">
                <h5>Add new medicine</h5> 
                <input
          type="text"
          placeholder="name"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="ingredients"
          value={newMed.ingredients}
          onChange={(e) => setNewMed({ ...newMed, ingredients: e.target.value })}
        />
        <input
          type="number"
          placeholder="price"
          value={newMed.price}
          onChange={(e) => setNewMed({ ...newMed, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="quantity"
          value={newMed.quantity}
          onChange={(e) => setNewMed({ ...newMed, quantity: e.target.value })}
        />
        {/* File upload fields */}
        <label htmlFor="idDocument">ID Document:</label>
        <input type="file" id="idDocument" onChange={(e) => setIdDocument(e.target.files[0])} />

        <label htmlFor="pharmacyDegreeDocument">Pharmacy Degree Document:</label>
        <input
          type="file"
          id="pharmacyDegreeDocument"
          onChange={(e) => setPharmacyDegreeDocument(e.target.files[0])}
        />

        <label htmlFor="workingLicenseDocument">Working License Document:</label>
        <input
          type="file"
          id="workingLicenseDocument"
          onChange={(e) => setWorkingLicenseDocument(e.target.files[0])}
        />

        <button onClick={handleAddMed}>Add Med</button>
      </div>

      {/* Edit medicine ingredients and price */}
      <div className="form-container">
        <h5>Edit medicine ingredients and price</h5>
        {/* ... (your existing input fields for editing) */}
        <button onClick={handleEdit}>Update</button>
      </div>

      {/* Show Table */}
      <div>
        <button onClick={() => setShowTable(!showTable)}>
          {showTable ? "Hide Table" : "Show Table"}
        </button>
        {showTable && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(medicines) &&
                medicines.map((medicine, index) => (
                  <tr key={index}>
                    <td>{medicine.name}</td>
                    <td>{medicine.quantity}</td>
                    <td>{medicine.sales}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </body>
  );
}

export default PharmacistHome;
