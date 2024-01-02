import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('mchoffn@hotmail.com');
    const [password, setPassword] = useState('silwioe');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword( auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate('/dashboard');
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