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

  const steps = ["Basic Info", "Add Bio", "Social Media"];

  // 📌 Validation Function
  const validate = () => {
    let newErrors = {};

    if (activeStep === 0) {
      if (!formData.username || formData.username.length < 3)
        newErrors.username = "Username must be at least 3 characters";
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = "Invalid email address";
      if (!formData.password || formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (!formData.location)
        newErrors.location = "Location is required";
    }

    if (activeStep === 2) {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      if (formData.linkedin && !urlPattern.test(formData.linkedin))
        newErrors.linkedin = "Invalid LinkedIn URL";
      if (formData.github && !urlPattern.test(formData.github))
        newErrors.github = "Invalid GitHub URL";
      if (formData.twitter && !urlPattern.test(formData.twitter))
        newErrors.twitter = "Invalid Twitter URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validate()) {
      if (activeStep === steps.length - 1) {
        await handleSignup();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
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

      // Store user data in Firestore
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
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: "50%", margin: "auto", mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Form Inputs */}
      <Box sx={{ mt: 3 }}>
        {activeStep === 0 && (
          <>
            <TextField
              label="Username *"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              label="Email *"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password *"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Location *"
              fullWidth
              margin="normal"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              error={!!errors.location}
              helperText={errors.location}
            />
          </>
        )}

        {activeStep === 1 && (
          <TextField
            label="Bio"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
          />
        )}

        {activeStep === 2 && (
          <>
            <TextField
              label="LinkedIn"
              fullWidth
              margin="normal"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              error={!!errors.linkedin}
              helperText={errors.linkedin}
            />
            <TextField
              label="GitHub"
              fullWidth
              margin="normal"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              error={!!errors.github}
              helperText={errors.github}
            />
            <TextField
              label="Twitter"
              fullWidth
              margin="normal"
              value={formData.twitter}
              onChange={(e) =>
                setFormData({ ...formData, twitter: e.target.value })
              }
              error={!!errors.twitter}
              helperText={errors.twitter}
            />
          </>
        )}
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        {activeStep > 0 && (
          <Button onClick={() => setActiveStep((prev) => prev - 1)}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSignup} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Finish"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Signup;
