import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import '../styles/bookingSystem.css';

const BookingSystem = () => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [comment, setComment] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const services = ['Service 1', 'Service 2', 'Service 3']; // Replace with your actual services

    const handleConfirm = async () => {
        if (!termsAccepted) {
            alert('You must accept the terms');
            return;
        }

        const docRef = await addDoc(collection(db, 'bookings'), {
            service: selectedService,
            date: selectedDate,
            fullName,
            email,
            phoneNumber,
            comment
        });

        console.log('Document written with ID: ', docRef.id);
    };

    return (
        <div className="booking-container">
            <div className="booking-card">
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                    {services.map((service) => (
                        <option key={service} value={service}>
                            {service}
                        </option>
                    ))}
                </select>

                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <label>
                        <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.value)} />
                        I accept the terms
                    </label>
                    <button type="submit" onClick={handleConfirm}>Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default BookingSystem;