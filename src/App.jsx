import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Components/Product";
import Login from "./Components/Login";
import Register from "./Components/Register";
import CheckoutPage from "./Components/CheckoutPage";
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {["all", "clothess", "electronics", "furniture", "shoes"].map(
            (cat) => (
              <Route key={cat} path={`/${cat}`} element={<Product />} />
            )
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
