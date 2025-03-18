import React, { useState, useEffect } from "react";
import { findMatches } from "./matchUser";
import MatchCard from "./MatchCard";

const MatchList = ({ currentUser }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const foundMatches = await findMatches(currentUser);
      setMatches(foundMatches);
    };

    fetchMatches();
  }, [currentUser]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", padding: "20px" }}>
      {matches.length > 0 ? (
        matches.map((match, index) => <MatchCard key={index} match={match} />)
      ) : (
        <p style={{ color: "white" }}>No matches found</p>
      )}
    </div>
  );
};

export default MatchList;
