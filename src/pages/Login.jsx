import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, db } from '../firebase';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('mchoffn@hotmail.com');
    const [password, setPassword] = useState('silwioe');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
    
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const change = `${user.email} logged in at ${new Date().toLocaleString()}`;
                const data = { change, timestamp: serverTimestamp() };
                addDoc(collection(db, 'activity-log', user.uid, 'user-trails'), data);
                console.log(user);
                navigate('/dashboard');
            }
        ).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            }
        );
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