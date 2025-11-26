import { Chip } from "@mui/material";
import type { OrderStatus } from "../../utils/types";
import type { FC } from "react";

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  return (
    <Chip
      label={status}
      variant="outlined"
      sx={{ backgroundColor: "yellow" }}
    ></Chip>
  );
};

export { StatusBadge };
