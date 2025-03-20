import React from "react";
import { Container, Grid, Typography, Button, Box, Card, CardContent, TextField } from "@mui/material";
import heroImage from "../assets/Hero_finalbg.png";
import feature1 from "../assets/f1bg.png";
import feature2 from "../assets/f2bg.png";
import feature3 from "../assets/f3bg.png"
import { Facebook, Instagram } from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';

const features = [
  {
    image: feature1,
    title: "Advanced Skill Matching System",
    description:
      "Our intelligent algorithm helps you find the perfect match based on your skills, ensuring a seamless skill exchange.",
  },
  {
    image: feature2,
    title: "Instant & Secure Real-Time Chat",
    description:
      "Communicate effortlessly with real-time chat designed with end-to-end encryption.",
  },
  {
    image: feature3,
    title: "Reliable & Verified Transactions",
    description:
      "Skill exchanges are monitored to ensure safety, transparency, and fairness.",
  },
];

const LandingPage = () => {
  return (
    <Container maxWidth="lg">
          {/* Hero Section */}
      <Grid container spacing={4} alignItems="center" sx={{ py: 8 }}>
        {/* Left Side - Image */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <img src={heroImage} alt="Hero" style={{ width: "100%", maxWidth: "400px" }} />
        </Grid>

        {/* Right Side - Text & Buttons */}
        <Grid item xs={12} md={6}>
          <Typography variant="h2" sx={{ fontWeight: "bold", color: "black", mb: 1 }}>
            Collaborate, Learn & Grow
          </Typography>
          <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
            Unlock endless opportunities by exchanging skills with talented individuals worldwide.
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Join a vibrant community where learning is mutual, and knowledge is shared effortlessly. Start swapping skills today!
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: "black", color: "white", px: 3, py: 1, "&:hover": { backgroundColor: "#333" } }}>
              Get Started
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#fade2d", color: "black", px: 3, py: 1, "&:hover": { backgroundColor: "#FFC107" } }}>
              Learn More
            </Button>
          </Box>
        </Grid>
      </Grid>

     {/* Features Section */}
{/* Features Section */}
<Box 
  sx={{ 
    py: 6, 
    backgroundColor: "#fade2d", 
    width: "100%", 
    display: "flex",
    justifyContent: "center",
    borderRadius: 20
  }}
>
  <Box sx={{ maxWidth: "1200px", width: "100%", px: 3 }}>
    <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 4, color: "black" }}>
      Why Choose SkillSwap?
    </Typography>

    <Grid 
      container 
      spacing={4} 
      justifyContent="center" 
      alignItems="center"
    >
      {features.map((feature, index) => (
        <Grid 
          item 
          xs={12} 
          sm={4} 
          key={index} 
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", p: 2 }}
        >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img 
              src={feature.image} 
              alt={feature.title} 
              style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} 
            />
          </Box>
          <Typography 
            variant="h6" 
            color="black" 
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            {feature.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ maxWidth: "90%", mt: 1 }}
          >
            {feature.description}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Box>
</Box>


      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 4, borderTop: "1px solid gray" }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          &copy; {new Date().getFullYear()} SkillSwap - All Rights Reserved
        </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <Facebook color="primary" sx={{ cursor: "pointer" }} />
            <XIcon color="primary" sx={{ cursor: "pointer" }} />
            <Instagram color="primary" sx={{ cursor: "pointer" }} />
          </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
