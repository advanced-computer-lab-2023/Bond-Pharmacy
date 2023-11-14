import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Row, Table } from "react-bootstrap";

function MedicinePatient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [medicalUseFilter, setMedicalUseFilter] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/pharmacist/searchMedicines?name=${searchQuery}`,
        { method: "GET", credentials: "include" }
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
        navigate("/login");
      }
    } catch (error) {
      console.error("Error searching for medicines:", error);
      setError("Error searching for medicines: " + error);
    } finally {
      setLoading(false);
    }
  };

  const addToCartHandler = (product) => {
    const existingItem = cartItems.find((item) => item.product._id === product._id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === existingItem.product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  };

  const removeItemFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.product._id !== productId));
  };

  const checkoutHandler = async () => {
    try {
      // Assuming you have a backend endpoint for checkout
      const response = await fetch("http://localhost:4000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      if (response.ok) {
        // Handle successful checkout, e.g., redirect to a thank you page
        navigate("/thank-you");
      } else {
        // Handle checkout failure
        console.error("Checkout failed");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };


  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <div className="medicine-search-container">
      {/* Existing search and filter section */}
      {/* ... */}

      {/* Cart section */}
      <div className="cart-section">
        <h2>Your Cart</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product._id}>
                <td>{item.product.name}</td>
                <td>
                  <Button
                    variant="light"
                    onClick={() => decreaseQuantity(item.product._id)}
                  >
                    -
                  </Button>{" "}
                  {item.quantity}{" "}
                  <Button
                    variant="light"
                    onClick={() => increaseQuantity(item.product._id)}
                  >
                    +
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeItemFromCart(item.product._id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">
                <strong>Total Price:</strong>
              </td>
              <td>
                <strong>${getTotalPrice().toFixed(2)}</strong>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <Button
                  variant="primary"
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>

     
      {/* Medicine results section */}
      <div className="medicine-table">
        {/* Modify this section based on your actual product structure */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Ingredients</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result._id}>
                <td>{result.name}</td>
                <td>{result.ingredients}</td>
                <td>{result.price}</td>
                <td>
                  {result.image ? (
                    <Image src={result.image} alt={result.name} fluid rounded />
                  ) : (
                    "No image available"
                  )}
                </td>
                <td>
                  <Button onClick={() => addToCartHandler(result)}>Add to Cart</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <style jsx>{`
        td {
            padding: 15px; // Adjust the padding as needed
        }
        `}</style>
      </div>
    </div>
  );
}

export default MedicinePatient;
