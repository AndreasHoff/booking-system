import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // replace with your firebase import

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        try {
            console.log("Fetching documents from 'activity-log'...");
            const userSnapshot = await getDocs(collection(db, 'activity-log'));
            console.log("Fetched documents from 'activity-log'");
            if (!userSnapshot.empty) {
                for (const userDoc of userSnapshot.docs) {
                    console.log(`Fetching 'user-trails' documents under document ${userDoc.id}...`);
                    const logSnapshot = await getDocs(collection(db, 'activity-log', userDoc.id, 'user-trails'));
                    console.log(`Fetched 'user-trails' documents under document ${userDoc.id}`);
                    logSnapshot.docs.forEach(logDoc => {
                        const data = { id: logDoc.id, ...logDoc.data() };
                        console.log(data); // log the data
                    });
                }
            } else {
                console.log("'activity-log' collection is empty");
            }
        } catch (error) {
            console.error("Error fetching logs: ", error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className="activity-log">
            {logs.map((log, index) => (
                <div key={index}>
                    <h3>Log {index + 1}</h3>
                    <p>ID: {log.entry}</p>
                    {/* Display other fields here */}
                </div>
            ))}
        </div>
    );
};

export default ActivityLog;