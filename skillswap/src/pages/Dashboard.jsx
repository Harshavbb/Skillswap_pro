import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import profileImage from "../assets/profile2.jpg";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
  TextField,
  Tooltip,
  Divider,
  Grid,
  Container
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          setUsername(data.username || "");
          setBio(data.bio || "");
          setLinkedin(data.socialLinks?.linkedin || "");
          setTwitter(data.socialLinks?.twitter || "");
          setGithub(data.socialLinks?.github || "");
          setSkills(data.skillsOffered || []);
        }
      } catch (err) {
        console.error("Failed to load user data.");
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        username,
        bio,
        skillsOffered: skills,
        socialLinks: { linkedin, twitter, github },
      });
      setUserData((prev) => ({
        ...prev,
        username,
        bio,
        skillsOffered: skills,
        socialLinks: { linkedin, twitter, github },
      }));
      setEditMode(false);
    } catch (err) {
      console.error("Error saving profile changes.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            borderRadius: "24px",
            border: "3px solid #2D2D2D",
            boxShadow: "14px 14px 0px #DCD6FF", // Large Lavender shadow
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* Left Side - Profile Visual Block */}
            <Grid 
              item xs={12} sm={4} 
              sx={{ 
                backgroundColor: "#FFF9D6", // Lemon Accent
                borderRight: { sm: "3px solid #2D2D2D" },
                borderBottom: { xs: "3px solid #2D2D2D", sm: "none" },
                p: 4, 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Box
                component="img"
                src={profileImage}
                alt="Profile Illustration"
                sx={{
                  width: "100%",
                  maxWidth: "180px",
                  borderRadius: "20px",
                  border: "3px solid #2D2D2D",
                  backgroundColor: "#fff",
                  mb: 3
                }}
              />
              <Avatar
                src={userData?.profilePic || ""}
                sx={{
                  width: 80,
                  height: 80,
                  border: "3px solid #2D2D2D",
                  boxShadow: "4px 4px 0px #2D2D2D",
                }}
              />
            </Grid>

            {/* Right Side - Content Section */}
            <Grid item xs={12} sm={8}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ mb: 4 }}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={username}
                      label="User Name"
                      onChange={(e) => setUsername(e.target.value)}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", border: "2px solid #2D2D2D" } }}
                    />
                  ) : (
                    <Typography variant="h4" sx={{ fontWeight: 900, color: "#2D2D2D", letterSpacing: -1 }}>
                      {username || user.email}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "#888", mt: 1 }}>
                    {userData?.email}
                  </Typography>
                </Box>

                <Box sx={{ p: 2, backgroundColor: "#E0F9F1", border: "2px solid #2D2D2D", borderRadius: "16px", mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, textTransform: "uppercase", mb: 1 }}>
                    Bio
                  </Typography>
                  {editMode ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: "#2D2D2D", lineHeight: 1.6 }}>
                      {bio || "Tell us about your superpower..."}
                    </Typography>
                  )}
                </Box>

                <Typography variant="subtitle2" sx={{ fontWeight: 900, textTransform: "uppercase", mb: 2 }}>
                  Skills Offered
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1, mb: 3 }}>
                  {skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={editMode ? () => handleRemoveSkill(index) : undefined}
                      sx={{
                        backgroundColor: "#DCD6FF",
                        color: "#2D2D2D",
                        fontWeight: "bold",
                        border: "2px solid #2D2D2D",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                  {editMode && (
                    <TextField
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onBlur={handleAddSkill}
                      placeholder="+ Add Skill"
                      size="small"
                      sx={{ width: "130px" }}
                    />
                  )}
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  {[
                    { icon: <LinkedInIcon />, value: linkedin, setValue: setLinkedin, color: "#DCD6FF" },
                    { icon: <TwitterIcon />, value: twitter, setValue: setTwitter, color: "#FFF9D6" },
                    { icon: <GitHubIcon />, value: github, setValue: setGithub, color: "#E0F9F1" },
                  ].map(({ icon, value, setValue, color }, index) =>
                    editMode ? (
                      <TextField
                        key={index}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Social Link"
                        size="small"
                      />
                    ) : (
                      <Tooltip key={index} title={value || "Not added"}>
                        <IconButton
                          href={value}
                          target="_blank"
                          sx={{
                            backgroundColor: value ? color : "#fff",
                            border: "2px solid #2D2D2D",
                            borderRadius: "10px",
                            color: "#2D2D2D",
                            "&:hover": { backgroundColor: color }
                          }}
                        >
                          {icon}
                        </IconButton>
                      </Tooltip>
                    )
                  )}
                </Stack>

                <Stack direction="row" spacing={2}>
                  {editMode ? (
                    <Button
                      variant="contained"
                      onClick={handleSaveChanges}
                      sx={{
                        flex: 1,
                        backgroundColor: "#2D2D2D",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "12px",
                        border: "3px solid #2D2D2D",
                        "&:hover": { backgroundColor: "#000" }
                      }}
                    >
                      Confirm Changes
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setEditMode(true)}
                      sx={{
                        flex: 1,
                        backgroundColor: "#2D2D2D",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "12px",
                        border: "3px solid #2D2D2D",
                        boxShadow: "4px 4px 0px #DCD6FF",
                        "&:hover": { transform: "translate(-2px, -2px)", boxShadow: "6px 6px 0px #DCD6FF" }
                      }}
                    >
                      Edit Profile
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={logout}
                    sx={{
                      borderRadius: "12px",
                      border: "3px solid #2D2D2D",
                      fontWeight: "bold",
                      color: "#2D2D2D",
                      "&:hover": { backgroundColor: "#FFE0E0", borderColor: "#2D2D2D" }
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;