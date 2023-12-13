// Register.js
import React, { useState } from 'react';
import '../styles/register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        // Implement registration with Firebase here
        // For now, you can console.log or perform any other action
        console.log('Registration form submitted');
    };

    return (
        <div className="register">
            <form onSubmit={register}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {passwordMatchError && <p className="error-text">Passwords do not match.</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
