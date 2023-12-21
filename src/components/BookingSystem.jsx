import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import '../styles/bookingSystem.css';

const BookingSystem = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [comment, setComment] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const services = [
    {
        category: 'animals',
        items: ['lion', 'bird', 'dog', 'cat'],
    },
    {
        category: 'cars',
        items: ['sedan', 'SUV', 'truck', 'convertible'],
    },
  ];

    const handleConfirm = async () => {
        if (!termsAccepted) {
            alert('You must accept the terms');
        return;
    }

    const docRef = await addDoc(collection(db, 'bookings'), {
        service: selectedService,
        category: selectedCategory,
        date: selectedDate,
        fullName,
        email,
        phoneNumber,
        comment,
    });

        console.log('Document written with ID: ', docRef.id);
    };

const handleCategoryChange = (category) => {
    // Update the selected category and reset the selected item
    setSelectedCategory(category);
    setSelectedService('');
  };

    return (
        <div className="booking-container">
            <div className="booking-card">
                <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="" disabled>Select a category</option>
                {services.map((service) => (
                    <option key={service.category} value={service.category}>
                    {service.category}
                    </option>
                ))}
                </select>

                {selectedCategory && (
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                    <option value="" disabled>Select an item</option>
                    {services
                    .find((service) => service.category === selectedCategory)
                    .items.map((item) => (
                        <option key={item} value={item}>
                        {item}
                        </option>
                    ))}
                </select>
                )}

                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

                {/* The rest of your form */}
                <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <label>
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                    I accept the terms
                </label>

                <button type="button" onClick={handleConfirm}>
                    Confirm
                </button>
                </form>
            </div>
        </div>
    );
};

export default BookingSystem;
