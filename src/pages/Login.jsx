import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from '../firebase';
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword( auth, email, password)
        .then((userCredential) => {
            toast.success('Login Successful');
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate('/admin-dashboard');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle errors here
            console.log(errorCode, errorMessage);
        });
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
        </div>
    );
};

export default Login;