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

const MatchCard = ({ match }) => {
  if (!match.user) {
    return <p>Loading user details...</p>;
  }

  const { user, mutualSkills = [], reverseMatch = [] } = match;
  const [matchStatus, setMatchStatus] = useState("pending"); // Default status

  // 🔄 Listen for Firestore updates on match status
  useEffect(() => {
    const matchRequestsRef = collection(db, "matchRequests");

    const q = query(
      matchRequestsRef,
      where("senderId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const requestData = snapshot.docs[0].data();
        setMatchStatus(requestData.status);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <Card sx={{ width: 300, borderRadius: 4, overflow: "hidden", background: "#1e1e2f", color: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}>
      
      {/* Profile Picture Section */}
      <Box sx={{ background: "#ff4d6d", padding: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Avatar src={user.profilePic || "https://via.placeholder.com/100"} alt={user.username} sx={{ width: 100, height: 100, border: "4px solid white" }} />
      </Box>

      {/* User Details */}
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{user.username}</Typography>
        <Typography variant="body2" color="gray">Skill Exchanger</Typography>

        {/* Location */}
        {user.location && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <LocationOnIcon sx={{ color: "#ff4d6d", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{user.location}</Typography>
          </Box>
        )}

        {/* Email */}
        {user.email && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ color: "#4dabf7", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        )}

        {/* Mutual Skills */}
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

        {/* Reverse Match Skills */}
        {reverseMatch.length > 0 && (
          <>
            <Typography variant="subtitle2" mt={2} sx={{ fontWeight: "bold", color: "#4dabf7" }}>They Need From You:</Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1}>
              {reverseMatch.map((skill, index) => (
                <Chip key={index} label={skill} sx={{ background: "rgba(255, 77, 109, 0.2)", color: "#ff4d6d", fontSize: "12px", fontWeight: "bold" }} />
              ))}
            </Box>
          </>
        )}

        {/* Match Status - Semi-transparent pill */}
        <Box mt={2}>
          {matchStatus === "matched" ? (
            <Chip label="Matched ✓" sx={{ backgroundColor: "rgba(72, 199, 116, 0.2)", color: "#48c774", fontSize: "14px", fontWeight: "bold", padding: "6px 12px", borderRadius: "16px" }} />
          ) : (
            <Chip label="Pending ⌚" sx={{ backgroundColor: "rgba(255, 193, 7, 0.2)", color: "#ffc107", fontSize: "14px", fontWeight: "bold", padding: "6px 12px", borderRadius: "16px" }} />
          )}
        </Box>

        {/* Skill Request Button (Only show if pending) */}
        {matchStatus === "pending" && (
          <Box mt={2}>
            <SkillRequestButton receiver={user} />
          </Box>
        )}

        {/* Social Links */}
        <Box display="flex" justifyContent="center" mt={2} gap={1}>
          {user.socialLinks?.linkedin && user.socialLinks.linkedin !== "" && (
            <IconButton href={user.socialLinks.linkedin} target="_blank" sx={{ color: "#0077b5" }}>
              <LinkedInIcon />
            </IconButton>
          )}
          {user.socialLinks?.twitter && user.socialLinks.twitter !== "" && (
            <IconButton href={user.socialLinks.twitter} target="_blank" sx={{ color: "#1da1f2" }}>
              <TwitterIcon />
            </IconButton>
          )}
          {user.socialLinks?.github && user.socialLinks.github !== "" && (
            <IconButton href={user.socialLinks.github} target="_blank" sx={{ color: "#fff" }}>
              <GitHubIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
