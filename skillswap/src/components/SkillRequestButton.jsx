import { sendSkillRequest } from "../utils/sendRequest";
import { useAuth } from "../context/AuthContext";

const SkillRequestButton = ({ receiver }) => {
    const { currentUser } = useAuth();

    if (!currentUser || !receiver) return null;

    return (
        <button
            onClick={() => {
                console.log(`📩 Sending request from ${currentUser.username} to ${receiver.username}`);
                sendSkillRequest(currentUser, receiver);
            }}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
            Send Skill Swap Request
        </button>
    );
};

export default SkillRequestButton;
