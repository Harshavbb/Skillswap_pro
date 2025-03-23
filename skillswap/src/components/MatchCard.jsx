import React, { useEffect, useState } from "react";
import { Card, CardContent, Avatar, Typography, Box, Chip, IconButton, Button } from "@mui/material";
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
  const { user: currentUser } = useAuth();
  const [matchStatus, setMatchStatus] = useState("pending");

  if (!match || !match.user) {
    return <p>Loading user details...</p>;
  }

  const { user, mutualSkills = [], reverseMatch = [], socialLinks = {} } = match;

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
    <Card
      sx={{
        width: 360,
        borderRadius: 4,
        overflow: "hidden",
        background: "#E3FDFD", // Updated to match the palette
        color: "#443627",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background: "#71C9CE", // Primary color
          padding: 2,
          textAlign: "center",
        }}
      >
        <Avatar
          src={user.profilePic || "https://via.placeholder.com/100"}
          alt={user.username}
          sx={{
            width: 100,
            height: 100,
            border: "3px solid #E3FDFD",
            margin: "auto",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#ffffff", // White text for contrast
            mt: 1,
          }}
        >
          {user.username || "Unknown User"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#CBF1F5", // Light text for subtitle
          }}
        >
          Skill Exchanger
        </Typography>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ textAlign: "center", padding: 3 }}>
        {/* Email */}
        {user.email && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ color: "#71C9CE", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" color="#443627">
              {user.email}
            </Typography>
          </Box>
        )}

        {/* Location */}
        {user.location && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <LocationOnIcon sx={{ color: "#71C9CE", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" color="#443627">
              {user.location}
            </Typography>
          </Box>
        )}

        {/* Social Links */}
        <Box display="flex" justifyContent="center" mt={2} gap={1}>
          {socialLinks.github && (
            <IconButton component="a" href={socialLinks.github} target="_blank" sx={{ color: "#443627" }}>
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

        {/* Mutual Skills */}
        <Typography variant="subtitle2" mt={3} sx={{ fontWeight: "bold", color: "#443627" }}>
          Mutual Skills:
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1}>
          {mutualSkills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{
                background: "#71C9CE",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>

        {/* Skills Needed */}
        <Typography variant="subtitle2" mt={3} sx={{ fontWeight: "bold", color: "#443627" }}>
          Skills They Need:
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1}>
          {reverseMatch.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{
                background: "#CBF1F5",
                color: "#443627",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>

        {/* Match Status */}
        <Box mt={3}>
          <Chip
            label={matchStatus === "matched" ? "Matched" : "Pending"}
            sx={{
              backgroundColor: matchStatus === "matched" ? "#71C9CE" : "#A6E3E9",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "6px 12px",
              borderRadius: "16px",
            }}
          />
        </Box>

        {/* Skill Request Button */}
        {matchStatus === "pending" && (
          <Box mt={3}>
            <SkillRequestButton receiver={user} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchCard;