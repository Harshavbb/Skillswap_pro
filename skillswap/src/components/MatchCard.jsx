import React, { useEffect, useState } from "react";
import { Card, CardContent, Avatar, Typography, Box, Chip, Button, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import SkillRequestButton from "./SkillRequestButton";
import { db } from "../config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MatchCard = ({ match }) => {
  console.log("MatchCard received data:", match);
  
  const { user: currentUser } = useAuth();
  const [matchStatus, setMatchStatus] = useState("pending");

  if (!match || !match.user) {
    return <p>Loading user details...</p>;
  }

  const { user, skillOffered = [], skillNeeded = [], mutualSkills = [], reverseMatch = [], socialLinks = {} } = match;

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
    <Card sx={{ width: 320, borderRadius: 4, overflow: "hidden", background: "#fff", color: "#000", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Box sx={{ background: "#e2d64b", padding: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Avatar src={user.profilePic || "https://via.placeholder.com/100"} alt={user.username} sx={{ width: 90, height: 90, border: "3px solid white" }} />
      </Box>

      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{user.username || "Unknown User"}</Typography>
        <Typography variant="body2" color="text.secondary">Skill Exchanger</Typography>

        {user.location && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <LocationOnIcon sx={{ color: "#2d6668", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{user.location}</Typography>
          </Box>
        )}

        {user.email && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ color: "#4ab7e0", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        )}

        <Box display="flex" justifyContent="center" mt={1} gap={1}>
          {socialLinks.github && (
            <IconButton component="a" href={socialLinks.github} target="_blank" sx={{ color: "#000" }}>
              <GitHubIcon />
            </IconButton>
          )}
          {socialLinks.linkedin && (
            <IconButton component="a" href={socialLinks.linkedin} target="_blank" sx={{ color: "#0077B5" }}>
              <LinkedInIcon />
            </IconButton>
          )}
          {socialLinks.twitter && (
            <IconButton component="a" href={socialLinks.twitter} target="_blank" sx={{ color: "#1DA1F2" }}>
              <TwitterIcon />
            </IconButton>
          )}
        </Box>

        <Typography variant="subtitle2" mt={2} sx={{ fontWeight: "bold", color: "#000" }}>Mutual Skills:</Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1}>
          {mutualSkills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ background: "#4ab7e0", color: "#fff", fontSize: "12px", fontWeight: "bold" }} />
          ))}
        </Box>

        <Typography variant="subtitle2" mt={2} sx={{ fontWeight: "bold", color: "#000" }}>Skills They Need from You:</Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1}>
          {reverseMatch.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ background: "#e2d64b", color: "#000", fontSize: "12px", fontWeight: "bold" }} />
          ))}
        </Box>

        <Box mt={2}>
          <Chip
            label={matchStatus === "matched" ? "Matched" : "Pending"}
            sx={{
              backgroundColor: matchStatus === "matched" ? "#84ac64" : "#c2c19f",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "6px 12px",
              borderRadius: "16px"
            }}
          />
        </Box>

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
