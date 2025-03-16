import React from "react";
import { AppBar, Toolbar, Button, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const LandingPage = () => {
  return (
    <Container maxWidth="lg">
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none", mt: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0d173b" }}>
            SkillSwap
          </Typography>
          <div>
            <Button color="inherit" sx={{ mr: 2 }}>Home</Button>
            <Button color="inherit" sx={{ mr: 2 }}>Log in</Button>
            <Button variant="contained" sx={{ backgroundColor: "#e2d64b", color: "#0d173b" }}>Sign up</Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Grid container spacing={4} alignItems="center" sx={{ mt: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold">
            Swap Skills, <br /> Learn and Grow
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
            Connect with skilled individuals to exchange knowledge and grow together.
          </Typography>
          <Button variant="contained" sx={{ mt: 3, backgroundColor: "#84ac64", color: "#fff", padding: "12px 24px" }}>
            Get Started
          </Button>
        </Grid>

        {/* Illustration (Dummy Card for Now) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 4, textAlign: "center", boxShadow: 3 }}>
            <PeopleAltIcon sx={{ fontSize: 100, color: "#4ab7e0" }} />
            <CardContent>
              <Typography variant="h6">Connect & Learn</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
