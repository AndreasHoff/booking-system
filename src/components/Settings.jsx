import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import '../styles/settings.css';

const Settings = () => {
  const [category, setCategory] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add or update the category document
      const categoryDocRef = doc(db, 'categories', category);
      await setDoc(categoryDocRef, {});

      // Add a new service to the category
      const serviceRef = collection(categoryDocRef, 'services');
      await addDoc(serviceRef, { name: serviceName, description });

      // Clear form fields after successful submission
      setCategory('');
      setServiceName('');
      setDescription('');

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

        <label>
          Service Name:
          <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
        </label>

        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Settings;