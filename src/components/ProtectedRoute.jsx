import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const PrivateRoute = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Check if the user is authenticated
  const isUserAuthenticated = user !== null;

  if (!isUserAuthenticated) {
    // User is not authenticated, redirect to login and show toast
    toast.error('Not verified - please log in');
    return <Navigate to="/login" />;
  }

  // User is authenticated, render the protected route
  return <Outlet />;
};

export default PrivateRoute;
