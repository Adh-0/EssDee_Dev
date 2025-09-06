import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="product">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-details">
        <Link to={`/product/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>${product.price}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;