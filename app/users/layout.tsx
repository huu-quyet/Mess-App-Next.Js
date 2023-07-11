import SideBar from "@components/SideBar";
import { FC } from "@types";
import React from "react";

const UsersLayout: FC = async ({ children }) => {
	return (
		<SideBar>
			<div className="h-full">{children}</div>;
		</SideBar>
	);
};

export default UsersLayout;
