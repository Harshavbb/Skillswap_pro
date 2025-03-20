import React from "react";
import MatchList from "../components/MatchList";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Box, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import heroImage from "../assets/Skill_matching.png"; // Add an image for the hero section

const MatchmakingPage = () => {
  const { user } = useAuth(); // Assuming `useAuth` provides `user`

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: 300,
          background: `url(${heroImage}) center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          p: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)" }}>
          Find Your Perfect Skill Match
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: -5, position: "relative" }}>
        <Paper 
          elevation={4} 
          sx={{ p: 4, borderRadius: 3, backgroundColor: "#ffffff", textAlign: "center" }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
            <IconButton disabled>
              <SearchIcon color="secondary" fontSize="large" />
            </IconButton>
            <Typography 
              variant="h4" 
              color="secondary" 
              fontWeight="bold"
            >
              Your Skill Matches
            </Typography>
          </Box>
          <MatchList currentUser={user} />
        </Paper>
      </Container>
    </Box>
  );
};

export default MatchmakingPage;
