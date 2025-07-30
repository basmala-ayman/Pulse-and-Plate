import React, { useState } from "react";
import axios from "axios";
import "./PaymentModal.css";

export default function PaymentModal({ onClose, total, cartItems, onClearCart }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }

    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      // Simulate order placement here (optional)
      // You can POST the order to an endpoint if needed

      // Now clear the cart from the backend
      await axios.delete("http://localhost:3050/api/addorder/clearcart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`Order placed successfully!\nAddress: ${address}\nPayment Method: Cash`);

      onClearCart(); // clear UI cart
      onClose();     // close modal
    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Failed to complete order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Order Summary</h2>

        <div className="order-list">
          {cartItems.length === 0 ? (
            <p className="empty-cart">No items in your cart.</p>
          ) : (
            cartItems.map((item) => (
              <div className="order-item" key={item._id}>
                <span>{item.name} (x{item.quantity})</span>
                <span>{(item.price * item.quantity).toFixed(2)} EGP</span>
              </div>
            ))
          )}
        </div>

        <p className="total-price"><strong>Total:</strong> {total.toFixed(2)} EGP</p>

        <div className="input-group">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter delivery address"
          />
        </div>

        <div className="input-group">
          <label htmlFor="payment">Payment Method:</label>
          <select id="payment" disabled>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div className="button-group">
          <button className="confirm-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Confirm Order"}
          </button>
          <button className="cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
