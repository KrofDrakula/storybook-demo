import { Meta, StoryObj } from "@storybook/react";
import { Chat } from "./chat";
import { fn } from "@storybook/test";
import { useCallback, useMemo, useState } from "react";
import { delay } from "../../utils/async";
import { createChatHistory } from "./chat.data";

const Template: typeof Chat = ({
  messages: initialMessages,
  sendMessage: originalSendMessage,
  ...props
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const currentUser = useMemo(
    () => props.users.values().next().value!,
    [props.users]
  );

  const sendMessage = useCallback(
    (message: string) =>
      delay(200).then(() => {
        originalSendMessage(message);
        setMessages((list) => [
          ...list,
          { text: message, timestamp: new Date(), userId: currentUser.id },
        ]);
      }),
    [originalSendMessage, currentUser.id]
  );

  return (
    <div style={{ height: 500 }}>
      <Chat {...props} messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

const meta: Meta<typeof Chat> = {
  title: "03 - Chat",
  component: Chat,
  render: Template,
  tags: ["!autodocs"],
};

export default meta;

type Story = StoryObj<typeof Chat>;

export const Empty: Story = {
  args: {
    messages: [
      {
        text: "Hello world! what a world.",
        userId: "123",
        timestamp: new Date(),
      },
    ],
    users: new Map([["123", { avatar: "", id: "123", username: "The Dude" }]]),
    sendMessage: fn(),
  },
};

const longChatHistory = createChatHistory("ooglyboogly", 30, 1000);

export const LongChat: Story = {
  args: {
    ...longChatHistory,
    sendMessage: fn(),
  },
};
