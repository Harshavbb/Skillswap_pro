import React from "react";
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent,
  Stack,
  Divider,
  Link as MuiLink // Alias Material-UI Link to avoid conflict with react-router-dom
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { Link as RouterLink } from "react-router-dom"; // For internal navigation

// Assets - Ensure these paths are correct in your project
import heroIllustration from '../assets/Hero_finalbg.png' // A professional-looking dashboard mockup
import featureIcon1 from "../assets/f1bg.png"; // A minimalist icon
import featureIcon2 from "../assets/f2bg.png"; // A minimalist icon
import featureIcon3 from "../assets/f3bg.png"; // A minimalist icon

// --- Sub-components for better organization ---

const HeroSection = () => (
  <Box sx={{ 
    pt: { xs: 10, md: 16 }, 
    pb: { xs: 10, md: 16 }, 
    backgroundColor: "#FDFDFD", // Very light off-white for subtle depth
    borderBottom: "1px solid #E4E4E7" 
  }}>
    <Container maxWidth="lg">
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4.2rem" }, 
              color: "#18181B", // Zinc-950
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              mb: 3 
            }}
          >
            Advance your career with <span style={{ color: "#2563EB" }}>targeted skill exchange</span>
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 5, 
              color: "#52525B", // Zinc-700
              fontWeight: 400, 
              lineHeight: 1.6, 
              maxWidth: "600px",
              fontSize: { xs: "1.1rem", md: "1.25rem" }
            }}
          >
            SkillSwap is the enterprise platform connecting professionals for impactful, mutual skill development and knowledge transfer.
          </Typography>
          
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/signup" // Link to signup page
              sx={{
                backgroundColor: "#2563EB", // Action Blue
                color: "#fff",
                px: 4, py: 1.5, borderRadius: "8px", fontWeight: 600, textTransform: "none",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)", // Soft blue shadow
                "&:hover": { 
                  backgroundColor: "#1D4ED8", // Darker blue on hover
                  boxShadow: "0 6px 16px rgba(37, 99, 235, 0.3)" 
                }
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/solutions" // Link to a solutions page
              sx={{
                borderColor: "#E4E4E7", 
                color: "#18181B", 
                px: 4, py: 1.5,
                borderRadius: "8px", fontWeight: 600, textTransform: "none",
                "&:hover": { borderColor: "#A1A1AA", backgroundColor: "#F4F4F5" } // Subtle hover
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center", order: { xs: -1, md: 2 } }}>
          <Box
            component="img"
            src={heroIllustration}
            alt="SkillSwap Dashboard Mockup"
            sx={{
              width: "100%",
              maxWidth: { xs: "400px", md: "600px" },
              height: "auto",
              borderRadius: "12px",
              border: "1px solid #E4E4E7",
              boxShadow: "0 15px 30px rgba(0,0,0,0.08), 0 5px 15px rgba(0,0,0,0.04)" // Multi-layered professional shadow
            }}
          />
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const FeaturesSection = () => {
  const featuresData = [
    {
      icon: featureIcon1,
      title: "Intelligent Matching",
      description: "Our AI-powered algorithm connects you with ideal mentors and learners, ensuring optimal skill alignment.",
    },
    {
      icon: featureIcon2,
      title: "Secure Collaboration",
      description: "Communicate securely with integrated chat and resource sharing, maintaining data privacy and integrity.",
    },
    {
      icon: featureIcon3,
      title: "Vetted Professional Network",
      description: "Join a community of verified professionals. Trust and credibility are foundational to every interaction.",
    },
  ];

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "#F4F4F5" }}> {/* Light gray background for contrast */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 8, md: 10 } }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              color: "#18181B", 
              mb: 3, 
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "-0.02em"
            }}
          >
            Engineered for your professional growth
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "#52525B", 
              maxWidth: "700px", 
              mx: "auto", 
              lineHeight: 1.7,
              fontSize: { xs: "1rem", md: "1.1rem" }
            }}
          >
            SkillSwap provides the robust infrastructure and intuitive tools required for seamless knowledge transfer and skill development in a secure enterprise environment.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {featuresData.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 }, 
                  height: "100%", 
                  borderRadius: "12px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E4E4E7",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { 
                    borderColor: "#2563EB", 
                    boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
                    transform: "translateY(-4px)"
                  }
                }}
              >
                <Box sx={{ mb: 3, width: "64px", height: "64px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F0F7FF", borderRadius: "8px" }}>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    style={{ width: "36px", height: "36px", objectFit: "contain" }}
                  />
                </Box>
                <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#18181B", fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#52525B", lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const CallToActionSection = () => (
  <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "#FFFFFF" }}>
    <Container maxWidth="md">
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#F0F7FF", // A soft light blue background
          p: { xs: 4, md: 8 },
          borderRadius: "16px",
          textAlign: "center",
          border: "1px solid #D1E3FF", // Slightly darker blue border
          boxShadow: "0 10px 20px rgba(37, 99, 235, 0.05)"
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            color: "#1E3A8A", // Dark blue for strong contrast
            mb: 3, 
            fontSize: { xs: "2rem", md: "2.8rem" },
            letterSpacing: "-0.02em"
          }}
        >
          Ready to elevate your expertise?
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "#3F62CD", // Medium blue
            mb: 5, 
            maxWidth: "600px", 
            mx: "auto", 
            lineHeight: 1.8,
            fontSize: { xs: "1rem", md: "1.1rem" }
          }}
        >
          Join SkillSwap today and gain access to a curated network of professionals dedicated to mutual growth and continuous learning.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/signup" // Link to signup page
          sx={{
            backgroundColor: "#2563EB", // Action Blue
            color: "#fff",
            px: 6, py: 1.8, borderRadius: "8px", fontWeight: 700, textTransform: "none",
            fontSize: "1.1rem",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
            "&:hover": { 
              backgroundColor: "#1D4ED8", 
              boxShadow: "0 6px 16px rgba(37, 99, 235, 0.3)" 
            }
          }}
        >
          Sign Up for Free
        </Button>
      </Card>
    </Container>
  </Box>
);

const FooterSection = () => (
  <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#18181B", color: "#A1A1AA" }}>
    <Container maxWidth="lg">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", mb: 1 }}>
            Skill<span style={{ color: "#2563EB" }}>Swap</span>
          </Typography>
          <Typography variant="body2" sx={{ color: "#A1A1AA" }}>
            The professional standard for skill exchange.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 3 }}>
          <MuiLink href="https://facebook.com" target="_blank" rel="noopener" color="inherit" sx={{ '&:hover': { color: '#2563EB' } }}>
            <Facebook fontSize="small" />
          </MuiLink>
          <MuiLink href="https://twitter.com" target="_blank" rel="noopener" color="inherit" sx={{ '&:hover': { color: '#2563EB' } }}>
            <XIcon fontSize="small" />
          </MuiLink>
          <MuiLink href="https://instagram.com" target="_blank" rel="noopener" color="inherit" sx={{ '&:hover': { color: '#2563EB' } }}>
            <Instagram fontSize="small" />
          </MuiLink>
        </Grid>
      </Grid>
      <Divider sx={{ my: { xs: 4, md: 6 }, backgroundColor: "#3F3F46" }} />
      <Typography variant="caption" sx={{ color: "#71717A", display: "block", textAlign: "center" }}>
        &copy; {new Date().getFullYear()} SkillSwap Inc. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

// --- Main LandingPage Component ---
const LandingPage = () => {
  return (
    <Box sx={{ fontFamily: "Inter, sans-serif" }}> {/* Apply a consistent font-family */}
      <HeroSection />
      <FeaturesSection />
      <CallToActionSection />
      <FooterSection />
    </Box>
  );
};

export default LandingPage;