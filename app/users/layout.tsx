import getUsers from "@app/actions/getUser";
import SideBar from "@components/SideBar";
import { FC } from "@types";
import React from "react";
import UserList from "./components/UserList";

const UsersLayout: FC = async ({ children }) => {
	const users = await getUsers();
	return (
		<SideBar>
			<div className="h-full">
				<UserList items={users} />
				{children}
			</div>
		</SideBar>
	);
};

export default UsersLayout;
