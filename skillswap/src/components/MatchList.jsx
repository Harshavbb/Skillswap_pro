import React, { useState, useEffect } from "react";
import { findMatches } from "../utils/matchUsers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import MatchCard from "./MatchCard";
import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MatchList = ({ currentUser }) => {
  const [matches, setMatches] = useState([]);
  const [acceptedMatches, setAcceptedMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) {
      console.warn("No currentUser found, skipping match fetch.");
      return;
    }

    const fetchMatches = async () => {
      setLoading(true);
      try {
        console.log("Fetching matches for user:", currentUser.uid);
        const foundMatches = await findMatches(currentUser);
        
        // Log response before updating state
        console.log("Raw foundMatches response:", foundMatches);
    
        if (!Array.isArray(foundMatches) || foundMatches.length === 0) {
          console.warn("findMatches returned an empty array or invalid data:", foundMatches);
        }
    
        setMatches(foundMatches || []); // Ensure state updates
      } catch (error) {
        console.error("Error fetching matches:", error);
        setMatches([]); // Prevent crashes
      } finally {
        setLoading(false);
      }
    };
    

    const fetchAcceptedMatches = async () => {
      try {
        console.log("Fetching accepted matches...");
        const matchRequestsRef = collection(db, "matchRequests");
        const acceptedQuery = query(
          matchRequestsRef,
          where("status", "==", "accepted"),
          where("participants", "array-contains", currentUser.uid)
        );
        const acceptedSnapshot = await getDocs(acceptedQuery);
        const acceptedData = acceptedSnapshot.docs.map((doc) => doc.data());
        
        console.log("Accepted matches:", acceptedData);
        setAcceptedMatches(acceptedData);
      } catch (error) {
        console.error("Error fetching accepted matches:", error);
        setAcceptedMatches([]);
      }
    };

    fetchMatches();
    fetchAcceptedMatches();
  }, [currentUser?.uid]);

  console.log("Rendering MatchList - Matches:", matches);
  console.log("Rendering MatchList - Accepted Matches:", acceptedMatches);

  return (
    <Box sx={{ py: 3, color: "white" }}>
      {/* Potential Matches Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
        <SearchIcon sx={{ mr: 1, color: "#4ab7e0" }} /> Potential Matches
      </Typography>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : matches.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {matches.map((match, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <MatchCard match={match} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="gray" textAlign="center">No matches found. Try updating your skills!</Typography>
      )}

      {/* Accepted Skill Swaps Section */}
      <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom sx={{ display: "flex", alignItems: "center" }}>
        <CheckCircleIcon sx={{ mr: 1, color: "#84ac64" }} /> Accepted Skill Swaps
      </Typography>

      {acceptedMatches.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {acceptedMatches.map((match, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <MatchCard match={match} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="gray" textAlign="center">No accepted matches yet. Keep connecting!</Typography>
      )}
    </Box>
  );
};

export default MatchList;
