import Fiona from "fiona";
import { Message, User } from "./types";

export const createChatHistory = (
  seed: string,
  userCount: number,
  messageCount: number
): { users: Map<string, User>; messages: Message[] } => {
  const users = new Map<string, User>(
    Fiona(seed + "-users")
      .array(userCount, (seeded) =>
        seeded.object({
          id: seeded.regex(/[0-9a-f]{16}/),
          username: seeded.firstname(),
          avatar: seeded.img(),
        })
      )
      .map(
        (user) =>
          [(user as unknown as User).id, user] as unknown as [string, User]
      )
  );

  const userIds = [...users.keys()];

  const messages = Fiona(seed + "-messages").array(messageCount, (seeded) =>
    seeded.object({
      timestamp: new Date(
        seeded.date({ long: true })
      ) as unknown as Fiona.InputStructure,
      userId: seeded.oneOf(userIds),
      text: seeded.sentence(),
    })
  ) as unknown as Message[];

  return { users, messages };
};
