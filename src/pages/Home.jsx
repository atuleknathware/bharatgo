// src/pages/Home.jsx
import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AuthContext";
import axios from "axios";

export default function Home() {
  const { products, setProducts } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.images[0]}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.price}$</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
