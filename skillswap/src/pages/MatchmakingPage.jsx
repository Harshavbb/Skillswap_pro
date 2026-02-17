import React from "react";
import MatchList from "../components/MatchList";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Box, Grid } from "@mui/material";
import heroImage from "../assets/Skill_matching.png";

const MatchmakingPage = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", pb: 10 }}>
      {/* HERO SECTION - ZOOMSPhERE STYLE */}
      <Box
        sx={{
          py: 8,
          backgroundColor: "#DCD6FF", // Lavender Accent
          borderBottom: "3px solid #2D2D2D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              backgroundColor: "#ffffff",
              border: "3px solid #2D2D2D",
              borderRadius: "24px",
              p: 6,
              boxShadow: "12px 12px 0px #2D2D2D", // Signature hard shadow
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#2D2D2D",
                mb: 2,
                letterSpacing: -1
              }}
            >
              Find Your <span style={{ textDecoration: 'underline', textDecorationColor: '#FFF9D6' }}>Perfect Match</span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#555",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Discover talented individuals who share your passion for learning and growth. Start connecting today!
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* MATCHES SECTION */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: "#2D2D2D",
            mb: 6,
            textAlign: "center",
          }}
        >
          Your Skill Matches
        </Typography>
        
        {/* Fix for centering the MatchList */}
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <MatchList currentUser={user} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MatchmakingPage;