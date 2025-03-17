import { Card, Grid, Typography, Stack } from "@mui/material";

const FormContainer = ({ title, children, illustration }) => {
  return (
    <Card sx={{ display: "flex", overflow: "hidden", borderRadius: 3, boxShadow: 5 }}>
      {/* Left Side - Illustration */}
      <Grid container>
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", bgcolor: "#84ac64" }}>
          <img src={illustration} alt={title} style={{ width: "80%" }} />
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} md={6} sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Stack spacing={2} width="100%">
            {children}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FormContainer;
