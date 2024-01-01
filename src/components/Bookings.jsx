import { collection, getDocs } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/Bookings.css'; // Assuming you have a CSS file for styles

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isAnyRowExpanded, setIsAnyRowExpanded] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            const bookingCollection = collection(db, 'bookings');
            const bookingSnapshot = await getDocs(bookingCollection);
            const bookingList = bookingSnapshot.docs.map((doc, index) => ({...doc.data(), index}));
            setBookings(bookingList);
        };
    
        fetchBookings();
    }, []);
    
    const commentBodyTemplate = (rowData) => {
        return (
            <div className={expandedRows[rowData.index] ? 'full-comment' : 'truncated-comment'} style={{width: expandedRows[rowData.index] ? '200px' : 'auto'}}>
                {rowData.comment}
            </div>
        );
    }
    
    const toggleRow = (e, rowData) => {
        e.preventDefault();
        setIsButtonClicked(!isButtonClicked);
        setExpandedRows(prevState => {
            const newState = {
                ...prevState,
                [rowData.index]: !prevState[rowData.index]
            };
            setIsAnyRowExpanded(Object.values(newState).includes(true));
            return newState;
        });
    }

    const readMoreBodyTemplate = (rowData) => {
        if (rowData.comment.length <= 20) {
            return null;
        }
    
        return (
            <Button icon={expandedRows[rowData.index] ? 'pi pi-chevron-up' : 'pi pi-chevron-down'} className='p-button-rounded p-mr-2 chevron-button' onClick={(e) => toggleRow(e, rowData)} />
        );
    }

    return (
        <DataTable value={bookings} className={`bookings-table ${isAnyRowExpanded ? 'button-clicked' : ''}`}>
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='service' header='Service' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='date' header='Date' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='fullName' header='Name' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='email' header='Email' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='phoneNumber' header='Number' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} body={commentBodyTemplate} header='Comment' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} body={readMoreBodyTemplate} header='' />
        </DataTable>
    );
};

export default Bookings;