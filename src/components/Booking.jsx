import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { addDoc, collection, serverTimestamp, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/Booking.css';

const BookingComponent = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [categories, setCategories] = useState([]);
    const [dialogData, setDialogData] = useState({ fullName: '', email: '' });

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), async (snapshot) => {
            const categoriesData = [];
            for (const doc of snapshot.docs) {
                const servicesSnapshot = await getDocs(collection(doc.ref, 'services'));
                const servicesData = servicesSnapshot.docs.map(serviceDoc => ({ ...serviceDoc.data(), id: serviceDoc.id }));
                categoriesData.push({ ...doc.data(), id: doc.id, services: servicesData });
            }
            console.log('Fetched Categories:', categoriesData);
            setCategories(categoriesData);
        });
        return () => unsubscribe();
    }, []);

    const validate = (data) => {
        let errors = {};
        if (!data.fullName) {
            errors.fullName = 'Full Name is required.';
        }
        return errors;
    };

    const onSubmit = async (data) => {
        const fullName = data.fullName;
        const email = data.email;
        const termsAccepted = data.accept;

        // ... (your existing code)

        const firebaseData = {
            fullName,
            email,
            phoneNumber,
            comment,
            createdAt: serverTimestamp(),
            status: 'pending'
        });

        const data = {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            comment: comment,
            termsAccepted: termsAccepted,
            selectedCategory: selectedCategory,
            selectedService: selectedService,
            selectedDate: selectedDate,
            status: 'pending'
        };

        setDialogData({ fullName, email }); // Set data for the dialog
        writeToFirebase(firebaseData);

        setShowMessage(true); // Show the dialog
    };

    const writeToFirebase = (data) => {
        console.log('Data being written to Firebase: ', data);
        // You can add logic to write to Firebase here
    };
    
    

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="booking-form-container">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{dialogData.fullName}</b>; it'll be valid next 30 days without activation.
                        Please check <b>{dialogData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>
                    <Form onSubmit={onSubmit} initialValues={{}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            {/* Category */}
                            <Field name="selectedCategory" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="category" {...input} options={categories} optionLabel="name" />
                                        <label htmlFor="category">Category</label>
                                    </span>
                                </div>
                            )} />

                            {/* Service - Conditionally rendered based on the selected category */}
                            <Field name="selectedService" render={({ input }) => {
                                const selectedCategoryData = categories.find(category => category.id === input.value);
                                return (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Dropdown id="service" {...input} options={selectedCategoryData?.services || []} optionLabel="name" optionValue="id" className="p-inputtext" />
                                            <label htmlFor="service">Service</label>
                                        </span>
                                    </div>
                                );
                            }} />

                            {/* Name */}
                            <Field name="fullName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="fullName" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="fullName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Full Name*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            {/* Email */}
                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            {/* Phone Number */}
                            <Field name="phoneNumber" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="phoneNumber" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="phoneNumber" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Phone Number</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                                    {/* Birthday */}
                            <Field name="date" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon className="p-inputtext" />
                                        <label htmlFor="date">Birthday</label>
                                    </span>
                                </div>
                            )} />

                            {/* Password */}
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            {/* Comment */}
                            <Field name="comment" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="comment" {...input} className="p-inputtext" />
                                        <label htmlFor="comment">Comment</label>
                                    </span>
                                </div>
                            )} />

                            {/* Accept Terms */}
                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
                                </div>
                            )} />

                            <Button type="submit" label="Submit" className="mt-2" />
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
};

export default BookingComponent;
