import React, { useState, useEffect } from "react";
import axios from "axios";
function PharmacistHome() {
    const [newMed, setNewMed] = useState({ name: "", ingredients: "",price:"",quantity:""  });
    const [newInfo, setNewInfo] = useState({ name: "", ingredients: "",price:"" });
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
        <div>
            <h4>Pharmacist Home</h4>
            <div className="form-container">
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
            </div>
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
            <button>View quantity, and sales of medicines </button>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Sales</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>     
            </div>
        </div>
    );
    }

export default PharmacistHome;