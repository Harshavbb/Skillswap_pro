import { useState, useEffect } from "react";
import { sendMatchRequest } from "../utils/sendMatchRequest";
import { useAuth } from "../context/AuthContext";
import { Button, Snackbar } from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const SkillRequestButton = ({ receiver }) => {
    const { user } = useAuth();
    const [status, setStatus] = useState("idle"); // idle, pending, matched
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");

    if (!user || !receiver) return null;

    // 🔄 Listen for Firestore updates in real-time
    useEffect(() => {
        const matchRequestsRef = collection(db, "matchRequests");

        const q = query(
            matchRequestsRef,
            where("senderId", "==", user.uid),
            where("receiverId", "==", receiver.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const requestData = snapshot.docs[0].data();
                setStatus(requestData.status); // Automatically update status when Firestore changes
            }
        });

        return () => unsubscribe();
    }, [user, receiver]);

    const handleClick = async () => {
        const response = await sendMatchRequest(user, receiver);
        setMessage(response.message);
        setOpenSnackbar(true);

        if (response.success) {
            setStatus("pending"); // Temporary state until Firestore updates
        }
    };

    return (
        <>
            {status === "matched" ? (
                <Button
                    variant="contained"
                    disabled
                    sx={{
                        backgroundColor: "#4dabf7",
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "14px",
                        borderRadius: "6px",
                        padding: "8px 12px",
                    }}
                >
                    ✅ Matched!
                </Button>
            ) : status === "pending" ? (
                <Button
                    variant="contained"
                    disabled
                    sx={{
                        backgroundColor: "gray",
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "14px",
                        borderRadius: "6px",
                        padding: "8px 12px",
                    }}
                >
                    ⏳ Pending...
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    sx={{
                        backgroundColor: "transparent",
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "14px",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.5)",
                        },
                    }}
                    onClick={handleClick}
                >
                    Send Skill Swap Request
                </Button>
            )}

            {/* Snackbar Notification */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={message}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </>
    );
};

export default SkillRequestButton;
