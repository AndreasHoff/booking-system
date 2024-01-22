// JSX
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/BookingsComponent.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isAnyRowExpanded, setIsAnyRowExpanded] = useState(false);

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
setBookings((prevBookings) =>
    prevBookings.map((booking) => (booking.id === id ? { ...booking, status: status } : booking))
);
};

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
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
          {bookings.map((rowData, index) => (
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
                />
                </td>
              </tr>
              {expandedRows[index] && (
                <tr>
                  <td colSpan="7">
                    <div className="expanded-details">
                      <p>{rowData.comment}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;