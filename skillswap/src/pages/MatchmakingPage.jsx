import React from "react";
import MatchList from "../components/MatchList";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Box, Grid } from "@mui/material";

const MatchmakingPage = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh", pb: 10 }}>
      {/* HERO SECTION - CLEAN ENTERPRISE HEADER */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E4E4E7",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#18181B",
              mb: 2,
              letterSpacing: "-0.03em",
              fontSize: { xs: "2.2rem", md: "3rem" }
            }}
          >
            Discover your <span style={{ color: "#2563EB" }}>next collaboration</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#52525B",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: "600px",
              mx: "auto",
              fontSize: "1.1rem"
            }}
          >
            Our algorithm analyzes your expertise and growth goals to find the most compatible partners in the SkillSwap network.
          </Typography>
        </Container>
      </Box>

      {/* MATCHES SECTION */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ mb: 6, textAlign: "flex-start" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#18181B",
              mb: 1,
            }}
          >
            Recommended for you
          </Typography>
          <Typography variant="body2" sx={{ color: "#71717A" }}>
            Based on your skills offered and the technologies you want to acquire.
          </Typography>
        </Box>
        
        {/* MatchList Integration */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MatchList currentUser={user} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MatchmakingPage;