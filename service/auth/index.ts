import HttpClient from "@service/httpClient";

export interface RegisterParams {
	email: string;
	name: string;
	password: string;
}

export const apiRegister = (data: RegisterParams) => {
	return HttpClient.post<RegisterParams, any>("/api/register", data);
};
