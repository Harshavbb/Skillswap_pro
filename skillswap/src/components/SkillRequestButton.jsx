import { useState, useEffect } from "react";
import { sendMatchRequest } from "../utils/sendMatchRequest";
import { useAuth } from "../context/AuthContext";
import { Button, Snackbar } from "@mui/material";
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

    // Shared base styles for the "Sticker" button look
    const buttonBaseStyles = {
        fontWeight: 900,
        fontSize: "14px",
        borderRadius: "12px",
        padding: "10px 20px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        border: "3px solid #2D2D2D", // Thick solid border
        transition: "all 0.2s ease",
    };

    return (
        <>
            {status === "matched" ? (
                <Button
                    variant="contained"
                    disabled
                    sx={{
                        ...buttonBaseStyles,
                        backgroundColor: "#E0F9F1 !important", // Mint
                        color: "#2D2D2D !important",
                        opacity: "1 !important", // MUI disabled buttons are usually transparent; we want it solid
                    }}
                >
                    ✅ Matched!
                </Button>
            ) : status === "pending" ? (
                <Button
                    variant="contained"
                    disabled
                    sx={{
                        ...buttonBaseStyles,
                        backgroundColor: "#F0F0F0 !important", // Light Gray
                        color: "#2D2D2D !important",
                        opacity: "1 !important",
                    }}
                >
                    ⏳ Pending...
                </Button>
            ) : (
                <Button
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                        ...buttonBaseStyles,
                        backgroundColor: "#2D2D2D",
                        color: "#fff",
                        boxShadow: "4px 4px 0px #DCD6FF", // Small offset shadow
                        "&:hover": {
                            backgroundColor: "#000",
                            transform: "translate(-2px, -2px)",
                            boxShadow: "6px 6px 0px #DCD6FF",
                        },
                    }}
                >
                    Swap Skills
                </Button>
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={message}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                // Custom Snackbar styling to match theme
                ContentProps={{
                    sx: {
                        backgroundColor: "#2D2D2D",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "12px",
                        border: "2px solid #DCD6FF"
                    }
                }}
            />
        </>
    );
};

export default SkillRequestButton;