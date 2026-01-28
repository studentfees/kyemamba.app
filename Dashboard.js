import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        alert('Failed to fetch dashboard');
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Client Dashboard</h2>
      <h3>Your Transactions</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            Product: {transaction.product.name} - Amount: {transaction.amount} - Status: {transaction.status}
          </li>
        ))}
      </ul>
      <a href="/products">View Products</a>
      <a href="/search">Search Products</a>
    </div>
  );
};

export default Dashboard;
