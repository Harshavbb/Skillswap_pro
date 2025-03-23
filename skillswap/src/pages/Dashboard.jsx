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
    <Box display="flex" justifyContent="center" mt={4}>
      <Card
        sx={{
          width: 800,
          p: 4,
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: 4,
          backgroundColor: "#E3FDFD",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Profile Image */}
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <img
              src={profileImage}
              alt="Dashboard Illustration"
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Grid>

          {/* Right Side - Profile Section */}
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={userData?.profilePic || ""}
                  sx={{
                    width: 90,
                    height: 90,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Box>
                  {editMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your name"
                    />
                  ) : (
                    <Typography variant="h5" fontWeight="bold">
                      {username || user.email}
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary">
                    {userData?.email}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body1" fontWeight="bold">
                Bio
              </Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself"
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  {bio || "No bio added."}
                </Typography>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="body1" fontWeight="bold">
                Skills Offered
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={editMode ? () => handleRemoveSkill(index) : undefined}
                    sx={{
                      backgroundColor: "#71C9CE",
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                  />
                ))}
                {editMode && (
                  <TextField
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onBlur={handleAddSkill}
                    placeholder="Add skill"
                    size="small"
                    sx={{ width: "150px" }}
                  />
                )}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack direction="row" spacing={2}>
                {[{ icon: <LinkedInIcon />, value: linkedin, setValue: setLinkedin },
                  { icon: <TwitterIcon />, value: twitter, setValue: setTwitter },
                  { icon: <GitHubIcon />, value: github, setValue: setGithub }].map(
                  ({ icon, value, setValue }, index) =>
                    editMode ? (
                      <TextField
                        key={index}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Add link"
                        size="small"
                      />
                    ) : (
                      <Tooltip key={index} title={value || "Not added"}>
                        <IconButton
                          href={value}
                          target="_blank"
                          sx={{
                            color: value ? "#71C9CE" : "#ccc",
                          }}
                        >
                          {icon}
                        </IconButton>
                      </Tooltip>
                    )
                )}
              </Stack>

              <Divider sx={{ my: 3 }} />

              {editMode ? (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSaveChanges}
                  sx={{
                    backgroundColor: "#71C9CE",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#5BB3B8" },
                  }}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setEditMode(true)}
                  sx={{
                    borderColor: "#71C9CE",
                    color: "#71C9CE",
                    "&:hover": {
                      backgroundColor: "#71C9CE",
                      color: "#ffffff",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              )}

              <Button
                variant="text"
                color="error"
                fullWidth
                startIcon={<LogoutIcon />}
                onClick={logout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Dashboard;