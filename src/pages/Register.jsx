import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [registrationError, setRegistrationError] = useState(null);

    const register = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }
    
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            console.log('registration succesful');
            navigate('/dashboard');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setRegistrationError(error.message);
            console.log(errorCode, errorMessage)
        });
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
                {registrationError && <p className="error-text">{registrationError}</p>}
                <button className="register-button" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
