
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MealCard.css";

export default function MealCard({ meal }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

 const handleAddToCart = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to add items to the cart.");
    navigate("/login");
    return;
  }

  try {
    const { data } = await axios.get("http://localhost:3050/api/addorder/myorders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const cart = data.cart || [];
    // Just check if the item is added before
    const existingItem = cart.find(item => item.name === meal.name);

    if (existingItem) {
      //if it's just update the quantity
      await axios.put(
        `http://localhost:3050/api/addorder/cart/${existingItem._id}`,
        { quantity: existingItem.quantity + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // and if not add it 
      await axios.post(
        "http://localhost:3050/api/addorder",
        {
          itemname: meal.name,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    alert("Item added to cart!");
  } catch (err) {
    console.error("Add to cart error:", err.response?.data || err.message);

    if (err.response?.status === 401) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else {
      alert(
        "Failed to add item to cart:\n" + (err.response?.data?.message || err.message)
      );
    }
  }
};

  const handleViewDetails = () => {
    navigate('/product-info', { state: { product: meal } });
  };

  return (
    <div className="meal-card card mx-auto my-3" style={{ maxWidth: "320px" }}>
      <div className="meal-image-container position-relative">
        <img
          src={meal.photo || "https://via.placeholder.com/320x180"}
          alt={meal.name}
          className="meal-image card-img-top"
          style={{ height: "180px", objectFit: "cover", borderRadius: "10px" }}
        />
        <div className="overlay d-flex justify-content-center align-items-center">
          <button
            className="view-details btn btn-secondary"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
        <div
          className={`fav-icon position-absolute top-0 end-0 p-2 ${
            isFavorited ? "favorited" : ""
          }`}
          onClick={toggleFavorite}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        >
          {isFavorited ? "❤️" : "🤍"}
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        <h4
          className="meal-name card-title"
          style={{ color: "var(--primary-color)", textTransform: "capitalize" }}
        >
          {meal.name || "Unknown Item"}
        </h4>
        <h2
          className="meal-price"
          style={{ color: "var(--secondary-color)", fontWeight: "700" }}
        >
          {(meal.price || 0).toFixed(2)} EGP
        </h2>
        <button
          className="add-to-cart btn btn-primary mt-auto"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
