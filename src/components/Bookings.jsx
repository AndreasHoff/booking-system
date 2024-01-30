import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { db } from '../firebase';
import '../styles/Bookings.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [isAnyRowExpanded, setIsAnyRowExpanded] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const user = useAuth(); // Use the useAuth hook to get the authentication state


    useEffect(() => {
        const fetchBookings = async () => {
        const bookingCollection = collection(db, 'bookings');
        const bookingQuery = query(bookingCollection, orderBy('createdAt', 'desc'));
        const bookingSnapshot = await getDocs(bookingQuery);
        const bookingList = bookingSnapshot.docs.map((doc, index) => ({ ...doc.data(), index, id: doc.id }));
        setBookings(bookingList);
    };

        fetchBookings();
    }, []);

    useEffect(() => {
        const dropdownItems = document.querySelectorAll('.p-dropdown-items .p-dropdown-item');
        dropdownItems.forEach(item => {
            const text = item.textContent.trim();
            if (text === 'Accepted') {
                item.classList.add('status-accepted');
            } else if (text === 'Pending') {
                item.classList.add('status-pending');
            } else if (text === 'Declined') {
                item.classList.add('status-declined');
            }
        });
    }, []);

    const toggleRow = (index) => {
        setExpandedRows((prevExpandedRows) => {
        const newExpandedRows = [...prevExpandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setIsAnyRowExpanded(newExpandedRows.includes(true));
        return newExpandedRows;
        });
    };

    const updateStatus = async (id, status, event) => {
        event.stopPropagation();
    
        const bookingRef = doc(db, 'bookings', id);
        await updateDoc(bookingRef, {
            status: status,
        });
    
        console.log(`Booking ${id} status changed to ${status}`); // Log a message to the console
    
        const change = `Booking ${id} status changed to ${status} at ${new Date().toLocaleString()}`;

        // Add the entry to the 'user-trail' collection
        await addDoc(collection(db, 'activity-log', user.uid, 'booking-status-changes'), { change, timestamp: serverTimestamp() });
    
        setBookings((prevBookings) =>
            prevBookings.map((booking) => (booking.id === id ? { ...booking, status: status } : booking))
        );
    };

    const statusOptions = [
        { label: 'Accepted', value: 'accepted' },
        { label: 'Pending', value: 'pending' },
        { label: 'Declined', value: 'declined' },
    ];

    return (
        <div className={`bookings-container ${isAnyRowExpanded ? 'button-clicked' : ''}`}>
            <table className="bookings-table">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {bookings.slice(first, first + rows).map((rowData, index) => (
                    <React.Fragment key={index}>
                        <tr
                            onClick={() => toggleRow(index)}
                            className={`booking-row ${expandedRows[index] ? 'expanded' : ''}`}
                        >
                            <td>{rowData.service}</td>
                            <td>{rowData.date}</td>
                            <td>{rowData.fullName}</td>
                            <td>{rowData.email}</td>
                            <td>{rowData.phoneNumber}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                            <Dropdown
                                value={rowData.status}
                                options={statusOptions}
                                onChange={(e) => updateStatus(rowData.id, e.value, e.originalEvent)}
                                placeholder="Select Status"
                                className={`status-dropdown status-${rowData.status}`}
                                optionLabel="label"
                            />
                            </td>
                        </tr>
                        {expandedRows[index] && (
                            <tr>
                                <td colSpan="7">
                                    <div className={`expanded-details ${expandedRows[index] ? 'visible' : ''}`}>
                                        <p>{rowData.comment}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
            <Paginator 
                first={first} 
                rows={rows} 
                totalRecords={bookings.length} 
                onPageChange={(e) => {
                    setFirst(e.first);
                    setRows(e.rows);
                }}
                rowsPerPageOptions={[10, 15, 25]}
            />
        </div>
    );
};

export default Bookings;