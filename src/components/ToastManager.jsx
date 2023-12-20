import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const ToastManager = ({ justRegistered }) => {
    useEffect(() => {
        let prevUser = null;

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && !prevUser) {
                if (justRegistered) {
                    toast.success('Registration successful', { autoClose: 1000 });
                } else {
                    toast.success('Login successful', { autoClose: 1000 });
                }
            } else if (!user && prevUser) {
                toast.success('Logout successful', { autoClose: 1000 });
            }

            prevUser = user;
        });

        return () => unsubscribe();
    }, [justRegistered]);

    return null;
};

export default ToastManager;