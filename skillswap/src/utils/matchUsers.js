import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const findMatches = async (currentUser) => {
    if (!currentUser || !currentUser.skillsNeeded || !Array.isArray(currentUser.skillsNeeded)) {
        console.log("❌ Error: Invalid currentUser object or missing skillsNeeded");
        return [];
    }

    console.log("🔍 Fetching matches for:", currentUser.username);

    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    let matches = [];

    snapshot.forEach((doc) => {
        let user = { ...doc.data(), uid: doc.id }; // Use Firestore doc.id as uid
        if (user.uid === currentUser.uid) return; // Skip current user
    

        user.skillsOffered = Array.isArray(user.skillsOffered) ? user.skillsOffered : [];
        user.skillsNeeded = Array.isArray(user.skillsNeeded) ? user.skillsNeeded : [];

        // Convert skills to lowercase for case-insensitive matching
        const neededSkills = currentUser.skillsNeeded.map(skill => skill.toLowerCase());
        const offeredSkills = currentUser.skillsOffered.map(skill => skill.toLowerCase());

        let mutualSkills = user.skillsOffered.filter(skill => neededSkills.includes(skill.toLowerCase()));
        let reverseMatch = offeredSkills.filter(skill => user.skillsNeeded.map(s => s.toLowerCase()).includes(skill.toLowerCase()));

        if (mutualSkills.length > 0 || reverseMatch.length > 0) {
            console.log(`✅ Match found with ${user.username}`);
            matches.push({ user, mutualSkills, reverseMatch });
        }
    });

    // Sort matches by number of mutual skills
    matches.sort((a, b) => b.mutualSkills.length - a.mutualSkills.length);

    return matches;
};
