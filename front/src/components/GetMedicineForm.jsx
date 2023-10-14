import React, { useState, useEffect } from "react";

const GetMedicinesForm = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/pharmacist/getMedicines", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((medicines) => {
        setMedicines(medicines);
      });
  }, []);

  return (
    <div>
      <div>
        {medicines.map((medicine) => (
          <div key={medicine.id}>
            <h1>{"Name: " + medicine.name}</h1>
            <h1>{"Quantity: " + medicine.quantity}</h1>
            <h1>{"Ingredients: " + medicine.ingredients}</h1>
            <img src={medicine.image} alt={medicine.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMedicinesForm;
