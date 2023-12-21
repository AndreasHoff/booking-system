import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { auth } from '../firebase';
import '../styles/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = useAuth(); // Use the useAuth hook to get the authentication state

    const logout = () => {
        signOut(auth).then(() => {
            navigate('/login');
            console.log('logout succesfully')
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <nav className='navbar'>
            <ul className='navbar-list'>
                <li className='navbar-item'>
                    <Link to='/booking-system' className='navbar-link'>Booking System</Link>
                </li>
                {/* <li className='navbar-item'>
                    <Link to='/' className='navbar-link'>Home</Link>
                </li> */}
                {/* <li className='navbar-item'>
                    <Link to='/admin-dashboard' className='navbar-link'>Admin Dashboard</Link>
                </li> */}
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
                        <button onClick={logout} className='navbar-link'>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;