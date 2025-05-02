import React from "react";
const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="product-detail">
      <div className="detail-header">
        <h3>Detail</h3>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
      <img src={product.images?.[0] || product.image} alt={product.title} />
      <div className="detail-content">
        <h2>${product.price}</h2>
        <strong>{product.title}</strong>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
