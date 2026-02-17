import React, { useEffect, useState } from "react";
import { fetchMatchRequests } from "../utils/fetchMatchRequests";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  Card,
  Typography,
  Box,
  Stack,
  Divider,
  Avatar,
  IconButton,
  Container
} from "@mui/material";
import { CheckCircle, Cancel, HourglassEmpty } from "@mui/icons-material";

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

  const acceptRequest = async (requestId) => {
    try {
      const requestRef = doc(db, "matchRequests", requestId);
      await updateDoc(requestRef, { status: "matched" });
      setIncomingRequests(incomingRequests.map((req) =>
        req.id === requestId ? { ...req, status: "matched" } : req
      ));
    } catch (error) { console.error(error); }
  };

  const rejectRequest = async (requestId) => {
    try {
      const requestRef = doc(db, "matchRequests", requestId);
      await deleteDoc(requestRef);
      setIncomingRequests(incomingRequests.filter((req) => req.id !== requestId));
    } catch (error) { console.error(error); }
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 6, color: "#2D2D2D", textAlign: "center", fontWeight: 900 }}>
          Request Dashboard
        </Typography>
        
        <Box sx={{ display: "flex", gap: 6, flexDirection: { xs: "column", md: "row" } }}>
          
          {/* Incoming Column */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 3, p: 1, backgroundColor: "#E0F9F1", border: "2px solid #2D2D2D", borderRadius: "8px", textAlign: "center" }}>
               <Typography variant="h6" sx={{ fontWeight: 900, color: "#2D2D2D" }}>Incoming</Typography>
            </Box>
            
            {incomingRequests.length > 0 ? (
              <Stack spacing={3}>
                {incomingRequests.map((req) => (
                  <Card key={req.id} elevation={0} sx={{
                    p: 2, display: "flex", alignItems: "center", gap: 2,
                    border: "3px solid #2D2D2D", borderRadius: "16px",
                    boxShadow: "6px 6px 0px #E0F9F1"
                  }}>
                    <Avatar src={req.senderProfilePic} sx={{ border: "2px solid #2D2D2D" }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 900 }}>{req.senderName}</Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>Wants to swap skills</Typography>
                    </Box>
                    {req.status === "pending" ? (
                      <Stack direction="row">
                        <IconButton onClick={() => acceptRequest(req.id)} sx={{ color: "#2D2D2D", "&:hover": { color: "#2E7D32" } }}><CheckCircle /></IconButton>
                        <IconButton onClick={() => rejectRequest(req.id)} sx={{ color: "#2D2D2D", "&:hover": { color: "#D32F2F" } }}><Cancel /></IconButton>
                      </Stack>
                    ) : (
                      <Typography variant="caption" sx={{ fontWeight: 900, color: "#2E7D32" }}>MATCHED</Typography>
                    )}
                  </Card>
                ))}
              </Stack>
            ) : (
              <Typography sx={{ textAlign: "center", fontStyle: "italic", mt: 4 }}>All caught up!</Typography>
            )}
          </Box>

          {/* Outgoing Column */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 3, p: 1, backgroundColor: "#DCD6FF", border: "2px solid #2D2D2D", borderRadius: "8px", textAlign: "center" }}>
               <Typography variant="h6" sx={{ fontWeight: 900, color: "#2D2D2D" }}>Outgoing</Typography>
            </Box>
            
            {outgoingRequests.length > 0 ? (
              <Stack spacing={3}>
                {outgoingRequests.map((req) => (
                  <Card key={req.id} elevation={0} sx={{
                    p: 2, display: "flex", alignItems: "center", gap: 2,
                    border: "3px solid #2D2D2D", borderRadius: "16px",
                    boxShadow: "6px 6px 0px #DCD6FF"
                  }}>
                    <Avatar src={req.receiverProfilePic} sx={{ border: "2px solid #2D2D2D" }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 900 }}>{req.receiverName}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                       {req.status === "matched" ? 
                         <CheckCircle sx={{ color: "#2E7D32" }} /> : 
                         <HourglassEmpty sx={{ color: "#888" }} />
                       }
                    </Box>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Typography sx={{ textAlign: "center", fontStyle: "italic", mt: 4 }}>No requests sent yet.</Typography>
            )}
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default MatchRequestsPage;