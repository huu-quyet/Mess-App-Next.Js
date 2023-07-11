import type {
	AxiosRequestConfig,
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from "axios";
import axios from "axios";

export type HttpErrorType = "info" | "warning" | "error";

export interface HttpErrorResponse {
	errors: string[];
	message: string | null;
	messageCode: string | null;
	type: HttpErrorType;
}

export interface HttpError extends AxiosError {}

const config: AxiosRequestConfig = {
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10 * 60 * 1000,
};

class Axios {
	private instance: AxiosInstance;

	constructor() {
		const instance = axios.create(config);
		//Request interceptor
		instance.interceptors.request.use(
			(config: InternalAxiosRequestConfig<AxiosRequestConfig<any>>) => {
				return config;
			},
			(error: AxiosError) => Promise.reject(error)
		);

		//Response interceptor
		instance.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error: AxiosError) => Promise.reject(error)
		);

		this.instance = instance;
	}

	public get Instance() {
		return this.instance;
	}

	public post<D = any, R = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<R> {
		return new Promise((resolve, reject) => {
			this.Instance.post<D, AxiosResponse<R, D>>(url, data, config)
				.then((res) => resolve(res.data))
				.catch((error: AxiosError) => reject(error));
		});
	}

	public get<T = any, R = T, D = any>(
		url: string,
		config?: AxiosRequestConfig<D>
	): Promise<R> {
		return new Promise((resolve, reject) => {
			this.Instance.get<T, AxiosResponse<R, D>>(url, config)
				.then((res) => resolve(res.data))
				.catch((error: AxiosError) => reject(error));
		});
	}

	public put<D = any, R = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<R> {
		return new Promise((resolve, reject) => {
			this.Instance.put<D, AxiosResponse<R>>(url, data, config)
				.then((res) => resolve(res.data))
				.catch((error: AxiosError) => reject(error));
		});
	}

	public delete<D = any, R = any>(
		url: string,
		config?: AxiosRequestConfig<D>
	): Promise<R> {
		return new Promise((resolve, reject) => {
			this.Instance.delete<D, AxiosResponse<R>>(url, config)
				.then((response) => resolve(response.data))
				.catch((error: AxiosError) => reject(error));
		});
	}
}

const HttpClient = new Axios();
export default HttpClient;
