import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const [hoverProfilePic, setHoverProfilePic] = useState(false);

  // Editable fields
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [profilePic, setProfilePic] = useState(null);
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
          setProfilePic(data.profilePic || "");
          setSkills(data.skillsOffered || []);
        }
      } catch (err) {
        console.error("Failed to load user data.");
      }
      setLoading(false);
    };
  
    fetchUserData();
  }, [user]);

  const handleProfilePicUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    try {
      const base64String = reader.result;
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { profilePic: base64String });

      setUserData((prev) => ({ ...prev, profilePic: base64String }));
      setSuccessMessage("Profile picture updated!");
    } catch (error) {
      setError("Error updating profile picture.");
    }
  };
};

  

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSaveChanges = async () => {
    if (!user) return;
  
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        username,
        bio,
        profilePic,
        skillsOffered: skills,
        socialLinks: { linkedin, twitter, github },
      });

      setUserData((prev) => ({
        ...prev,
        username,
        bio,
        profilePic,
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
      <Card sx={{ width: 500, p: 3 }}>
        <CardContent>
          {/* Profile Header */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{ position: "relative" }}
              onMouseEnter={() => setHoverProfilePic(true)}
              onMouseLeave={() => setHoverProfilePic(false)}
            >
              <Avatar src={profilePic || userData?.profilePic || ""} sx={{ width: 80, height: 80 }} />
              {hoverProfilePic && editMode && (
                <label htmlFor="profile-pic-upload">
                  <Tooltip title="Upload Profile Picture">
                    <IconButton
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </label>
              )}
              <input type="file" accept="image/*" hidden id="profile-pic-upload" onChange={handleProfilePicUpload} />
            </Box>
            <Box>
              {editMode ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <Typography variant="h5">{username || user.email}</Typography>
              )}
              <Typography variant="body2" color="textSecondary">{userData?.email}</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Bio Section */}
          <Typography variant="body1" fontWeight="bold">Bio</Typography>
          {editMode ? (
            <TextField fullWidth value={bio} onChange={(e) => setBio(e.target.value)} />
          ) : (
            <Typography variant="body2" color="textSecondary">{bio || "No bio added."}</Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Skills Section */}
          <Typography variant="body1" fontWeight="bold">Skills Offered</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {skills.map((skill, index) => (
              <Chip key={index} label={skill} />
            ))}
            {editMode && (
              <TextField value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onBlur={handleAddSkill} placeholder="Add skill" />
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Social Media Links */}
          <Stack direction="row" spacing={2}>
            {[{ icon: <LinkedInIcon />, value: linkedin, setValue: setLinkedin },
              { icon: <TwitterIcon />, value: twitter, setValue: setTwitter },
              { icon: <GitHubIcon />, value: github, setValue: setGithub }]
              .map(({ icon, value, setValue }, index) =>
                editMode ? (
                  <TextField key={index} value={value} onChange={(e) => setValue(e.target.value)} />
                ) : (
                  <IconButton key={index} href={value} target="_blank">
                    {icon}
                  </IconButton>
                )
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Edit & Save Buttons */}
          {editMode ? (
            <Button variant="contained" fullWidth onClick={handleSaveChanges}>Save Changes</Button>
          ) : (
            <Button variant="outlined" fullWidth onClick={() => setEditMode(true)}>Edit Profile</Button>
          )}

          {/* Logout Button */}
          <Button variant="text" color="error" fullWidth startIcon={<LogoutIcon />} onClick={logout}>Logout</Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
