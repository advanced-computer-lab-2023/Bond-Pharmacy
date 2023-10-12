import React from "react";
const GetMedicines = () => {

    const [medicines, setMedicines] = React.useState([]);

    fetch("http://localhost:4000/api/pharmacist/getMedicines", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        (response.json()).then((medicines) => { setMedicines(medicines) })
    });


    return (
        <div>
            <div>{medicines.map((medicine: any) => {
                return (
                    <div>
                        <h1>{"Name: " + medicine.name}</h1>
                        <h1>{"Quantity: " + medicine.quantity}</h1>
                        <h1>{"Igredients: " + medicine.ingredients}</h1>
                        <img src={medicine.image} />
                    </div>
                )
            })}</div>

        </div>
    )
}

export default GetMedicines;