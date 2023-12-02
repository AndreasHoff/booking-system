import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
        <Navbar />
        <div className="main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
      
    </Router>
  );
};

export default App;
