import React from "react";

import type { FC } from "@types";

import DesktopSideBar from "./DesktopSideBar";

const SideBar: FC = async ({ children }) => {
	return (
		<div className="h-full">
			<DesktopSideBar />
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
};

export default SideBar;
