import { Conversation, Message, User } from "@prisma/client";

export type FC<T = {}> = React.FC<React.PropsWithChildren<T>>;
export type ReactSetState<T = any> = React.Dispatch<React.SetStateAction<T>>;

export type FullMessageType = Message & {
	sender: User;
	seen: User[];
};

export type FullConversationType = Conversation & {
	user: User[];
	messages: FullMessageType[];
};
