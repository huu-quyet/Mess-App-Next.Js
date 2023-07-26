"use client";

import useConversation from "@hooks/useConversation";
import { FullMessageType } from "@types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface IProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<IProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {}, []);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => {
        return (
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        );
      })}
      <div ref={bottomRef} className="pt-24"></div>
    </div>
  );
};

export default Body;
