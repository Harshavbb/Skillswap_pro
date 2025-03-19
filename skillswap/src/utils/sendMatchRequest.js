import { db } from "../config/firebase";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export const sendMatchRequest = async (sender, receiver) => {
  try {
    console.log("🚀 Current User:", sender);
    console.log("🎯 Matched User:", receiver);

    if (!sender?.uid || !receiver?.uid) {
      console.error("❌ Error: Missing user ID(s)", { sender, receiver });
      return { success: false, message: "User ID missing" };
    }

    const matchRequestsRef = collection(db, "matchRequests");

    // 🔍 Check if a request already exists
    const q = query(
      matchRequestsRef,
      where("senderId", "==", sender.uid),
      where("receiverId", "==", receiver.uid)
    );

    const existingRequests = await getDocs(q);
    if (!existingRequests.empty) {
      return { success: false, message: "⚠️ Match request already exists!" };
    }

    // 🔍 Check if reverse request exists (receiver → sender)
    const reverseQuery = query(
      matchRequestsRef,
      where("senderId", "==", receiver.uid),
      where("receiverId", "==", sender.uid)
    );

    const reverseRequest = await getDocs(reverseQuery);

    if (!reverseRequest.empty) {
      // ✅ Both users have sent requests → update both requests to "matched"
      const reverseRequestDoc = reverseRequest.docs[0];
      const requestRef = doc(db, "matchRequests", reverseRequestDoc.id);

      await updateDoc(requestRef, { status: "matched" });

      console.log("🎉 Skill Swap Confirmed!");
      return { success: true, message: "🎉 Skill Swap Confirmed!" };
    } else {
      // 🆕 If no reverse request, create a new request
      await addDoc(matchRequestsRef, {
        senderId: sender.uid,
        senderName: sender.username,
        receiverId: receiver.uid,
        receiverName: receiver.username,
        status: "pending",
        timestamp: new Date(),
      });

      return { success: true, message: "✅ Skill request sent successfully!" };
    }
  } catch (error) {
    console.error("❌ Error sending match request:", error);
    return { success: false, message: "Error sending match request" };
  }
};
