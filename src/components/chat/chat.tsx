import { Input, Typography } from "@mui/material";
import { useLayoutEffect, useRef } from "react";
import { Message, User } from "./types";
import styles from "./chat.module.css";

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
    <div className={styles.layout} style={{ maxHeight: "100%" }}>
      <ul className={styles.messageList} ref={messageList}>
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
      </ul>
      <div className={styles.inputContainer}>
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
      </div>
    </div>
  );
};
