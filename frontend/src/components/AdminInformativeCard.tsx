import { Box } from "@mui/material";
import { colorPalette } from "../utils/consts";
import type { FC, ReactNode } from "react";
import { useGetRequest } from "../hooks/useGetRequest";
import { useAuth } from "../contexts/useAuth";

interface InformativeCardProps {
  title: string;
  url: string;
  description: string;
  icon: ReactNode;
}

const AdminInformativeCard: FC<InformativeCardProps> = ({
  title,
  url,
  description,
  icon,
}) => {
  const { token } = useAuth();

  const { data } = useGetRequest<number>(url, !!token, token ?? undefined);

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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component={"h2"} sx={{ flexGrow: 1 }}>
          {title}
        </Box>
        {icon}
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
          {data !== undefined ? data : "Loading..."}
        </Box>
        <Box margin={0} component={"p"}>
          {description}
        </Box>
      </Box>
    </Box>
  );
};

export { AdminInformativeCard };
