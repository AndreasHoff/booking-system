import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { db } from '../firebase';
import '../styles/ActivityLog.css';


const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const [bookingStatusChanges, setBookingStatusChanges] = useState([]);
    const user = useAuth(); // Use the useAuth hook to get the authentication state


    const fetchLogs = useCallback(async () => {
        try {
            const logSnapshot = await getDocs(query(collection(db, 'activity-log', user.uid, 'user-trails'), orderBy('timestamp', 'desc')));
            const logs = logSnapshot.docs.map(logDoc => {
                return { id: logDoc.id, ...logDoc.data() };
            });
            setLogs(logs);
        } catch (error) {
            console.error("Error fetching logs: ", error);
        }
    }, [user.uid]);

    const fetchBookingStatusChanges = useCallback(async () => {
        try {
            const bookingStatusChangesSnapshot = await getDocs(query(collection(db, 'activity-log', user.uid, 'booking-status-changes'), orderBy('timestamp', 'desc')));
            const bookingStatusChanges = bookingStatusChangesSnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
            setBookingStatusChanges(bookingStatusChanges);
        } catch (error) {
            console.error("Error fetching booking status changes: ", error);
        }
    }, [user.uid]);

    const deleteLogs = async () => {
        try {
            console.log(`Deleting 'user-trails' and 'booking-status-changes' documents under document ${user.uid}...`);
    
            const userTrailsSnapshot = await getDocs(collection(db, 'activity-log', user.uid, 'user-trails'));
            const bookingStatusChangesSnapshot = await getDocs(collection(db, 'activity-log', user.uid, 'booking-status-changes'));
    
            const deletePromises = [
                ...userTrailsSnapshot.docs.map(logDoc => deleteDoc(doc(db, 'activity-log', user.uid, 'user-trails', logDoc.id))),
                ...bookingStatusChangesSnapshot.docs.map(logDoc => deleteDoc(doc(db, 'activity-log', user.uid, 'booking-status-changes', logDoc.id)))
            ];
    
            await Promise.all(deletePromises);
    
            console.log(`Deleted 'user-trails' and 'booking-status-changes' documents under document ${user.uid}`);
            setLogs([]); // Clear the logs state
            setBookingStatusChanges([]); // Clear the booking status changes state
        } catch (error) {
            console.error("Error deleting logs: ", error);
        }
    };

    useEffect(() => {
        fetchLogs();
        fetchBookingStatusChanges();
    }, [fetchLogs, fetchBookingStatusChanges]);

    return (
        <div className="activity-log">
            <h1>Activity Log</h1>
            <button className="delete-button" onClick={deleteLogs}>Delete All Logs</button>
            <div className="log-section">
                <h2>User Activity Logs</h2>
                {logs.map(log => (
                    <div key={log.id} className="log-item">
                        <h3>{log.change}</h3> {/* Replace 'title' with the actual property name */}
                    </div>
                ))}
            </div>
            <div className="log-section">
                <h2>Booking Status Changes</h2>
                {bookingStatusChanges.map(log => (
                    <div key={log.id} className="log-item">
                        <h3>{log.change}</h3> {/* Replace 'title' with the actual property name */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;