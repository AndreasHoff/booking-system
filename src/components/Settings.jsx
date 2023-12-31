import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import '../styles/settings.css';

const Settings = () => {
    const [category, setCategory] = useState('');
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');

    const handleAddService = () => {
        // Add the current service to the services array
        setServices([...services, { name: serviceName, description }]);

        // Clear the service input fields
        setServiceName('');
        setDescription('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add or update the category document
            const categoryDocRef = doc(db, 'categories', category);
            await setDoc(categoryDocRef, {}, { merge: true });

            // Add all services to the category
            const serviceRef = collection(categoryDocRef, 'services');
            for (const service of services) {
                await addDoc(serviceRef, service);
            }

            // Clear form fields after successful submission
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
                <button type="button" onClick={handleAddService}>Add Service to Category</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Settings;