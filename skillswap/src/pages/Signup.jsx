import { useState } from "react";
import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  CircularProgress,
  Typography,
  Card,
  Container,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    bio: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = ["Account Details", "Professional Bio", "Network Links"];

  const validate = () => {
    let newErrors = {};
    if (activeStep === 0) {
      if (!formData.username || formData.username.length < 3)
        newErrors.username = "Minimum 3 characters required";
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = "Valid email required";
      if (!formData.password || formData.password.length < 6)
        newErrors.password = "Minimum 6 characters required";
      if (!formData.location)
        newErrors.location = "Location is required";
    }
    if (activeStep === 2) {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      if (formData.linkedin && !urlPattern.test(formData.linkedin))
        newErrors.linkedin = "Invalid URL";
      if (formData.github && !urlPattern.test(formData.github))
        newErrors.github = "Invalid URL";
      if (formData.twitter && !urlPattern.test(formData.twitter))
        newErrors.twitter = "Invalid URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validate()) {
      if (activeStep === steps.length - 1) {
        await handleSignup();
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userId = userCredential.user.uid;

      await setDoc(doc(db, "users", userId), {
        username: formData.username,
        email: formData.email,
        location: formData.location,
        bio: formData.bio || null,
        profileImage: null,
        skillsOffered: [],
        skillsAcquired: [],
        socialMedia: {
          linkedin: formData.linkedin || null,
          github: formData.github || null,
          twitter: formData.twitter || null,
        },
        rating: null,
        createdAt: new Date(),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", minHeight: "100vh", display: "flex", alignItems: "center", py: 4 }}>
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", letterSpacing: "-0.025em" }}>
              Join SkillSwap
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", mt: 1 }}>
              Complete the steps to set up your professional profile.
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "&.Mui-active": { color: "#2563EB" },
                      "&.Mui-completed": { color: "#2563EB" },
                    },
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Stack spacing={2.5}>
            {activeStep === 0 && (
              <>
                <TextField
                  label="Username"
                  fullWidth
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  error={!!errors.username}
                  helperText={errors.username}
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <TextField
                  label="Location"
                  fullWidth
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </>
            )}

            {activeStep === 1 && (
              <TextField
                label="Professional Bio"
                multiline
                rows={5}
                fullWidth
                placeholder="Briefly describe your expertise and what you're looking to learn..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            )}

            {activeStep === 2 && (
              <>
                <TextField
                  label="LinkedIn Profile URL"
                  fullWidth
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  error={!!errors.linkedin}
                  helperText={errors.linkedin}
                />
                <TextField
                  label="GitHub Profile URL"
                  fullWidth
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  error={!!errors.github}
                  helperText={errors.github}
                />
                <TextField
                  label="Twitter (X) Profile URL"
                  fullWidth
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  error={!!errors.twitter}
                  helperText={errors.twitter}
                />
              </>
            )}
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "#4B5563",
                "&:disabled": { color: "#D1D5DB" },
              }}
            >
              Previous
            </Button>
            
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                px: 4,
                py: 1.2,
                borderRadius: "6px",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#374151", boxShadow: "none" },
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
              ) : activeStep === steps.length - 1 ? (
                "Create Profile"
              ) : (
                "Continue"
              )}
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Signup;