import React, { useState, useEffect } from "react";
import "./MedicineSearch.css"; // Import the CSS file

function MedicineSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define a function to handle the search request
  const handleSearch = async () => {
    setLoading(true); // Set loading state to true

    // Reset the error state when starting a new search
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/pharmacist/searchMedicines?name=${searchQuery}`,
        { method: "GET" }
      );

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Response is not in JSON format.");
          setError("Response is not in JSON format"); // Set error state
        }
      } else {
        console.error("Request failed with status:", response.status);
        setError("No medicine with this name"); // Set error state
      }
    } catch (error) {
      console.error("Error searching for medicines:", error);
      setError("Error searching for medicines: " + error); // Set error state
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Use the useEffect hook to make an initial search when the component mounts
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="medicine-search-container">
      <div className="top-search-bar">
        <input
          className="search-bar"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleSearch when Enter is pressed
          placeholder="Search for medicines..."
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
              {searchResults.length === 0 ? (
                <tr>
                  <td colSpan="8">No medicines found.</td>
                </tr>
              ) : (
                searchResults.map((result) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MedicineSearch;
