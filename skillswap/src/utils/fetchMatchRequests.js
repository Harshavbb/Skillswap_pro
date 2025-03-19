import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchMatchRequests = async (currentUser) => {
    try {
        if (!currentUser || !currentUser.uid) {
            console.error("❌ Error: Invalid currentUser object");
            return [];
        }

        const matchRequestsRef = collection(db, "matchRequests");

        // 🔍 Get both incoming & outgoing requests
        const incomingQuery = query(matchRequestsRef, where("receiverId", "==", currentUser.uid));
        const outgoingQuery = query(matchRequestsRef, where("senderId", "==", currentUser.uid));

        const [incomingSnapshot, outgoingSnapshot] = await Promise.all([
            getDocs(incomingQuery),
            getDocs(outgoingQuery),
        ]);

        let incomingRequests = [];
        let outgoingRequests = [];

        incomingSnapshot.forEach((doc) => {
            incomingRequests.push({ id: doc.id, ...doc.data() });
        });

        outgoingSnapshot.forEach((doc) => {
            outgoingRequests.push({ id: doc.id, ...doc.data() });
        });

        console.log("📡 Incoming Requests:", incomingRequests);
        console.log("📡 Outgoing Requests:", outgoingRequests);

        return { incomingRequests, outgoingRequests };
    } catch (error) {
        console.error("❌ Error fetching match requests:", error);
        return { incomingRequests: [], outgoingRequests: [] };
    }
};
