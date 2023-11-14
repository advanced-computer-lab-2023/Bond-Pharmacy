import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import AddMedicineForm from "../components/AddMedicineForm";
import GetMedicinesForm from "../components/GetMedicineForm";
import ChangePasswordForm from "../components/ChangePasswordForm.js";

function PharmacistHome() {
    const [newMed, setNewMed] = useState({ name: "", ingredients: "",price:"",quantity:""  });
    const [newInfo, setNewInfo] = useState({ name: "", ingredients: "",price:"" });
    const [medicines, setMedicines] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [medicineAdded, setMedicineAdded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/api/Pharmacist/viewMedicineQS');
        const data = await response.json();
        setMedicines(data.medicineQS);
        setMedicineAdded(false); // Reset medicineAdded to false after fetching medicines
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [medicineAdded]); // Add medicineAdded to the dependency array
  
  
    const handleAddMed = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/Pharmacist/addMedicine", {
          method: "POST",
          body: JSON.stringify(newMed),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (!response.ok) {
          alert(json.error);
        }
        if (response.ok) {
          alert("Med added Successfully");
          setMedicineAdded(true);
        }
      };

      const handleEdit = (e) => {
        e.preventDefault();
        // Send a PATCH request to your backend API to add the new family member
        axios
          .patch("http://localhost:4000/api/Pharmacist/editMedicineIandP", newInfo) // Replace with the actual API endpoint
          .then((response) => {
            alert("Med updated Successfully");
          })
          .catch((error) => {
            alert("Error updating med");
          }); 
        };

        


    
    return(

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

            <LogoutButton/>
            <ChangePasswordForm/>
            {/* <div className="form-container">
                <h5>Add new medicine</h5> 
                <input
          type="text"
          placeholder="name"
          value={newMed.name}
          onChange={(e) =>
            setNewMed({ ...newMed, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="ingredients"
          value={newMed.ingredients}
          onChange={(e) =>
            setNewMed({ ...newMed, ingredients: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="price"
          value={newMed.price}
          onChange={(e) =>
            setNewMed({ ...newMed, price: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="quantity"
          value={newMed.quantity}
          onChange={(e) =>
            setNewMed({ ...newMed, quantity: e.target.value })
          }
        />

               
<button onClick={handleAddMed}>Add Med</button>
            </div> */}
            <div className="form-container">
                <h5>Edit medicine ingredients and price</h5>
                <input
          type="text"
          placeholder="name"
          value={newInfo.name}
          onChange={(e) =>
            setNewInfo({ ...newInfo, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="ingredients"
          value={newInfo.ingredients}
          onChange={(e) =>
            setNewInfo({ ...newInfo, ingredients: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="price"
          value={newInfo.price}
          onChange={(e) =>
            setNewInfo({ ...newInfo, price: e.target.value })
          }
        />
                <button onClick={handleEdit}>Update</button>
            </div>
            <div>
      <button onClick={() => setShowTable(!showTable)}>
        {showTable ? 'Hide Table' : 'Show Table'}
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
            {Array.isArray(medicines) && medicines.map((medicine, index) => (
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