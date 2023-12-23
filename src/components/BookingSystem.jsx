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
    const [isAccordionOpen, setAccordionOpen] = useState(false);

    const services = [
        {
            category: 'animals',
            items: ['lion', 'bird', 'dog', 'cat'],
        },
        {
            category: 'cars',
            items: ['sedan', 'SUV', 'truck', 'convertible'],
        },
        // Add more categories as needed
    ];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedService(''); // Reset selected service when category changes
        setAccordionOpen(!isAccordionOpen); // Toggle accordion open/close
    };

    const handleConfirm = async () => {
        if (!termsAccepted) {
            alert('You must accept the terms');
            return;
        }
    
        if (!selectedCategory) {
            alert('Please select a category');
            return;
        }
    
        if (!selectedService) {
            alert('Please select a service');
            return;
        }
    
        const docRef = await addDoc(collection(db, 'bookings'), {
            category: selectedCategory,
            service: selectedService,
            date: selectedDate,
            fullName,
            email,
            phoneNumber,
            comment,
        });
    
        console.log('Document written with ID: ', docRef.id);
    };

    return (
        <div className="booking-container">
            <div className="booking-card">
                <div className="accordion-header">
                    <label>Select a category</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className={isAccordionOpen ? 'open' : ''}
                    >
                        <option value="" disabled>
                            Choose a category
                        </option>
                        {services.map((service) => (
                            <option key={service.category} value={service.category}>
                                {service.category}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedCategory && isAccordionOpen && (
                    <div className="accordion-content">
                        <label>Select a service</label>
                        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                            <option value="" disabled>
                                Choose a service
                            </option>
                            {services
                                .find((service) => service.category === selectedCategory)
                                .items.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                        </select>
                    </div>
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

                    <button className='confirm' type="button" onClick={handleConfirm}>
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingSystem;
