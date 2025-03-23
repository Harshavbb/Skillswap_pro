import React, { useEffect, useState } from "react";
import { fetchMatchRequests } from "../utils/fetchMatchRequests";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  Card,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  Avatar,
  IconButton,
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
      setIncomingRequests(
        incomingRequests.map((req) =>
          req.id === requestId ? { ...req, status: "matched" } : req
        )
      );
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      const requestRef = doc(db, "matchRequests", requestId);
      await deleteDoc(requestRef);
      setIncomingRequests(incomingRequests.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1000,
        margin: "auto",
        padding: 4,
        backgroundColor: "#E3FDFD",
        borderRadius: 4,
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#443627",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Match Requests
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Incoming Requests */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#71C9CE",
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
            }}
          >
            Incoming Requests
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {incomingRequests.length > 0 ? (
            <Stack spacing={2}>
              {incomingRequests.map((req) => (
                <Card
                  key={req.id}
                  sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Avatar
                    src={req.senderProfilePic || "https://via.placeholder.com/100"}
                    alt={req.senderName}
                    sx={{ width: 50, height: 50 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#443627" }}
                    >
                      {req.senderName} sent a request
                    </Typography>
                  </Box>
                  {req.status === "pending" ? (
                    <>
                      <IconButton
                        onClick={() => acceptRequest(req.id)}
                        sx={{ color: "#84ac64" }}
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton
                        onClick={() => rejectRequest(req.id)}
                        sx={{ color: "#e57373" }}
                      >
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        color: "#84ac64",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CheckCircle sx={{ mr: 0.5 }} /> Matched
                    </Typography>
                  )}
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography
              sx={{ color: "#888", textAlign: "center", fontStyle: "italic" }}
            >
              No incoming requests.
            </Typography>
          )}
        </Box>

        {/* Outgoing Requests */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#71C9CE",
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
            }}
          >
            Outgoing Requests
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {outgoingRequests.length > 0 ? (
            <Stack spacing={2}>
              {outgoingRequests.map((req) => (
                <Card
                  key={req.id}
                  sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Avatar
                    src={req.receiverProfilePic || "https://via.placeholder.com/100"}
                    alt={req.receiverName}
                    sx={{ width: 50, height: 50 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#443627" }}
                    >
                      Request sent to {req.receiverName}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: req.status === "matched" ? "#84ac64" : "#c2c19f",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {req.status === "matched" ? (
                      <>
                        <CheckCircle sx={{ mr: 0.5 }} /> Matched
                      </>
                    ) : (
                      <>
                        <HourglassEmpty sx={{ mr: 0.5 }} /> Pending
                      </>
                    )}
                  </Typography>
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography
              sx={{ color: "#888", textAlign: "center", fontStyle: "italic" }}
            >
              No outgoing requests.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MatchRequestsPage;