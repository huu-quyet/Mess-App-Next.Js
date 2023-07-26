import client from "@libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await client?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        user: true,
      },
    });

    return conversation;
  } catch (error) {
    return null;
  }
};

export default getConversationById;
