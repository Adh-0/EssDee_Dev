import React from 'react';
import { Link } from 'react-router-dom';

const ProductsScreen = () => {
  return (
    <div>
      <h1>Our Products</h1>
      {/* Placeholder for product listing */}
      <p>This is where the list of products will be displayed.</p>
      <Link to="/cart"><button>View Cart</button></Link>
    </div>
  );
};

export default ProductsScreen;