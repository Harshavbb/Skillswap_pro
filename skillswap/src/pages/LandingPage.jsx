import React from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import heroImage from "../assets/Hero_finalbg.png";
import feature1 from "../assets/f1bg.png";
import feature2 from "../assets/f2bg.png";
import feature3 from "../assets/f3bg.png";
import { Facebook, Instagram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";

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
          <img
            src={heroImage}
            alt="Hero"
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "12px",
              //boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Grid>

        {/* Right Side - Text & Buttons */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#443627", // Dark brown for better contrast
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Collaborate, Learn & Grow
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#5C4A38", // Slightly darker shade for secondary text
              lineHeight: 1.6,
            }}
          >
            Unlock endless opportunities by exchanging skills with talented individuals worldwide.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "#443627", // Dark brown for better readability
              lineHeight: 1.8,
            }}
          >
            Join a vibrant community where learning is mutual, and knowledge is shared effortlessly. Start swapping skills today!
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#71C9CE", // Primary color
                color: "#ffffff",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#5BB3B8" }, // Slightly darker teal
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#71C9CE", // Primary color
                color: "#71C9CE",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#71C9CE",
                  color: "#ffffff",
                  borderColor: "#71C9CE",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: "#E3FDFD", // Background color
          width: "100%",
          display: "flex",
          justifyContent: "center",
          borderRadius: "12px",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
          mt: 6,
        }}
      >
        <Box sx={{ maxWidth: "1200px", width: "100%", px: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 6,
              color: "#443627", // Dark brown for better contrast
            }}
          >
            Why Choose SkillSwap?
          </Typography>

          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {features.map((feature, index) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: "8px",
                      //boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mt: 3,
                    color: "#443627", // Dark brown for better readability
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: "90%",
                    mt: 1,
                    color: "#5C4A38", // Slightly darker shade for secondary text
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          borderTop: "1px solid #CBF1F5", // Paper color
          backgroundColor: "#E3FDFD", // Background color
          mt: 6,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: "#443627", // Dark brown for better contrast
          }}
        >
          &copy; {new Date().getFullYear()} SkillSwap - All Rights Reserved
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <Facebook sx={{ color: "#71C9CE", cursor: "pointer", fontSize: 28 }} />
          <XIcon sx={{ color: "#71C9CE", cursor: "pointer", fontSize: 28 }} />
          <Instagram sx={{ color: "#71C9CE", cursor: "pointer", fontSize: 28 }} />
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;