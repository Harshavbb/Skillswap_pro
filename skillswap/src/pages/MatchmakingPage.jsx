import React, { useEffect, useState } from "react";
import { findMatches } from "../utils/matchUsers";
import { useAuth } from "../context/AuthContext";
import MatchCard from "../components/MatchCard";
import { CircularProgress } from "@mui/material";

const MatchmakingPage = () => {
    const { user: currentUser } = useAuth();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            if (!currentUser) {
                console.log("⏳ Waiting for user data...");
                return;
            }
            console.log("🔎 Finding matches for", currentUser.username);
            setLoading(true);
            const userMatches = await findMatches(currentUser);
            setMatches(userMatches);
            setLoading(false);
        };

        fetchMatches();
    }, [currentUser]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">🔎 Find Your Skill Match</h2>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <CircularProgress color="inherit" />
                </div>
            ) : matches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map((match, index) => (
                        <MatchCard key={index} match={match} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400">
                    <p className="text-lg">😔 No matches found.</p>
                    <p className="text-sm mt-2">Try adding more skills to increase your chances!</p>
                </div>
            )}
        </div>
    );
};

export default MatchmakingPage;
