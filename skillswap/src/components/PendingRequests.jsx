import React, { useEffect, useState } from "react";
import { fetchMatchRequests } from "../utils/fetchMatchRequests";
import { db } from "../config/firebase";
import { doc, updateDoc, deleteDoc, getDocs, collection, where, query } from "firebase/firestore";

const PendingRequests = ({ currentUser }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const loadRequests = async () => {
            const data = await fetchMatchRequests(currentUser);
            setRequests(data);
        };
        loadRequests();
    }, [currentUser]);

    const acceptRequest = async (requestId, senderId, receiverId) => {
        try {
            const requestRef = doc(db, "matchRequests", requestId);
            await updateDoc(requestRef, { status: "accepted" });

            // Check if the other user has also accepted
            const q = query(
                collection(db, "matchRequests"),
                where("senderId", "in", [senderId, receiverId]),
                where("receiverId", "in", [senderId, receiverId])
            );

            const snapshot = await getDocs(q);
            const allAccepted = snapshot.docs.every(doc => doc.data().status === "accepted");

            if (allAccepted) {
                // If both users accepted, update both requests to "confirmed"
                snapshot.docs.forEach(async (doc) => {
                    await updateDoc(doc.ref, { status: "confirmed" });
                });
            }

            setRequests(requests.map(req => req.id === requestId ? { ...req, status: "accepted" } : req));
            alert("✅ Match request accepted!");
        } catch (error) {
            console.error("❌ Error accepting request:", error);
        }
    };

    const rejectRequest = async (requestId) => {
        try {
            const requestRef = doc(db, "matchRequests", requestId);
            await deleteDoc(requestRef);

            setRequests(requests.filter(req => req.id !== requestId));
            alert("❌ Match request rejected!");
        } catch (error) {
            console.error("❌ Error rejecting request:", error);
        }
    };

    return (
        <div>
            <h3>Pending Match Requests</h3>
            {requests.length === 0 ? (
                <p>No pending requests</p>
            ) : (
                <ul>
                    {requests.map(req => (
                        <li key={req.id}>
                            Request from {req.senderName} - 
                            <strong style={{ color: req.status === "confirmed" ? "green" : "orange" }}>
                                {req.status === "confirmed" ? " Matched! 🎉" : " Pending..."}
                            </strong>
                            {req.status === "pending" && (
                                <>
                                    <button onClick={() => acceptRequest(req.id, req.senderId, req.receiverId)}>Accept</button>
                                    <button onClick={() => rejectRequest(req.id)}>Reject</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PendingRequests;
