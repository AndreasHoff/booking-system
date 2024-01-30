import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { db } from '../firebase'; // replace with your firebase import


const ActivityLog = ({ userId }) => {
    const [logs, setLogs] = useState([]);
    const [bookingStatusChanges, setBookingStatusChanges] = useState([]);
    const user = useAuth(); // Use the useAuth hook to get the authentication state


    const fetchLogs = async () => {
        try {
            const logSnapshot = await getDocs(query(collection(db, 'activity-log', user.uid, 'user-trails'), orderBy('timestamp', 'desc')));
            const logs = logSnapshot.docs.map(logDoc => {
                return { id: logDoc.id, ...logDoc.data() };
            });
            setLogs(logs);
        } catch (error) {
            console.error("Error fetching logs: ", error);
        }
    };

    const fetchBookingStatusChanges = async () => {
        try {
            const bookingStatusChangesSnapshot = await getDocs(query(collection(db, 'activity-log', user.uid, 'booking-status-changes'), orderBy('timestamp', 'desc')));
            const bookingStatusChanges = bookingStatusChangesSnapshot.docs.map(bookingStatusChangesDoc => {
                return { id: bookingStatusChangesDoc.id, ...bookingStatusChangesDoc.data() };
            });
            setBookingStatusChanges(bookingStatusChanges);
        } catch (error) {
            console.error("Error fetching booking status changes: ", error);
        }
    };

    const deleteLogs = async () => {
        try {
            console.log(`Deleting 'user-trails' documents under document ${user.uid}...`);
            const logSnapshot = await getDocs(collection(db, 'activity-log', user.uid, 'user-trails'));
            const deletePromises = logSnapshot.docs.map(logDoc => deleteDoc(doc(db, 'activity-log', user.uid, 'user-trails', logDoc.id)));
            await Promise.all(deletePromises);
            console.log(`Deleted 'user-trails' documents under document ${user.uid}`);
            setLogs([]); // Clear the logs state
        } catch (error) {
            console.error("Error deleting logs: ", error);
        }
    };

    useEffect(() => {
        fetchLogs();
        fetchBookingStatusChanges();
    }, []);

    return (
        <div>
            <button onClick={deleteLogs}>Delete All Logs</button>
            <div>
                {logs.map(log => (
                    <div key={log.id}>
                        <h2>{log.change}</h2> {/* Replace 'title' with the actual property name */}
                    </div>
                ))}
            </div>
            <div>
                {bookingStatusChanges.map(log => (
                    <div key={log.id}>
                        <h2>{log.change}</h2> {/* Replace 'title' with the actual property name */}
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default ActivityLog;