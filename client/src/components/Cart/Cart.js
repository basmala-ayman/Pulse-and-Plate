import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";
import PaymentModal from "../PaymentModal/PaymentModal";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3050/api/addorder/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartItems(res.data.cart || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cart items");
        setLoading(false);
      });
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    const token = localStorage.getItem("token");
    return axios
      .put(
        `http://localhost:3050/api/addorder/cart/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((err) => {
        console.error("Update error:", err.response?.data || err.message);
        alert("Failed to update quantity");
      });
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === itemId) {
          const newQuantity = item.quantity + 1;
          updateQuantity(itemId, newQuantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === itemId && item.quantity > 1) {
          const newQuantity = item.quantity - 1;
          updateQuantity(itemId, newQuantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (itemId) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:3050/api/addorder/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setCartItems((prev) => prev.filter((item) => item._id !== itemId));
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to remove item");
      });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) return <div className="cart-container">Loading cart...</div>;

  if (error)
    return (
      <div className="cart-container">
        <p className="cart-error">{error}</p>
      </div>
    );

  return (
    <div className="cart-container container cart-content">
      <h2 className="cart-header">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items row gy-4">
            {cartItems.map((item) => (
              <div className="cart-item col-12 col-md-10 offset-md-1 d-flex flex-column flex-md-row" key={item._id}>
                <div className="cart-item-image-wrapper flex-shrink-0 me-md-4 mb-3 mb-md-0" style={{ maxWidth: "300px" }}>
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>
                <div className="cart-item-details flex-grow-1 d-flex flex-column justify-content-center">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{item.price.toFixed(2)} EGP</p>

                  <div className="cart-item-quantity">
                    <button
                      className="btn btn-primary-custom"
                      onClick={() => decreaseQuantity(item._id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-primary-custom"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-total mt-3">
                    Total: {(item.price * item.quantity).toFixed(2)} EGP
                  </p>
                  <button
                    className="btn btn-danger-custom mt-2 align-self-start"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: {totalPrice.toFixed(2)} EGP</h3>
            <button
              className="btn btn-primary-custom"
              onClick={() => setShowPaymentModal(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          total={totalPrice}
          cartItems={cartItems}
          onClearCart={clearCart}
        />
      )}
    </div>
  );
}
