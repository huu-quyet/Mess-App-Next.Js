import type { FC } from "@types";

import DesktopSideBar from "./DesktopSideBar";
import MobileSideBar from "./MobileSideBar";
import getCurrentUser from "@app/actions/getCurrentUser";

const SideBar: FC = async ({ children }) => {
	const currentUser = await getCurrentUser();

	return (
		<div className="h-full">
			<DesktopSideBar currentUser={currentUser!} />
			<MobileSideBar />
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
};

export default SideBar;
