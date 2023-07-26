import HttpClient from "@service/httpClient";

interface ConversationParams {
  userId: string;
}

export const postConversations = async (data: ConversationParams) => {
  return HttpClient.post<ConversationParams, any>("/api/conversations", data);
};

export const postSeenConversation = async (
  conversationId: string,
  data: any
) => {
  return HttpClient.post<typeof data, any>(
    `/api/conversation/${conversationId}/seen`
  );
};

export const deleteConversation = async (conversationId: string) => {
  return HttpClient.delete(`/api/conversations/${conversationId}`);
};
