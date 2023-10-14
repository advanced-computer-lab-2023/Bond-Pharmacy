import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const AddMedicineForm = () => {
  const [medicineName, setMedicineName] = useState("");
  const [medicinePrice, setMedicinePrice] = useState(0);
  const [medicineIngredients, setMedicineIngredients] = useState("");
  const [medicineImage, setMedicineImage] = useState("");
  const [medicineQuantity, setMedicineQuantity] = useState(0);

  useEffect(() => {
    console.log(medicineName);
  }, [medicineName]);

  const handleSubmit = async () => {
    console.log({
      medicineName,
      medicinePrice,
      medicineQuantity,
      medicineIngredients,
    });
    const response = await fetch(
      "http://localhost:4000/api/pharmacist/createMedicine",
      {
        method: "POST",
        body: JSON.stringify({
          medicineName,
          medicinePrice,
          medicineQuantity,
          medicineIngredients,
          medicineImage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log("Success!");
      alert("Medicine Added Successfully!");
    } else {
      alert(json.error);
    }
  };

  return (
    <div>
      <h1>Add Medicine</h1>
      <TextField
        placeholder="Medicine Name"
        onChange={(event) => {
          setMedicineName(event.target.value);
        }}
      />
      <TextField
        placeholder="Medicine Image"
        onChange={(event) => {
          setMedicineImage(event.target.value);
        }}
      />
      <TextField
        placeholder="Medicine Price"
        onChange={(event) => {
          setMedicinePrice(Number(event.target.value));
        }}
      />
      <TextField
        placeholder="Medicine Quantity"
        onChange={(event) => {
          setMedicineQuantity(Number(event.target.value));
        }}
      />
      <TextField
        placeholder="Medicine Ingredients"
        onChange={(event) => {
          setMedicineIngredients(event.target.value);
        }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        {" "}
        Submit{" "}
      </Button>
    </div>
  );
};

export default AddMedicineForm;
