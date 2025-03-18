import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const findMatches = async (currentUser) => {
    console.log("🔍 Fetching matches for:", currentUser.username);

    if (!currentUser.skillsNeeded || !Array.isArray(currentUser.skillsNeeded)) {
        console.log("❌ Error: currentUser.skillsNeeded is missing or not an array");
        return [];
    }

    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    let matches = [];

    snapshot.forEach((doc) => {
        let user = doc.data();

        // Avoid self-matching
        if (user.username === currentUser.username) return;

        // Ensure user has skillsOffered and skillsNeeded
        user.skillsOffered = Array.isArray(user.skillsOffered) ? user.skillsOffered : [];
        user.skillsNeeded = Array.isArray(user.skillsNeeded) ? user.skillsNeeded : [];

        console.log(`👤 Checking user: ${user.username}`);
        console.log("📧 Email:", user.email || "No email found");
        console.log("   Skills Offered:", user.skillsOffered);
        console.log("   Skills Needed:", user.skillsNeeded);
        console.log("📦 Total users retrieved:", snapshot.docs.length);

        // Convert everything to lowercase for case-insensitive matching
        const neededSkills = currentUser.skillsNeeded.map(skill => skill.toLowerCase());
        const offeredSkills = currentUser.skillsOffered.map(skill => skill.toLowerCase());

        let mutualSkills = user.skillsOffered.filter(skill =>
            neededSkills.includes(skill.toLowerCase())
        );
        let reverseMatch = offeredSkills.filter(skill =>
            user.skillsNeeded.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );

        if (mutualSkills.length > 0 || reverseMatch.length > 0) {
            console.log(`✅ Match found with ${user.username}`);
            matches.push({
                user: user,
                mutualSkills: mutualSkills,
                reverseMatch: reverseMatch
            });
        }
    });

    // Sort matches by number of mutual skills
    matches.sort((a, b) => b.mutualSkills.length - a.mutualSkills.length);

    console.log("📌 Final Matches:", matches);
    return matches;
};
