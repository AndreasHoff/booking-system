import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        // Implement login with Firebase here
    };

    return (
        <div className="login">
            <form onSubmit={login}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
            <p>Not a user yet? <Link to="/register">Sign up here</Link></p>
        </div>
    );
};

export default Login;