import React, { useState, useEffect } from "react";
import "./MedicineSearch.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function MedicinePatient() {
  const [searchQuery, setSearchQuery] = useState(" ");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [medicalUseFilter, setMedicalUseFilter] = useState(""); // New state for medical use filter
  const navigate  = useNavigate();

  // Define a function to handle the search request
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Perform your API call here for searching by name
      // Replace this with your actual API endpoint
      console.log(searchQuery);
      const response = await fetch(
        "http://localhost:4000/api/pharmacist/searchMedicines?name="+searchQuery,
        { method: "GET",
        credentials : `include` }
      );

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Response is not in JSON format.");
          setError("Response is not in JSON format");
        }
      } else {
       // console.error("Request failed with status:", response.status);
        //setError("No medicine with this name");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error searching for medicines:", error);
      setError("Error searching for medicines: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Define a function to filter results by medical use
  const filterByMedicalUse = () => {
    const filteredResults = searchResults.filter((result) =>
      result.medicalUse.toLowerCase().includes(medicalUseFilter.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  // Handle Enter key press in the medical use input field
  const handleMedicalUseKeyPress = (e) => {
    if (e.key === "Enter") {
      filterByMedicalUse();
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
          onKeyPress={handleMedicalUseKeyPress}
          placeholder="Search for medicines..."
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="filter-by-medical-use">
        <input
          type="text"
          value={medicalUseFilter}
          onChange={(e) => setMedicalUseFilter(e.target.value)}
          onKeyPress={handleMedicalUseKeyPress}
          placeholder="Filter by Medical Use"
        />
        <button className="filter-button" onClick={filterByMedicalUse}>
          Filter
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
                <th>Action</th>
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
                    <td>
                      <button 
                        //onClick={() => handleAddToCart(result)}
                      >
                        Add to Cart
                      </button>
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

export default MedicinePatient;
