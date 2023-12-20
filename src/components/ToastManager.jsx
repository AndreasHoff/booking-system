import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const ToastManager = () => {
    const [prevUser, setPrevUser] = useState(null);
    const [errorToasterDisplayed, setErrorToasterDisplayed] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

                if (isNewUser && prevUser === null) {
                    // Display registration toaster with a delay
                    setTimeout(() => {
                        toast.success('Registration successful', { autoClose: 100 });
                    }, 500);
                } else if (prevUser && !isNewUser) {
                    // Display login toaster with a delay
                    setTimeout(() => {
                        toast.success('Login successful', { autoClose: 100 });
                    }, 500);
                }
            } else if (prevUser) {
                // Display logout toaster with a delay
                setTimeout(() => {
                    toast.success('Logout successful', { autoClose: 100 });
                }, 500);
            } else if (!errorToasterDisplayed) {
                // Display error toaster for unauthenticated access with a delay
                setTimeout(() => {
                    toast.error('You must be logged in to access this page', { autoClose: 100 });
                    setErrorToasterDisplayed(true);
                }, 500);
            }

            setPrevUser(user);
        });

        return () => unsubscribe();
    }, [prevUser, errorToasterDisplayed]);

    return null;
};

export default ToastManager;
