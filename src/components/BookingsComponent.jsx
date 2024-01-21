import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/BookingsComponent.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isAnyRowExpanded, setIsAnyRowExpanded] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            const bookingCollection = collection(db, 'bookings');
            const bookingQuery = query(bookingCollection, orderBy('createdAt', 'desc'));
            const bookingSnapshot = await getDocs(bookingQuery);
            const bookingList = bookingSnapshot.docs.map((doc, index) => ({...doc.data(), index, id: doc.id}));
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

    const updateStatus = async (rowData) => {
        if (rowData.status === 'pending') {
            const bookingRef = doc(db, 'bookings', rowData.id);
            await updateDoc(bookingRef, {
                status: 'accepted'
            });
            setBookings(bookings.map(booking => booking.id === rowData.id ? {...booking, status: 'accepted'} : booking));
        }
    }

    return (
        <DataTable value={bookings} className={`bookings-table ${isAnyRowExpanded ? 'button-clicked' : ''}`}>
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='service' header='Service' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='date' header='Date' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='fullName' header='Name' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} className='email' field='email' header='Email' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} field='phoneNumber' header='Number' className='number' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} body={commentBodyTemplate} header='Comment' className='comment' />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} 
            body={rowData => {
                if (rowData.status === 'pending') {
                    return <button onClick={() => updateStatus(rowData)} className="status-button pending">Pending</button>;
                } else if (rowData.status === 'cancelled') {
                    return <button className="status-button cancelled">Cancelled</button>;
                } else if (rowData.status === 'accepted') {
                    return <button className="status-button accepted">Accepted</button>;
                }
            }} 
            header='Status'
            />
            <Column headerStyle={{backgroundColor: '#9fffe2'}} body={readMoreBodyTemplate} header='' />
        </DataTable>
    );
};

export default Bookings;