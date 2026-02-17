import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Avatar, Typography, Box, Chip, IconButton } from "@mui/material";
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
      elevation={0}
      sx={{
        width: 360,
        borderRadius: "24px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        border: "3px solid #2D2D2D", // High contrast border
        boxShadow: "10px 10px 0px #DCD6FF", // Offset solid shadow
        transition: "all 0.2s ease",
        "&:hover": { 
          transform: "translate(-4px, -4px)",
          boxShadow: "14px 14px 0px #DCD6FF" 
        },
      }}
    >
      {/* Profile Header Block */}
      <Box
        sx={{
          backgroundColor: "#FFF9D6", // Pale Lemon block
          padding: 3,
          borderBottom: "3px solid #2D2D2D",
          textAlign: "center",
        }}
      >
        <Avatar
          src={user.profilePic || "https://via.placeholder.com/100"}
          alt={user.username}
          sx={{
            width: 90,
            height: 90,
            border: "3px solid #2D2D2D",
            margin: "auto",
            backgroundColor: "#fff"
          }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: "#2D2D2D", mt: 2 }}
        >
          {user.username || "Unknown User"}
        </Typography>
        <Chip 
          label="Skill Exchanger" 
          size="small"
          sx={{ 
            mt: 1, 
            backgroundColor: "#2D2D2D", 
            color: "#fff", 
            fontWeight: "bold",
            borderRadius: "6px"
          }} 
        />
      </Box>

      <CardContent sx={{ padding: 3 }}>
        {/* Bio Info Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', mb: 2 }}>
          {user.email && (
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ color: "#2D2D2D", fontSize: 18, mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.email}</Typography>
            </Box>
          )}
          {user.location && (
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ color: "#2D2D2D", fontSize: 18, mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.location}</Typography>
            </Box>
          )}
        </Box>

        {/* Social Bar */}
        <Box display="flex" justifyContent="center" gap={1} mb={3}>
          {['github', 'linkedin', 'twitter'].map((platform) => (
            socialLinks[platform] && (
              <IconButton 
                key={platform}
                component="a" 
                href={socialLinks[platform]} 
                target="_blank" 
                sx={{ 
                  border: '2px solid #2D2D2D', 
                  borderRadius: '8px',
                  color: "#2D2D2D",
                  "&:hover": { backgroundColor: "#E0F9F1" }
                }}
              >
                {platform === 'github' && <GitHubIcon />}
                {platform === 'linkedin' && <LinkedInIcon />}
                {platform === 'twitter' && <TwitterIcon />}
              </IconButton>
            )
          ))}
        </Box>

        {/* Skill Blocks */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
              Mutual Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
              {mutualSkills.map((skill, i) => (
                <Chip key={i} label={skill} sx={{ border: '2px solid #2D2D2D', backgroundColor: '#E0F9F1', fontWeight: 'bold', borderRadius: '8px' }} />
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} mt={1}>
            <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
              They Need
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
              {reverseMatch.map((skill, i) => (
                <Chip key={i} label={skill} sx={{ border: '2px solid #2D2D2D', backgroundColor: '#DCD6FF', fontWeight: 'bold', borderRadius: '8px' }} />
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Status & Action */}
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box 
            sx={{ 
              backgroundColor: matchStatus === "matched" ? "#E0F9F1" : "#F0F0F0",
              border: '2px solid #2D2D2D',
              borderRadius: '12px',
              py: 1,
              textAlign: 'center',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: '0.75rem'
            }}
          >
            Status: {matchStatus}
          </Box>

          {matchStatus === "pending" && (
            <SkillRequestButton receiver={user} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchCard;