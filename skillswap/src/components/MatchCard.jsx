import React, { useEffect, useState } from "react";
import { Card, CardContent, Avatar, Typography, Box, IconButton, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SkillRequestButton from "./SkillRequestButton";
import { db } from "../config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MatchCard = ({ match }) => {
  const { user: currentUser } = useAuth(); // Get logged-in user
  const [matchStatus, setMatchStatus] = useState("pending");

  if (!match || !match.user) {
    return <p>Loading user details...</p>;
  }

  const { user, mutualSkills = [], reverseMatch = [] } = match;

  useEffect(() => {
    if (!currentUser?.uid || !user?.uid) return;

    const matchRequestsRef = collection(db, "matchRequests");

    const q = query(
      matchRequestsRef,
      where("senderId", "in", [currentUser.uid, user.uid]),
      where("receiverId", "in", [currentUser.uid, user.uid])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const requestData = snapshot.docs[0].data();
        setMatchStatus(requestData.status || "pending");
      }
    });

    return () => unsubscribe();
  }, [currentUser?.uid, user?.uid]);

  return (
    <Card sx={{ width: 300, borderRadius: 4, overflow: "hidden", background: "#1e1e2f", color: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}>
      <Box sx={{ background: "#ff4d6d", padding: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Avatar src={user.profilePic || "https://via.placeholder.com/100"} alt={user.username} sx={{ width: 100, height: 100, border: "4px solid white" }} />
      </Box>

      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{user.username || "Unknown User"}</Typography>
        <Typography variant="body2" color="gray">Skill Exchanger</Typography>

        {user.location && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <LocationOnIcon sx={{ color: "#ff4d6d", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{user.location}</Typography>
          </Box>
        )}

        {user.email && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ color: "#4dabf7", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        )}

        {/* Skills Section */}
        {mutualSkills.length > 0 && (
          <>
            <Typography variant="subtitle2" mt={2} sx={{ fontWeight: "bold", color: "#ff4d6d" }}>Mutual Skills:</Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1}>
              {mutualSkills.map((skill, index) => (
                <Chip key={index} label={skill} sx={{ background: "rgba(74, 183, 224, 0.2)", color: "#4ab7e0", fontSize: "12px", fontWeight: "bold" }} />
              ))}
            </Box>
          </>
        )}

        {/* Match Status */}
        <Box mt={2}>
          <Chip
            label={matchStatus === "matched" ? "Matched" : "Pending"}
            sx={{
              backgroundColor: matchStatus === "matched" ? "rgba(72, 199, 116, 0.2)" : "rgba(255, 193, 7, 0.2)",
              color: matchStatus === "matched" ? "#48c774" : "#ffc107",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "6px 12px",
              borderRadius: "16px"
            }}
          />
        </Box>

        {/* Skill Request Button */}
        {matchStatus === "pending" && (
          <Box mt={2}>
            <SkillRequestButton receiver={user} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchCard;
