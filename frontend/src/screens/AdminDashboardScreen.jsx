import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboardScreen = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantityType, setQuantityType] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching products');
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data.image);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('Error uploading image');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      };

      if (editMode) {
        await axios.put(
          `/api/products/${currentProductId}`,
          { name, price, quantityType, countInStock, image },
          config
        );
        alert('Product updated successfully');
      } else {
        await axios.post(
          '/api/products',
          { name, price, quantityType, countInStock, image },
          config
        );
        alert('Product created successfully');
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.response && error.response.data.message
        ? error.response.data.message
        : error.message);
    }
  };

  const editProductHandler = (product) => {
    setEditMode(true);
    setCurrentProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setQuantityType(product.quantityType);
    setCountInStock(product.countInStock);
    setImage(product.image);
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        };
        await axios.delete(`/api/products/${id}`, config);
        alert('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error(error);
        alert('Error deleting product');
      }
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrentProductId(null);
    setName('');
    setPrice(0);
    setQuantityType('');
    setCountInStock(0);
    setImage('');
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>

      <section className="product-management">
        <h2>Product Management</h2>
        <button className="btn btn-primary">Add New Product</button>

        <div className="product-list">
          {/* Product listing table/grid will go here */}
          <h3>Existing Products</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity Type</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.quantityType}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <button onClick={() => editProductHandler(product)} className="btn btn-info btn-sm">Edit</button>
                    <button onClick={() => deleteProductHandler(product._id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="add-product-form">
        <h2>Add/Edit Product</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input type="text" id="productName" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Price</label>
            <input type="number" id="productPrice" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="quantityType">Quantity Type</label>
            <input type="text" id="quantityType" placeholder="e.g., kg, pcs, liters" value={quantityType} onChange={(e) => setQuantityType(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="stockCount">Stock Count</label>
            <input type="number" id="stockCount" placeholder="Enter stock count" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="productImage">Product Image</label>
            <input type="text" id="productImage" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} />
            <input type="file" id="image-file" onChange={uploadFileHandler} />
            {uploading && <p>Uploading...</p>}
          </div>
          <button type="submit" className="btn btn-primary">{editMode ? 'Update Product' : 'Add Product'}</button>
          {editMode && <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel Edit</button>}
        </form>
      </section>
    </div>
  );
};

export default AdminDashboardScreen;