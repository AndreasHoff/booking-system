import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const ToastManager = () => {
    const [prevUser, setPrevUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

                if (isNewUser && prevUser === null) {
                    setTimeout(() => {
                        toast.success('Registration successful', { autoClose: 100 });
                    }, 500);
                } else if (prevUser && !isNewUser) {
                    setTimeout(() => {
                        toast.success('Login successful', { autoClose: 100 });
                    }, 500);
                }
            } else if (prevUser) {
                setTimeout(() => {
                    toast.success('Logout successful', { autoClose: 100 });
                }, 500);
            }

            setPrevUser(user);
        });

        return () => unsubscribe();
    }, [prevUser]);

    return null;
};

export default ToastManager;
