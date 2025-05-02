import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/productSlice";
import { Link, useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, toggleCart }) => {
  const cartItems = useSelector((state) => state.product.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const handleCheckoutClick = () => {
    if (!localStorage.getItem("loggedEmail")) {
      alert("You need to login first before you checkout");
    }
  };
  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Cart</h5>
        <button className="btn-close" onClick={toggleCart}></button>
      </div>

      <div className="cart-body p-3" style={{ overflowY: "auto", flex: 1 }}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center mb-3"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.images?.[0] || item.image}
                  alt={item.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <div className="ms-2">
                  <h6 className="mb-0" style={{ fontSize: "14px" }}>
                    {item.title}
                  </h6>
                  <small className="text-muted">${item.price.toFixed(2)}</small>
                </div>
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(removeProduct(item.id))}
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer border-top p-3">
        <p className="mb-1">
          <strong>Total:</strong> ${totalPrice.toFixed(2)}
        </p>
        <Link
          onClick={handleCheckoutClick}
          to={localStorage.getItem("loggedEmail") ? "/checkout" : "/login"}
          className="btn btn-primary w-100"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSidebar;
