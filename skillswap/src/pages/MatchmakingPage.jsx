import React from "react";
import MatchList from "../components/MatchList";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Box, Grid } from "@mui/material";
import heroImage from "../assets/Skill_matching.png";

const MatchmakingPage = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ backgroundColor: "#E3FDFD", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: 400,
          background: `url(${heroImage}) center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 4,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            p: 4,
            maxWidth: "600px",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: "#71C9CE", // Primary color
              mb: 2,
            }}
          >
            Find Your Perfect Skill Match
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#443627", // Dark brown for readability
              lineHeight: 1.6,
            }}
          >
            Discover talented individuals who share your passion for learning and growth. Start connecting and exchanging skills today!
          </Typography>
        </Box>
      </Box>

      {/* Matches Section */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#443627", // Dark brown for better readability
            mb: 4,
            textAlign: "center",
          }}
        >
          Your Skill Matches
        </Typography>
        <Grid container spacing={4}>
          {/* MatchList Component */}
          <Grid item xs={12}>
            <MatchList currentUser={user} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MatchmakingPage;