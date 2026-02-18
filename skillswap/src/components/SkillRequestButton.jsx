import { useState, useEffect } from "react";
import { sendMatchRequest } from "../utils/sendMatchRequest";
import { useAuth } from "../context/AuthContext";
import { Button, Snackbar, Alert } from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const SkillRequestButton = ({ receiver }) => {
    const { user } = useAuth();
    const [status, setStatus] = useState("idle"); 
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");

    if (!user || !receiver) return null;

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
                setStatus(requestData.status);
            }
        });

        return () => unsubscribe();
    }, [user, receiver]);

    const handleClick = async () => {
        const response = await sendMatchRequest(user, receiver);
        setMessage(response.message);
        setOpenSnackbar(true);

        if (response.success) {
            setStatus("pending");
        }
    };

    // Shared base styles for the "Workable" professional look
    const buttonBaseStyles = {
        fontWeight: 600,
        fontSize: "0.875rem",
        borderRadius: "6px",
        padding: "8px 16px",
        textTransform: "none", // Professional tools avoid all-caps
        letterSpacing: "0.025em",
        transition: "all 0.2s ease-in-out",
        boxShadow: "none",
        width: "100%", // Fit to container
    };

    return (
        <>
            {status === "matched" ? (
                <Button
                    variant="contained"
                    disabled
                    sx={{
                        ...buttonBaseStyles,
                        backgroundColor: "#F0FDF4 !important", // Success Green (Light)
                        color: "#166534 !important", // Success Green (Dark)
                        border: "1px solid #BBF7D0",
                        opacity: "1 !important",
                    }}
                >
                    Connected
                </Button>
            ) : status === "pending" ? (
                <Button
                    variant="contained"
                    disabled
                    sx={{
                        ...buttonBaseStyles,
                        backgroundColor: "#F4F4F5 !important", // Zinc Gray
                        color: "#71717A !important",
                        border: "1px solid #E4E4E7",
                        opacity: "1 !important",
                    }}
                >
                    Request Sent
                </Button>
            ) : (
                <Button
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                        ...buttonBaseStyles,
                        backgroundColor: "#18181B", // Zinc-950
                        color: "#FFFFFF",
                        "&:hover": {
                            backgroundColor: "#27272A",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        },
                    }}
                >
                    Send Connection Request
                </Button>
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert 
                    onClose={() => setOpenSnackbar(false)} 
                    severity="success" 
                    variant="filled"
                    sx={{ 
                        borderRadius: "8px", 
                        backgroundColor: "#18181B",
                        fontWeight: 500
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SkillRequestButton;