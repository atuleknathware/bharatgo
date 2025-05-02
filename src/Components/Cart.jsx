import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/productSlice"; // adjust path as needed
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Cart = () => {
  const cartItems = useSelector((state) => state.product.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h2 className="mb-4">My Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <h5>Your cart is empty.</h5>
            <Link to="/all" className="btn btn-primary mt-3">
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.images?.[0] || item.image}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">${item.price.toFixed(2)}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(removeProduct(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-12 mt-4">
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
              <button className="btn btn-success mt-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
