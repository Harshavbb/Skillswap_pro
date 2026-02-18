import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Avatar, Typography, Box, Chip, IconButton, Stack, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
    return null;
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
        width: "100%",
        maxWidth: 380,
        borderRadius: "12px",
        border: "1px solid #E4E4E7",
        backgroundColor: "#FFFFFF",
        transition: "all 0.2s ease-in-out",
        "&:hover": { 
          borderColor: "#2563EB",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Profile Header */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
          <Avatar
            src={user.profilePic || ""}
            sx={{
              width: 64,
              height: 64,
              border: "1px solid #F4F4F5",
              backgroundColor: "#F8FAFC"
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#18181B", lineHeight: 1.2 }}>
              {user.username || "Anonymous"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#71717A", display: "flex", alignItems: "center", mt: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 14, mr: 0.5 }} />
              {user.location || "Remote"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2.5, borderColor: "#F4F4F5" }} />

        {/* Skill Matrix */}
        <Stack spacing={2} mb={3}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#18181B", textTransform: 'uppercase', letterSpacing: "0.05em" }}>
              Mutual Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {mutualSkills.map((skill, i) => (
                <Chip 
                  key={i} 
                  label={skill} 
                  size="small"
                  sx={{ 
                    backgroundColor: "#EFF6FF", 
                    color: "#2563EB", 
                    fontWeight: 600, 
                    borderRadius: "6px",
                    fontSize: "0.75rem"
                  }} 
                />
              ))}
            </Box>
          </Box>
          
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#52525B", textTransform: 'uppercase', letterSpacing: "0.05em" }}>
              Looking For
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {reverseMatch.map((skill, i) => (
                <Chip 
                  key={i} 
                  label={skill} 
                  size="small"
                  variant="outlined"
                  sx={{ 
                    borderColor: "#E4E4E7", 
                    color: "#71717A", 
                    fontWeight: 500, 
                    borderRadius: "6px",
                    fontSize: "0.75rem"
                  }} 
                />
              ))}
            </Box>
          </Box>
        </Stack>

        {/* Social & Action Footer */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3} pt={2} sx={{ borderTop: "1px solid #F4F4F5" }}>
          <Stack direction="row" spacing={1}>
            {socialLinks.github && (
              <IconButton size="small" component="a" href={socialLinks.github} target="_blank" sx={{ color: "#71717A", "&:hover": { color: "#18181B" } }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
            )}
            {socialLinks.linkedin && (
              <IconButton size="small" component="a" href={socialLinks.linkedin} target="_blank" sx={{ color: "#0077B5" }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
          
          <Box sx={{ width: "160px" }}>
            <SkillRequestButton receiver={user} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MatchCard;