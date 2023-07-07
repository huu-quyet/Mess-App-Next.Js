import { FC } from "@types";
import clsx from "clsx";
import React from "react";

interface ButtonProps {
	type?: "button" | "submit" | "reset" | undefined;
	fullWidth?: boolean;
	onClick?: () => void;
	secondary?: boolean;
	danger?: boolean;
	disable?: boolean;
}

const Button: FC<ButtonProps> = ({
	children,
	type,
	fullWidth,
	onClick,
	secondary,
	danger,
	disable,
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disable}
			className={clsx(
				`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
				disable && "opacity-50 cursor-default",
				fullWidth && "w-full",
				secondary ? "text-gray-900" : "text-white",
				danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
				!secondary &&
					!danger &&
					"bg-sky-500 hover:bg-sky-600 focus-visible:bg-sky-600"
			)}
		>
			{children}
		</button>
	);
};

export default Button;
