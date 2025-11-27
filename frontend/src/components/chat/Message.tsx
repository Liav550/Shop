import { Box } from "@mui/material";
import type { FC } from "react";

export interface MessageProps {
  isMe?: boolean;
  content: string;
  sender?: string;
  time: string;
}

const Message: FC<MessageProps> = ({ isMe = false, content, time }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMe ? "flex-start" : "flex-end",
        width: "100%",
        mb: 1,
      }}
    >
      <Box
        sx={{
          padding: 1,
          bgcolor: isMe ? "#d1ffd6" : "#9b9b9bff",
          borderRadius: isMe ? "0 8px 8px 8px" : "8px 0 8px 8px",
          display: "inline-block",
          maxWidth: "65%",
          width: "auto",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          fontSize: "1.2rem ",
        }}
      >
        {content}
      </Box>

      <Box component={"small"} sx={{ mt: 0.5, color: "#333", opacity: 0.8 }}>
        {time}
      </Box>
    </Box>
  );
};

export { Message };
