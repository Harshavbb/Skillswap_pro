import React from "react";
import MatchList from "../components/MatchList";
import { useAuth } from "../context/AuthContext";

const MatchmakingPage = () => {
  const { user } = useAuth(); // Assuming `useAuth` provides `user`

  return (
    <div style={{ background: "#121212", minHeight: "100vh", padding: "20px"}}>
      <h2 style={{ textAlign: "center", color: "#fff" }}>🔍 Your Skill Matches</h2>
      <MatchList currentUser={user} />
    </div>
  );
};

export default MatchmakingPage;
