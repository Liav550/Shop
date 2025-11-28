import { Box, TextField, IconButton } from "@mui/material";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { colorPalette } from "../utils/consts";
import { useGetRequest } from "../hooks/useGetRequest";
import { useAuth } from "../contexts/useAuth";
import type { Message as MessageType } from "../utils/types";
import { Message } from "../components/chat/Message";

const Chat = () => {
  const { user, token } = useAuth();
  const { data: messages } = useGetRequest<MessageType[]>(
    `messages/${user?.id}`,
    !!token,
    token ? token : undefined
  );
  const [input, setInput] = useState("");
  const chatRef = useRef<Element>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  const extractTime = (time: string) => {
    return new Date(time).toLocaleString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === "") return;

    setInput("");
  };

  return (
    <Box
      bgcolor={colorPalette.salmon}
      padding={5}
      margin={"0 100px"}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      height={"75vh"}
      overflow={"auto"}
      ref={chatRef}
    >
      {messages &&
        messages.map((message) => (
          <Message
            content={message.content}
            time={extractTime(message.sentAt)}
            key={message.id}
            isMe={message.from === user?.id}
          ></Message>
        ))}
      <Box component={"form"} marginTop={"auto"} onSubmit={handleSend}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            sx={{ width: "100%" }}
            placeholder={"Send a message to the holy admin here"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            size="small"
          />
          <IconButton type="submit" color="primary" aria-label="send">
            <LuSendHorizontal style={{ color: "black" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export { Chat };
