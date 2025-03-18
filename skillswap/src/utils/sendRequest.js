import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const sendSkillRequest = async (sender, receiver) => {
    if (!sender || !receiver) {
        console.error("❌ Missing sender or receiver data.");
        return;
    }

    try {
        const requestRef = collection(db, "skillRequests");
        await addDoc(requestRef, {
            senderUsername: sender.username,
            receiverUsername: receiver.username,
            status: "pending",
            timestamp: new Date(),
        });
        console.log(`✅ Skill request sent from ${sender.username} to ${receiver.username}`);
        alert("Skill request sent!");
    } catch (error) {
        console.error("Error sending request:", error);
    }
};
