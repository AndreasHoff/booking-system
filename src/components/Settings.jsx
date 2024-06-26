import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import '../styles/Settings.css';

const Settings = () => {
    const [category, setCategory] = useState('');
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddService = () => {
        setServices([...services, { name: serviceName, description, price }]);
        setServiceName('');
        setDescription('');
        setPrice('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const categoryDocRef = doc(db, 'categories', category);
            // Set the category document in Firestore, merging with existing data if it exists
            await setDoc(categoryDocRef, {}, { merge: true });
            // Create a reference to the services collection within the category document
            const serviceRef = collection(categoryDocRef, 'services');
            // Add each service in the services array to the services collection in Firestore
            for (const service of services) {
                await addDoc(serviceRef, service);
            }
            // Clear the category and services fields after successful submission
            setCategory('');
            setServices([]);
            console.log('Data successfully written to Firestore!');
        } catch (error) {
            console.error('Error writing data to Firestore:', error);
        }
    };

    return (
        <div className="settings-form">
            <h2>Add or edit a Service</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Category
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </label>
                {services.map((service, index) => (
                    <div key={index}>
                        <p>Service Name: {service.name}</p>
                        <p>Description: {service.description}</p>
                        <p>Price: {service.price}</p>
                    </div>
                ))}
                <label>
                    Service Name:
                    <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Price:
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <button type="button" onClick={handleAddService}>Add Service to Category</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Settings;
