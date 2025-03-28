import useAuth from "../hooks/useAuth.js";

const BASE_URL = "http://localhost:3030/data/contacts";

const STUDIO_EMAIL = "recipeStudio@abv.bg";

export default function useContact() {
  const { isAuthenticated, request, userId, userEmail } = useAuth();

  const sendMessage = async (messageData) => {
    if (!isAuthenticated) {
      throw new Error("You must be logged in to send messages");
    }

    if (!messageData.message?.trim()) {
      throw new Error("Message cannot be empty");
    }

    const data = {
      message: messageData.message,
      name: messageData.name || "Anonymous",
      senderEmail: userEmail,
      recipientEmail: STUDIO_EMAIL,
      _ownerId: userId,
      _createdOn: Date.now(),
      status: "unread",
    };

    return request.post(BASE_URL, data);
  };

  return {
    sendMessage,
    isAuthenticated,
  };
}
