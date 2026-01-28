import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '' });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(response.data.products);
        setTransactions(response.data.transactions);
      } catch (error) {
        alert('Failed to fetch dashboard');
      }
    };
    fetchDashboard();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewProduct({ name: '', description: '', price: '', category: '' });
      // Refresh products
      const response = await axios.get('http://localhost:5000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data.products);
    } catch (error) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      
      <div className="add-product-section">
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="cattle">Cattle</option>
            <option value="products">Products</option>
          </select>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="products-section">
        <h3>All Products</h3>
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Unique ID: {product.uniqueId}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="transactions-section">
        <h3>All Transactions</h3>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction._id}>
              Buyer: {transaction.buyer.email} - Seller: {transaction.seller.email} - Product: {transaction.product.name} - Amount: {transaction.amount} - Status: {transaction.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
