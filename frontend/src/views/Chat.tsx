import { Box, TextField, IconButton } from "@mui/material";
import { Message, type MessageProps } from "../components/chat/Message";
import { useEffect, useRef, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { colorPalette } from "../utils/consts";

const Chat = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<Element>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const now = new Date().toLocaleString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { content: input.trim(), time: now, isMe: true },
    ]);
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
      {messages.map((message) => (
        <Message
          content={message.content}
          time={message.time}
          key={message.content}
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
