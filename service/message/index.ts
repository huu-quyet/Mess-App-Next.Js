import HttpClient from "@service/httpClient";

export const postMessage = async (data: any) => {
  return HttpClient.post("/api/messages", data);
};
