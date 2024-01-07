// App.js or your parent component
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingComponent from './components/Booking';
import Navbar from './components/Navbar';
import ToastManager from './components/ToastManager';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
const App = () => {
    const [justRegistered, setJustRegistered] = useState(false);

    return (
        <Router>
            <Navbar />
            <div className="mt-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<BookingComponent />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register setJustRegistered={setJustRegistered} />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
            <ToastContainer />
            <ToastManager justRegistered={justRegistered} />
        </Router>
    );
};

export default App;
