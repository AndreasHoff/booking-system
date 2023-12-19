import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const ToastManager = () => {
    useEffect(() => {
        let prevUser = null;

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && !prevUser) {
                toast.success('Login successful', { autoClose: 1000 });
            } else if (!user && prevUser) {
                toast.success('Logout successful', { autoClose: 1000 });
            }

            prevUser = user;
        });

        return () => unsubscribe();
    }, []);

    return null;
};

export default ToastManager;