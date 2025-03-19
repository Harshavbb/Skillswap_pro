import { db } from "../config/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

export const fetchMatchRequests = async (currentUser) => {
    try {
        if (!currentUser || !currentUser.uid) {
            console.error("❌ Error: Invalid currentUser object");
            return [];
        }

        const matchRequestsRef = collection(db, "matchRequests");

        // Get all match requests where currentUser is the receiver
        const q = query(matchRequestsRef, where("receiverId", "==", currentUser.uid));
        const snapshot = await getDocs(q);

        let matchRequests = [];
        for (const docSnap of snapshot.docs) {
            const request = { id: docSnap.id, ...docSnap.data() };

            // Check if the sender also sent a request back
            const reverseQuery = query(
                matchRequestsRef,
                where("senderId", "==", request.receiverId),
                where("receiverId", "==", request.senderId)
            );
            const reverseSnapshot = await getDocs(reverseQuery);

            if (!reverseSnapshot.empty) {
                // If both users sent requests, update status to "matched"
                const matchDoc = doc(db, "matchRequests", request.id);
                await updateDoc(matchDoc, { status: "matched" });
                request.status = "matched";
            }

            matchRequests.push(request);
        }

        return matchRequests;
    } catch (error) {
        console.error("❌ Error fetching match requests:", error);
        return [];
    }
};
