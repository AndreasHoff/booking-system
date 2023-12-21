import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const bookingCollection = collection(db, 'bookings');
            const bookingSnapshot = await getDocs(bookingCollection);
            const bookingList = bookingSnapshot.docs.map(doc => doc.data());
            setBookings(bookingList);
        };

        fetchBookings();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking, index) => (
                    <tr key={index}>
                        <td>{booking.service}</td>
                        <td>{booking.date}</td>
                        <td>{booking.fullName}</td>
                        <td>{booking.email}</td>
                        <td>{booking.phoneNumber}</td>
                        <td>{booking.comment}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Bookings;