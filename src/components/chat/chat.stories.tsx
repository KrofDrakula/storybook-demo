import { Meta, StoryObj } from "@storybook/react";
import { Chat } from "./chat";
import { fn } from "@storybook/test";
import { useCallback, useState } from "react";
import { delay } from "../../utils/async";

const Template: typeof Chat = ({ messages: initialMessages, ...props }) => {
  const [messages, setMessages] = useState(initialMessages);
  const sendMessage = useCallback(
    (message: string) =>
      delay(200).then(() =>
        setMessages((list) => [
          ...list,
          { text: message, timestamp: new Date(), userId: "me" },
        ])
      ),
    []
  );
  return (
    <div style={{ height: 500 }}>
      <Chat {...props} messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

const meta: Meta<typeof Chat> = {
  component: Chat,
  render: Template,
};

export default meta;

export const Empty: StoryObj<typeof Chat> = {
  args: {
    messages: [
      {
        text: "Hello world! what a world.",
        userId: "123",
        timestamp: new Date(),
      },
    ],
    users: new Map(),
    sendMessage: fn(),
  },
};
