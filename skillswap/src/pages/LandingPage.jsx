import React from "react";
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Chip
} from "@mui/material";
import { Facebook, Instagram, Psychology, Chat, VerifiedUser } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";

// Assets
import heroImage from "../assets/Hero_finalbg.png";
import feature1 from "../assets/f1bg.png";
import feature2 from "../assets/f2bg.png";
import feature3 from "../assets/f3bg.png";

const features = [
  {
    image: feature1,
    bgColor: "#DCD6FF", // Lavender
    title: "Smart Match",
    description: "Our algorithm finds your skill soulmate based on mutual growth goals.",
  },
  {
    image: feature2,
    bgColor: "#E0F9F1", // Mint
    title: "Secure Chat",
    description: "Real-time, encrypted communication built for creative collaboration.",
  },
  {
    image: feature3,
    bgColor: "#FFF9D6", // Lemon
    title: "Verified Trust",
    description: "Every exchange is backed by our community safety and transparency protocol.",
  },
];

const LandingPage = () => {
  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      
      {/* HERO SECTION - PLAYFUL & OPEN */}
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              {/* Floating Tag Style */}
              <Chip 
                label="#CollaborativeLearning" 
                sx={{ 
                  mb: 3, 
                  backgroundColor: "#FFF9D6", 
                  fontWeight: "bold", 
                  border: "2px solid #2D2D2D",
                  borderRadius: "8px" 
                }} 
              />
              <Typography variant="h1" sx={{ 
                fontWeight: 900, 
                fontSize: { xs: "2.8rem", md: "4rem" }, 
                color: "#2D2D2D",
                lineHeight: 1.1,
                mb: 3 
              }}>
                Empower Your Growth with <span style={{ textDecoration: 'underline', textDecorationColor: '#DCD6FF' }}>SkillSwap</span>
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: "#555", fontWeight: 400, lineHeight: 1.6 }}>
                Manage your learning journey and connect with global talent from one simple platform.
              </Typography>
              
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2D2D2D",
                    color: "#fff",
                    px: 4, py: 1.5, borderRadius: "10px", fontWeight: "bold", textTransform: "none",
                    "&:hover": { backgroundColor: "#000" }
                  }}
                >
                  Start a free trial
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#2D2D2D", color: "#2D2D2D", px: 4, py: 1.5,
                    borderRadius: "10px", fontWeight: "bold", textTransform: "none",
                    borderWidth: "2px",
                    "&:hover": { borderWidth: "2px", backgroundColor: "rgba(0,0,0,0.02)" }
                  }}
                >
                  Book a live demo
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", position: 'relative' }}>
              {/* The "Zoomsphere" Style floating elements */}
              <Box
                component="img"
                src={heroImage}
                alt="Hero"
                sx={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "20px",
                  border: "3px solid #2D2D2D",
                  boxShadow: "12px 12px 0px #DCD6FF" // Hard shadow style
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* WHY CHOOSE SECTION - ASYMMETRIC COLOR BLOCKS */}
      <Box sx={{ py: 10, borderTop: '2px solid #F0F0F0' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 900, textAlign: "center", mb: 8, color: "#2D2D2D" }}>
            Explore our solutions
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper 
                  elevation={0}
                  sx={{
                    p: 4, height: "100%", borderRadius: "24px",
                    backgroundColor: feature.bgColor,
                    border: "2px solid #2D2D2D",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "rotate(-2deg)" } // Playful rotation
                  }}
                >
                  <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      style={{ width: "100%", height: "140px", objectFit: "contain", borderRadius: "12px" }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: "#2D2D2D" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#2D2D2D", opacity: 0.8, lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FOOTER - CLEAN & LIGHT */}
      <Box sx={{ py: 6, textAlign: "center", borderTop: '2px solid #F0F0F0' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 3 }}>
            <Facebook sx={{ cursor: "pointer", color: "#2D2D2D", "&:hover": { color: "#DCD6FF" } }} />
            <XIcon sx={{ cursor: "pointer", color: "#2D2D2D", "&:hover": { color: "#DCD6FF" } }} />
            <Instagram sx={{ cursor: "pointer", color: "#2D2D2D", "&:hover": { color: "#DCD6FF" } }} />
          </Box>
          <Typography variant="body2" sx={{ color: "#888", fontWeight: "bold" }}>
            &copy; {new Date().getFullYear()} SKILLSWAP. GROW TOGETHER.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;