import { signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { auth, db } from '../firebase';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const logout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut(auth);
            const change = `${user.email} logged out at ${new Date().toLocaleString()}`;
            const data = { change, timestamp: serverTimestamp() };
            await addDoc(collection(db, 'activity-log', user.uid, 'user-trails'), data);
            navigate('/login');
            console.log('logout successfully');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <nav className='navbar'>
            <ul className='navbar-list'>
                <li className='navbar-item'>
                    <Link to='/booking' className='navbar-link'>Booking</Link>
                </li>
                {<li className='navbar-item'>
                    <Link to='/dashboard' className='navbar-link'>Dashboard</Link>
                </li>}
                {!user && (
                    <>
                        <li className='navbar-item'>
                            <Link to='/login' className='navbar-link'>Login</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/register' className='navbar-link'>Register</Link>
                        </li>
                    </>
                )}
                {user && (
                    <li className='navbar-item navbar-item-right'>
                        <button onClick={logout} className='navbar-link' disabled={isLoggingOut}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;