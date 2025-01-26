import styled from "@emotion/styled";
import { Input, Typography } from "@mui/material";
import { useLayoutEffect, useRef } from "react";

export type User = {
  id: string;
  username: string;
  avatar: string | null;
};

export type Message = {
  timestamp: Date;
  userId: string;
  text: string;
};

const Layout = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr auto;
  grid-template-areas: "messages" "input";
  gap: 8px;
  border: 1px solid #0003;
  border-radius: 4px;
`;

const MessageList = styled.ul`
  grid-area: messages;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  align-items: stretch;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2px;
  max-height: 100%;
`;

const InputContainer = styled.div`
  grid-area: input;
`;

type Props = {
  users: Map<string, User>;
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
};

export const Chat = (props: Props) => {
  const messageList = useRef<HTMLUListElement>(null);
  useLayoutEffect(() => {
    messageList?.current?.scrollTo({
      top: messageList.current.scrollHeight,
      behavior: "smooth",
    });
  }, [props.messages]);
  return (
    <Layout style={{ maxHeight: "100%" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <MessageList ref={messageList}>
          {props.messages.map((message) => (
            <li key={`${message.userId}-${message.timestamp.getTime()}`}>
              <Typography variant="body1">
                {message.userId}: {message.text}
              </Typography>
            </li>
          ))}
        </MessageList>
      </div>
      <InputContainer>
        <Input
          placeholder="Type a message"
          sx={{ width: "100%" }}
          onKeyDown={(ev) => {
            if (ev.key == "Enter") {
              ev.preventDefault();
              props.sendMessage((ev.target as HTMLInputElement).value);
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
