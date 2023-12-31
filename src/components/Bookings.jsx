import Tippy from '@tippyjs/react';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/bookings.css';

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
        <table className="w-full rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2">Service</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">Comment</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking, index) => (
                    <tr key={index} className="border-b border-gray-200">
                        <td className="px-4 py-2">{booking.service}</td>
                        <td className="px-4 py-2">{booking.date}</td>
                        <td className="px-4 py-2">{booking.fullName}</td>
                        <td className="px-4 py-2">{booking.email}</td>
                        <td className="px-4 py-2">{booking.phoneNumber}</td>
                        <td className="px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs">
                            <Tippy content={booking.comment} theme="custom" maxWidth={500} placement='top-start'>
                                <span>{booking.comment}</span>
                            </Tippy>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Bookings;