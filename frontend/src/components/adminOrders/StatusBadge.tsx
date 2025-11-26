import { Chip } from "@mui/material";
import type { OrderStatus } from "../../utils/types";
import { useState, type FC } from "react";

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status: currentStatus }) => {
  const statusColors: Record<OrderStatus, string> = {
    PENDING: "#ecfea3ff",
    DELIVERING: "#9bb4baff",
    DELIVERED: "#85c994ff",
    ORDERING: "gray",
  };

  const [status, setStatus] = useState<OrderStatus>(currentStatus);

  const nextStatus = () => {
    if (status === "PENDING") {
      setStatus("DELIVERING");
    } else if (status === "DELIVERING") {
      setStatus("DELIVERED");
    } else {
      setStatus("PENDING");
    }
  };

  return (
    <Chip
      label={status}
      variant="outlined"
      sx={{
        backgroundColor: statusColors[status],
        fontWeight: "bold",
      }}
      onClick={() => nextStatus()}
    ></Chip>
  );
};

export { StatusBadge };
