import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { db } from '../firebase'; // replace with your firebase import


const ActivityLog = ({ userId }) => {
    const [logs, setLogs] = useState([]);
    const user = useAuth(); // Use the useAuth hook to get the authentication state


    const fetchLogs = async () => {
        try {
            console.log(`Fetching 'user-trails' documents under document ${user.uid}...`);
            const logSnapshot = await getDocs(query(collection(db, 'activity-log', user.uid, 'user-trails'), orderBy('timestamp', 'desc')));
            console.log(`Fetched 'user-trails' documents under document ${user.uid}`);
            const logs = logSnapshot.docs.map(logDoc => {
                return { id: logDoc.id, ...logDoc.data() };
            });
            setLogs(logs);
        } catch (error) {
            console.error("Error fetching logs: ", error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div>
            {logs.map(log => (
                <div key={log.id}>
                    <h2>{log.change}</h2> {/* Replace 'title' with the actual property name */}
                </div>
            ))}
        </div>
    );
};

export default ActivityLog;