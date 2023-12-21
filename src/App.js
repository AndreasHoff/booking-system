// App.js or your parent component
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingSystem from './components/BookingSystem';
import Navbar from './components/Navbar';
import ToastManager from './components/ToastManager';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
    const [justRegistered, setJustRegistered] = useState(false);

    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking-system" element={<BookingSystem />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register setJustRegistered={setJustRegistered} />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
            </div>
            <ToastContainer />
            <ToastManager justRegistered={justRegistered} />
        </Router>
    );
};

export default App;
