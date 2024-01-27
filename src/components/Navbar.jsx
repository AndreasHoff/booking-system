import { signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'; // Added useState import
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { auth, db } from '../firebase'; // assuming you have exported db from firebase.js
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = useAuth(); // Use the useAuth hook to get the authentication state
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const logout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut(auth);
            const entry = `User logged out at ${new Date().toLocaleString()}`;
            const data = { entry, timestamp: serverTimestamp() };
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
                {/* <li className='navbar-item'>
                    <Link to='/' className='navbar-link'>Home</Link>
                </li> */}
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