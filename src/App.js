import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react';
import Navbar from './components/Navbar';
import ToastManager from './components/ToastManager';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const [justRegistered, setJustRegistered] = useState(false);

    return (
        <Router>
            <Fragment>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register setJustRegistered={setJustRegistered} />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Route index element={<Home />} />
                        </ProtectedRoute>
                    }/>
                </Routes>
            </Fragment>
            <ToastContainer />
            <ToastManager justRegistered={justRegistered} />
        </Router>
    );
};

export default App;