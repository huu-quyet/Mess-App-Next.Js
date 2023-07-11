import { toast } from "react-hot-toast";

class Notify {
	private toast: any;
	constructor() {
		const toastInstance = toast;
		this.toast = toastInstance;
	}
	public error(message: string) {
		this.toast.error(message);
	}
	public success(message: string) {
		this.toast.success(message);
	}
}

const notification = new Notify();
export default notification;
