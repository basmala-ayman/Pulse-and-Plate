import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductInfo.css';

const ProductInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <div className="product-info-container">No product available.</div>;
  }

    console.log("Product:", product);
    console.log("AvailableCounter:", product.quantity);
  const availability = (product.quantity && product.quantity > 0) ? "In Stock" : "Out of Stock";

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to add items to the cart.");
      navigate("/login");
      return;
    }

    if (availability === "Out of Stock") {
      alert("Sorry, this product is out of stock.");
      return;
    }

    try {
      // Fetch the current cart items
      const { data } = await axios.get("http://localhost:3050/api/addorder/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cart = data.cart || [];

      // Check if this product is already in the cart
      const existingItem = cart.find(item => item.name === product.name);

      if (existingItem) {
        // If it exists, increase the quantity by 1
        await axios.put(
          `http://localhost:3050/api/addorder/cart/${existingItem._id}`,
          { quantity: existingItem.quantity + 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // If it doesn't exist, add it as a new item with quantity 1
        await axios.post(
          "http://localhost:3050/api/addorder",
          { itemname: product.name, quantity: 1 },
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

  return (
    <div className="product-info-container">
      <div className="product-info">
        <div className="product-info__image-section">
          <img src={product.photo} alt={product.name} className="product-info__image" />
        </div>
        <div className="product-info__details-section">
          <h1 className="product-info__name">{product.name}</h1>
          <p className="product-info__description">{`Details about ${product.name}. This is a sample description.`}</p>
          <div className="product-info__availability">
            Availability:
            <span className={`product-info__availability-status ${availability === 'In Stock' ? 'product-info__availability-status--in-stock' : 'product-info__availability-status--out-of-stock'}`}>
              {availability}
            </span>
          </div>
          <div className="product-info__price-section">
            <span className="product-info__price-label">Price:</span>
            <span className="product-info__current-price">
              {product.price} EGP
            </span>
            {product.originalPrice && (
              <span className="product-info__original-price">
                {product.originalPrice} EGP
              </span>
            )}
          </div>
          <button
            className="product-info__add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={availability === "Out of Stock"} // تعطيل الزر لو نفدت الكمية
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
