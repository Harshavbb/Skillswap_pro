import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, CircularProgress, Stack } from "@mui/material";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          setUserData(null);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5dc">
      <Card sx={{ width: 400, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center">
            Welcome to SkillSwap
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mt={1}>
            Exchange skills and grow together!
          </Typography>

          <Stack spacing={1.5} mt={3} alignItems="center">
            {userData ? (
              <>
                <Typography variant="h6" fontWeight="bold">
                  Hello, {userData.username || user.email}!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Skills Offered: {userData.skillsOffered?.join(", ") || "None"}
                </Typography>
              </>
            ) : (
              <Typography color="error" fontWeight="bold">
                User data not found in Firestore!
              </Typography>
            )}

            <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
