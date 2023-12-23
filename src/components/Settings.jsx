import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import '../styles/settings.css';

const Settings = () => {
    const [service, setService] = useState('');
    const [category, setCategory] = useState('');

    const handleCreate = async () => {
        const docRef = await addDoc(collection(db, 'services'), {
            service,
            category
        });
        toast.success("Service created successfully");
        console.log("Document written with ID: ", docRef.id);
    };

    const handleUpdate = async (id) => {
        const docRef = doc(db, 'services', id);
        await updateDoc(docRef, {
            service,
            category
        });
    };

    const handleDelete = async (id) => {
        const docRef = doc(db, 'services', id);
        await deleteDoc(docRef);
    };

    return (
        <div className="settings-form">
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="Service" />
            <button onClick={handleCreate}>Create</button>
            <button onClick={() => handleUpdate(service.id)}>Update</button>
            <button onClick={() => handleDelete(service.id)}>Delete</button>
        </div>
    );
};

export default Settings;