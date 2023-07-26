"use client";

import React, { useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import Avatar from "@components/Avatar";
import { postConversations } from "@service/conversation";

interface Props {
  data: User;
}

const UserBox: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const res = await postConversations({ userId: data.id });
      router.push(`/conversations/${res.id}`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full relative flex p-3 items-center space-x-2 bg-white hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
