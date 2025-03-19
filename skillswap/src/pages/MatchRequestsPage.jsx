import React, { useEffect, useState } from "react";
import { fetchMatchRequests } from "../utils/fetchMatchRequests";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Card, Typography, Button, Box, Stack, Divider } from "@mui/material";

const MatchRequestsPage = () => {
    const { user } = useAuth();
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchRequests = async () => {
            const { incomingRequests, outgoingRequests } = await fetchMatchRequests(user);
            setIncomingRequests(incomingRequests);
            setOutgoingRequests(outgoingRequests);
        };

        fetchRequests();
    }, [user]);

    // Accept Request
    const acceptRequest = async (requestId) => {
        try {
            const requestRef = doc(db, "matchRequests", requestId);
            await updateDoc(requestRef, { status: "matched" });

            setIncomingRequests(incomingRequests.map(req => req.id === requestId ? { ...req, status: "matched" } : req));
        } catch (error) {
            console.error("❌ Error accepting request:", error);
        }
    };

    // Reject Request
    const rejectRequest = async (requestId) => {
        try {
            const requestRef = doc(db, "matchRequests", requestId);
            await deleteDoc(requestRef);
            setIncomingRequests(incomingRequests.filter(req => req.id !== requestId));
        } catch (error) {
            console.error("❌ Error rejecting request:", error);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, color: "#fff", textAlign: "center" }}>
                Match Requests
            </Typography>

            {/* Incoming Requests */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ color: "#ffcc00" }}>Incoming Requests</Typography>
                <Divider sx={{ mb: 2, bgcolor: "#444" }} />
                {incomingRequests.length > 0 ? (
                    <Stack spacing={2}>
                        {incomingRequests.map((req) => (
                            <Card key={req.id} sx={{ padding: 2, bgcolor: "#2d2d3b", color: "#fff" }}>
                                <Typography>{req.senderName} sent a request</Typography>
                                <Box mt={1}>
                                    {req.status === "pending" ? (
                                        <>
                                            <Button onClick={() => acceptRequest(req.id)} sx={{ mr: 1 }} variant="contained" color="success">
                                                Accept
                                            </Button>
                                            <Button onClick={() => rejectRequest(req.id)} variant="contained" color="error">
                                                Reject
                                            </Button>
                                        </>
                                    ) : (
                                        <Typography sx={{ color: "green", fontWeight: "bold" }}>✔ Matched</Typography>
                                    )}
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                ) : (
                    <Typography sx={{ color: "#888" }}>No incoming requests.</Typography>
                )}
            </Box>

            {/* Outgoing Requests */}
            <Box>
                <Typography variant="h6" sx={{ color: "#4dabf7" }}>Outgoing Requests</Typography>
                <Divider sx={{ mb: 2, bgcolor: "#444" }} />
                {outgoingRequests.length > 0 ? (
                    <Stack spacing={2}>
                        {outgoingRequests.map((req) => (
                            <Card key={req.id} sx={{ padding: 2, bgcolor: "#2d2d3b", color: "#fff" }}>
                                <Typography>Request sent to {req.receiverName}</Typography>
                                <Typography sx={{ color: req.status === "matched" ? "green" : "yellow", fontWeight: "bold" }}>
                                    {req.status === "matched" ? "✔ Matched" : "⏳ Pending"}
                                </Typography>
                            </Card>
                        ))}
                    </Stack>
                ) : (
                    <Typography sx={{ color: "#888" }}>No outgoing requests.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default MatchRequestsPage;
