import styled from "@emotion/styled";
import { Input, Typography } from "@mui/material";
import { useLayoutEffect, useRef } from "react";
import { Message, User } from "./types";

const Layout = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr auto;
  grid-template-areas: "messages" "input";
  gap: 8px;
  border: 1px solid #0003;
  border-radius: 4px;
  overflow: hidden;
`;

const MessageList = styled.ul`
  grid-area: messages;
  overflow: hidden;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InputContainer = styled.div`
  grid-area: input;
`;

type Props = {
  users: Map<string, User>;
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
};

export const Chat = ({ users, messages, sendMessage }: Props) => {
  const messageList = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    messageList?.current?.scrollTo({
      top: messageList.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Layout style={{ maxHeight: "100%" }}>
      <MessageList ref={messageList}>
        {messages.map((message) => {
          const user = users.get(message.userId)!;
          return (
            <li key={`${message.userId}-${message.timestamp.getTime()}`}>
              <Typography variant="body1">
                <img
                  src={user.avatar!}
                  style={{ height: 20, borderRadius: "100%" }}
                />{" "}
                {user.username}: {message.text}
              </Typography>
            </li>
          );
        })}
      </MessageList>
      <InputContainer>
        <Input
          placeholder="Type a message"
          sx={{ width: "100%" }}
          onKeyDown={(ev) => {
            if (ev.key == "Enter") {
              ev.preventDefault();
              sendMessage((ev.target as HTMLInputElement).value);
              (ev.target as HTMLInputElement).value = "";
            } else if (ev.key == "Escape") {
              ev.preventDefault();
              (ev.target as HTMLInputElement).value = "";
            }
          }}
        />
      </InputContainer>
    </Layout>
  );
};
