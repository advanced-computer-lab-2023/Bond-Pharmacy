import React, { useState } from "react";
import "./MedicineSearch.css"; // Import the CSS file

function MedicineSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/pharmacist/searchMedicines?name=${searchQuery}`,
        { method: "GET" }
      );
      console.log(response);
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Response is not in JSON format.");
          // Handle the response format error here
        }
      } else {
        console.error("Request failed with status:", response.status);
        // Handle other errors here
      }
    } catch (error) {
      console.error("Error searching for medicines:", error);
    }
  };

  return (
    <div className="medicine-search-container">
      <div className="top-search-bar">
        <input
          className="search-bar"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for medicines..."
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="medicine-table">
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Ingredients</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sales</th>
              <th>Description</th>
              <th>Medical Use</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result._id}>
                <td>{result.name}</td>
                <td>{result.ingredients}</td>
                <td>{result.price}</td>
                <td>{result.quantity}</td>
                <td>{result.sales}</td>
                <td>{result.description}</td>
                <td>{result.medicalUse}</td>
                <td>
                  {result.image ? (
                    <img src={result.image} alt={result.name} />
                  ) : (
                    "No image available"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicineSearch;
