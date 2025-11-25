import { Box } from "@mui/material";
import { colorPalette } from "../utils/consts";
import type { FC } from "react";
import { FaUser } from "react-icons/fa";

interface InformativeCardProps {
  title: string;
  url: string;
  description: string;
}

const AdminInformativeCard: FC<InformativeCardProps> = ({
  title,
  url,
  description,
}) => {
  console.log(url);
  return (
    <Box
      sx={{
        backgroundColor: colorPalette.brown,
        borderRadius: "8px",
        padding: 2,
        height: "20vh",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", height: "50%" }}>
        <Box component={"h2"} sx={{ flexGrow: 1 }}>
          {title}
        </Box>
        <FaUser></FaUser>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Box component="h3" margin={0}>
          1000
        </Box>
        <Box margin={0} component={"p"}>
          {description}
        </Box>
      </Box>
    </Box>
  );
};

export { AdminInformativeCard };
