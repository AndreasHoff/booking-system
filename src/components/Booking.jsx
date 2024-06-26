import { addDoc, collection, getDocs, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import '../styles/Booking.css';

const Booking = (callback) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [comment, setComment] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const { t: translate, i18n } = useTranslation();
    const toast = useRef(null);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), async (snapshot) => {
            const categoriesData = [];
            for (const doc of snapshot.docs) {
                const servicesSnapshot = await getDocs(collection(doc.ref, 'services'));
                const servicesData = servicesSnapshot.docs.map(serviceDoc => ({ ...serviceDoc.data(), id: serviceDoc.id }));
                categoriesData.push({ ...doc.data(), id: doc.id, services: servicesData });
            }
            setCategories(categoriesData);
        });
        i18n.changeLanguage('da');
        return () => unsubscribe();
    }, [i18n]);


    const handleCategoryChange = async (category) => {
        setSelectedCategory(category);
        setSelectedService('');
        setAccordionOpen(!isAccordionOpen);
    };

    const handleServiceChange = (e) => {
        const selectedServiceObject = categories
            .find((category) => category.id === selectedCategory)
            .services
            .find((service) => service.id === e.target.value);
        if (selectedServiceObject) {
            setSelectedService(selectedServiceObject.name);
            setSelectedServiceId(selectedServiceObject.id);
    
        } else {
            setSelectedService(null);
            setSelectedServiceId(null);
        }
    };

    const resetForm = () => {
        setSelectedCategory('');
        setSelectedService('');
        setSelectedServiceId('');
        setSelectedDate('');
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setComment('');
        setTermsAccepted(false);
        setAccordionOpen(false);
    };

    const handleConfirm = async () => {
        if (!termsAccepted) {
            alert(translate('booking.accept_terms.alert'));
            return;
        }
    
        if (!selectedCategory) {
            alert(translate('booking.select_category.alert'));
            return;
        }
    
        if (!selectedService) {
            alert('Please select a service');
            return;
        }
    
        const bookingData = {
            category: selectedCategory,
            service: selectedService,
            date: selectedDate,
            fullName,
            email,
            phoneNumber,
            comment,
            createdAt: serverTimestamp(),
            status: 'pending'
        };

        await addDoc(collection(db, 'bookings'), bookingData);
        toast.current.show({severity:'success', summary: 'Successful Booking', detail:'Your booking has been confirmed', life: 3000});
        resetForm();
    };

     return (
        <div className="booking-container">
            <Toast ref={toast} />
            <div className="booking-form-container">
                <div className='card'>
                    <div>
                        <label>Select a category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                        >
                            <option value="">
                                Choose a category
                            </option>
                            {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.id}
                            </option>
                            ))}
                        </select>
                    </div>
                {selectedCategory && (
                <div>
                <label>Select a service</label>
                <select 
                    value={selectedServiceId} 
                    onChange={handleServiceChange}
                >
                    <option value="">
                        Choose a service
                    </option>
                    {categories
                        .find((category) => category.id === selectedCategory)
                        .services
                        .map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))
                    }
                </select>
                {selectedService && (
                    <div>
                    <p>
                        {categories
                            .find((category) => category.id === selectedCategory)
                            .services
                            .find((service) => service.name === selectedService)
                            .description}
                    </p>
                    <p>
                        Price: {categories
                            .find((category) => category.id === selectedCategory)
                            .services
                            .find((service) => service.name === selectedService)
                            .price}
                    </p>
                </div>
                )}
            </div>
        )}
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                <h2>Personal Information</h2>
                <form onSubmit={(e) => e.preventDefault()} className="booking-form">
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
    </div>
    );
};
export default Booking;
