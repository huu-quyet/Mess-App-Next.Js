"use client";

import { Conversation, User } from "@prisma/client";
import React, { useMemo, useState } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";

import Avatar from "@components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import useOtherUser from "@hooks/useOtherUers";

interface IProps {
  conversation: Conversation & { user: User[] };
}

const Header: React.FC<IProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.user.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
            href="/conversation"
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => {
            setDrawerOpen(true);
          }}
          className="text-sky-500 cursor-pointer hover:text-sky-600 translate"
        />
      </div>
    </>
  );
};

export default Header;
