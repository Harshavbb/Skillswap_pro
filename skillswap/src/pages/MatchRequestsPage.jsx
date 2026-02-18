import React, { useEffect, useState } from "react";
import { fetchMatchRequests } from "../utils/fetchMatchRequests";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  Card,
  Typography,
  Box,
  Grid,
  Stack,
  Divider,
  Avatar,
  IconButton,
  Container,
  Button,
  Chip
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
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#18181B", letterSpacing: "-0.02em" }}>
            Request Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "#71717A", mt: 1 }}>
            Manage your incoming connections and monitor sent requests.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Incoming Column */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#52525B", mb: 2, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              Incoming Requests ({incomingRequests.length})
            </Typography>
            
            {incomingRequests.length > 0 ? (
              <Stack spacing={2}>
                {incomingRequests.map((req) => (
                  <Card key={req.id} elevation={0} sx={{
                    p: 2.5, display: "flex", alignItems: "center", gap: 2,
                    border: "1px solid #E4E4E7", borderRadius: "12px",
                    backgroundColor: "#FFFFFF"
                  }}>
                    <Avatar src={req.senderProfilePic} sx={{ width: 44, height: 44, border: "1px solid #F4F4F5" }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#18181B" }}>{req.senderName}</Typography>
                      <Typography variant="caption" sx={{ color: "#71717A" }}>Wants to exchange expertise</Typography>
                    </Box>
                    {req.status === "pending" ? (
                      <Stack direction="row" spacing={1}>
                        <Button 
                          size="small" 
                          onClick={() => acceptRequest(req.id)} 
                          variant="contained" 
                          sx={{ 
                            backgroundColor: "#18181B", 
                            color: "#FFF", 
                            textTransform: "none", 
                            fontSize: "0.75rem",
                            px: 2,
                            "&:hover": { backgroundColor: "#3F3F46" } 
                          }}
                        >
                          Accept
                        </Button>
                        <Button 
                          size="small" 
                          onClick={() => rejectRequest(req.id)} 
                          variant="outlined" 
                          sx={{ 
                            borderColor: "#E4E4E7", 
                            color: "#EF4444", 
                            textTransform: "none", 
                            fontSize: "0.75rem",
                            "&:hover": { backgroundColor: "#FEF2F2", borderColor: "#FCA5A5" } 
                          }}
                        >
                          Decline
                        </Button>
                      </Stack>
                    ) : (
                      <Chip label="Matched" size="small" sx={{ backgroundColor: "#F0FDF4", color: "#166534", fontWeight: 700, borderRadius: "6px" }} />
                    )}
                  </Card>
                ))}
              </Stack>
            ) : (
              <Box sx={{ p: 4, textAlign: "center", border: "1px dashed #E4E4E7", borderRadius: "12px" }}>
                <Typography variant="body2" sx={{ color: "#A1A1AA" }}>No active incoming requests.</Typography>
              </Box>
            )}
          </Grid>

          {/* Outgoing Column */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#52525B", mb: 2, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              Sent Requests ({outgoingRequests.length})
            </Typography>
            
            {outgoingRequests.length > 0 ? (
              <Stack spacing={2}>
                {outgoingRequests.map((req) => (
                  <Card key={req.id} elevation={0} sx={{
                    p: 2.5, display: "flex", alignItems: "center", gap: 2,
                    border: "1px solid #E4E4E7", borderRadius: "12px",
                    backgroundColor: "#FFFFFF"
                  }}>
                    <Avatar src={req.receiverProfilePic} sx={{ width: 44, height: 44, border: "1px solid #F4F4F5" }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#18181B" }}>{req.receiverName}</Typography>
                      <Typography variant="caption" sx={{ color: "#71717A" }}>Waiting for confirmation</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                       {req.status === "matched" ? 
                         <Chip label="Connected" size="small" variant="outlined" sx={{ borderColor: "#22C55E", color: "#16A34A", fontWeight: 600 }} /> : 
                         <Chip label="Pending" size="small" variant="outlined" sx={{ borderColor: "#E4E4E7", color: "#71717A", fontWeight: 600 }} />
                       }
                    </Box>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Box sx={{ p: 4, textAlign: "center", border: "1px dashed #E4E4E7", borderRadius: "12px" }}>
                <Typography variant="body2" sx={{ color: "#A1A1AA" }}>You haven't sent any requests yet.</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MatchRequestsPage;