import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.product.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(cartItems);
    if (!localStorage.getItem("loggedEmail")) {
      navigate("/login");
    }
  });
  const handlePlaceOrder = () => {
    alert(
      "Order placed successfully!\n It is going nowhere for now.\n\n Here is end of flow"
    );
    dispatch(setProducts([]));
  };
  return (
    <>
      <Navbar />
      {!cartItems.length && (
        <div className="alert alert-warning mt-5" role="alert">
          No products selected in cart to proceed
        </div>
      )}
      {cartItems.length && (
        <div className="container py-5">
          <h2 className="mb-4">Checkout</h2>

          <div className="row">
            {/* Billing Form */}
            <div className="col-md-6 mb-4">
              <div className="card p-4 shadow-sm">
                <h4>Billing Details</h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="john@example.com"
                      value={localStorage.getItem("loggedEmail")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Shipping Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3 d-flex gap-3">
                    <div className="w-50">
                      <label className="form-label">State</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="w-50">
                      <label className="form-label">Zip</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select">
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>UPI</option>
                      <option>Cash on Delivery</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-5 mb-4">
              <div className="card p-4 shadow-sm">
                <h4>Order Summary</h4>
                <ul className="list-group mb-3">
                  {/* Example item */}
                  <li className="list-group-item d-flex justify-content-between">
                    <div>
                      <h6 className="my-0">Product Count</h6>
                      <small className="text-muted">{cartItems.length}</small>
                    </div>
                    <span>${totalPrice}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between">
                    <span>Shipping</span>
                    <strong>${totalPrice ? 5 : 0}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total</span>
                    <strong>${totalPrice + totalPrice ? 5 : 0}</strong>
                  </li>
                </ul>

                <button
                  className="btn btn-success w-100"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
