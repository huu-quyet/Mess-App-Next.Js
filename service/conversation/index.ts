import HttpClient from "@service/httpClient";

interface ConversationParams {
	userId: string;
}

export const postConversations = async (data: ConversationParams) => {
	return HttpClient.post<ConversationParams, any>("/api/conversations", data);
};
