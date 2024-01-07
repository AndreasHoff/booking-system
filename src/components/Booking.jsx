import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { db } from '../firebase';
import '../styles/Booking.css';

export const BookingComponent = () => {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchCategoriesAndServices = async () => {
            const categoriesSnapshot = await getDocs(collection(db, 'categories'));
            const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const categoriesWithServices = await Promise.all(categoriesData.map(async category => {
                const servicesSnapshot = await getDocs(collection(db, 'categories', category.id, 'services'));
                const servicesData = servicesSnapshot.docs.map(doc => ({ label: doc.data().name, value: doc.id }));
                return { label: category.name, value: category.id, services: servicesData };
            }));

            setCategories(categoriesWithServices);
            if (categoriesWithServices.length > 0) {
                setServices(categoriesWithServices[0].services.map(service => ({ label: service.label, value: service.value })));
            }
        };

        fetchCategoriesAndServices();
    }, []);

    const DropdownAdapter = ({ input, ...rest }) => (
        <Dropdown {...input} {...rest} onChange={(e) => {
            input.onChange(e.value);
            const selectedCategory = categories.find(category => category.id === e.value);
            setServices(selectedCategory ? selectedCategory.services : []);
        }} />
    );

    const validate = (data) => {
        let errors = {};

        if (!data.selectedCategory) {
            errors.selectedCategory = 'Category is required.';
        }

        if (!data.selectedService) {
            errors.selectedService = 'Service is required.';
        }

        if (!data.fullName) {
            errors.fullName = 'Full name is required.';
        }

        if (!data.email) {
            errors.email = 'Email is required.';
        }

        if (!data.phoneNumber) {
            errors.phoneNumber = 'Phone number is required.';
        }

        if (!data.termsAccepted) {
            errors.termsAccepted = 'You need to agree to the terms and conditions.';
        }

        return errors;
    };

    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);
    
        writeToFirebase(data);
    
        form.restart();
    };

    const fetchServices = categoriesData.map(async category => {
        const servicesSnapshot = await getDocs(collection(db, 'categories', category.id, 'services'));
        const servicesData = servicesSnapshot.docs.map(doc => ({ label: doc.data().name, value: doc.id }));
        return { label: category.name, value: category.id, services: servicesData };
    });

    async function writeToFirebase(data) {
        try {
            const docRef = await addDoc(collection(db, "bookings"), {
                ...data,
                timestamp: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

return (
    <Form
    onSubmit={onSubmit}
    initialValues={formData}
    validate={validate}
    render={({ handleSubmit }) => (
        <div className="booking-form-container">
            <form onSubmit={handleSubmit} className="booking-form p-fluid">
                <h5>Booking Form</h5>
                <div className="p-field">
                    <label htmlFor="selectedCategory">Select a category</label>
                    <Field name="selectedCategory" component={DropdownAdapter} options={categories.map(category => ({ label: category.name, value: category.id }))} />
                </div>
                <div className="p-field">
                    <label htmlFor="selectedService">Select a service</label>
                    <Field name="selectedService" component={DropdownAdapter} options={services.map(service => ({ label: service.name, value: service.id }))} />
                </div>
                <div className="p-field">
                    <label htmlFor="fullName">Full Name</label>
                    <Field name="fullName" component={InputText} />
                </div>
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <Field name="email" component={InputText} />
                </div>
                <div className="p-field">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field name="phoneNumber" component={InputText} />
                </div>
                <div className="p-field">
                    <label htmlFor="date">Date</label>
                    <Field name="date" render={({ input, meta }) => (
                        <span className={classNames({ 'p-invalid': meta.touched && meta.error })}>
                            <Calendar {...input} id="date" showIcon />
                            {meta.touched && meta.error && <small className="p-error">{meta.error}</small>}
                        </span>
                    )} />
                </div>
                <div className="p-field-checkbox">
                    <Field name="termsAccepted" component={Checkbox} />
                    <label htmlFor="termsAccepted">I accept the terms and conditions</label>
                </div>
                <Button type="submit" label="Submit" className="p-mt-2" />
                <Dialog visible={showMessage} style={{ width: '450px' }} header="Booking Details" onHide={() => setShowMessage(false)}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12">
                            <label htmlFor="fullName">Full Name</label>
                            <InputText id="fullName" value={formData.fullName} readOnly />
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={formData.email} readOnly />
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <InputText id="phoneNumber" value={formData.phoneNumber} readOnly />
                        </div>
                    </div>
                </Dialog>
            </form>
        </div>
    )}
/>
);

};

export default BookingComponent;