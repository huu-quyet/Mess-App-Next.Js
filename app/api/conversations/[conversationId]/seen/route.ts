import getCurrentUser from "@app/actions/getCurrentUser";
import client from "@libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await client.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        user: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const lastMessage = conversation.messages[-1];
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await client.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse("Internal error", { status: 500 });
  }
}
