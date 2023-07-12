import getConversations from "@app/actions/getConversations";
import SideBar from "@components/SideBar";
import { FC } from "@types";
import ConversationList from "./components/ConversationList";

const ConversationsLayout: FC = async ({ children }) => {
	const conversations: any = await getConversations();
	return (
		<SideBar>
			<div className="h-full">
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</SideBar>
	);
};

export default ConversationsLayout;
