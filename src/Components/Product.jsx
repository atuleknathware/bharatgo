import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../redux/productSlice";
import ProductDetail from "../pop-up/ProductPopup";

const Product = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setProductData(data);
      const filteredData = filterProduct(data, pathname.split("/")[1]);
      console.log(filteredData);
      setFilteredProducts(filteredData);
    };
    fetchDataFromAPI();
  }, []);

  // Filter product based on category
  const filterProduct = (data, category) => {
    return category === "all" || category === ""
      ? data
      : data.filter((product) => product.category?.slug === category);
  };

  const handleSearch = (item) => {
    setInputData(item.target.value);
    const searchItem = item.target.value;
    let filteredData = filterProduct(productData, pathname.split("/")[1]);

    filteredData = filteredData.filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredProducts(filteredData);
  };

  const handleAddCart = (product) => {
    const exist = products.some((item) => item.id === product.id);

    dispatch(exist ? removeProduct(product.id) : addProduct(product));
  };
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <form className="d-flex">
          <input
            className="form-control me-2 "
            type="search"
            placeholder="Search products"
            value={inputData}
            onChange={handleSearch}
          />
        </form>
        <div className="row justify-content-center products">
          {!filteredProducts.length && (
            <div className="alert alert-warning mt-5" role="alert">
              No Products Matching with your search!
            </div>
          )}
          {filteredProducts.map((product) => (
            <div
              className="card m-3"
              key={product.id}
              style={{ width: "18rem", minHeight: "350px", padding: "0px" }}
              onClick={() => setProductDetail(product)}
            >
              <div className="position-relative">
                <img
                  src={product.images?.[0] || product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <button
                  className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle ${
                    products.some((item) => item.id === product.id)
                      ? "btn-danger"
                      : "btn-primary"
                  }`}
                  style={{ width: "30px", height: "30px", padding: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddCart(product);
                  }}
                >
                  {products.some((item) => item.id === product.id) ? "-" : "+"}
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.title || "No Title"}</h5>
                <p className="card-text">
                  <strong>${product.price}</strong>
                </p>
                <span className="badge bg-secondary">
                  {product.category?.name || "Category"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductDetail
        product={Object.keys(productDetail).length ? productDetail : null}
        onClose={() => setProductDetail({})}
      />
    </>
  );
};

export default Product;
