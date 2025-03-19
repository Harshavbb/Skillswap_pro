import React, { useState, useEffect } from "react";
import { findMatches } from "../utils/matchUsers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import MatchCard from "./MatchCard";

const MatchList = ({ currentUser }) => {
  const [matches, setMatches] = useState([]);
  const [acceptedMatches, setAcceptedMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const foundMatches = await findMatches(currentUser);
      setMatches(foundMatches);
    };

    const fetchAcceptedMatches = async () => {
      if (!currentUser) return;

      try {
        const matchRequestsRef = collection(db, "matchRequests");

        // Query accepted matches where the user is sender or receiver
        const acceptedQuery = query(
          matchRequestsRef,
          where("status", "==", "accepted"),
          where("receiverId", "==", currentUser.uid)
        );

        const acceptedSnapshot = await getDocs(acceptedQuery);
        setAcceptedMatches(acceptedSnapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("❌ Error fetching accepted matches:", error);
      }
    };

    fetchMatches();
    fetchAcceptedMatches();
  }, [currentUser]);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>🔍 Potential Matches</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {matches.length > 0 ? (
          matches.map((match, index) => <MatchCard key={index} match={match} />)
        ) : (
          <p>No matches found</p>
        )}
      </div>

      <h2>✅ Accepted Skill Swaps</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {acceptedMatches.length > 0 ? (
          acceptedMatches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))
        ) : (
          <p>No accepted matches yet</p>
        )}
      </div>
    </div>
  );
};

export default MatchList;
