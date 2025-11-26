import { Chip } from "@mui/material";
import type { OrderStatus } from "../../utils/types";
import { useState, type FC } from "react";
import { useAuth } from "../../contexts/useAuth";
import axiosInstance from "../../api/axiosInstance";

interface StatusBadgeProps {
  status: OrderStatus;
  orderId: number;
}

const StatusBadge: FC<StatusBadgeProps> = ({
  status: currentStatus,
  orderId,
}) => {
  const { user } = useAuth();
  const token = localStorage.getItem("jwt");

  const statusColors: Record<OrderStatus, string> = {
    PENDING: "#ecfea3ff",
    DELIVERING: "#9bb4baff",
    DELIVERED: "#85c994ff",
    ORDERING: "gray",
  };

  const [status, setStatus] = useState<OrderStatus>(currentStatus);

  const nextStatus = async () => {
    if (user!.role !== "admin") {
      return;
    }

    let newStatus: OrderStatus;

    if (status === "PENDING") {
      newStatus = "DELIVERING";
    } else if (status === "DELIVERING") {
      newStatus = "DELIVERED";
    } else {
      newStatus = "PENDING";
    }

    setStatus(newStatus);
    patchStatus(newStatus);
  };

  const patchStatus = async (newStatus: OrderStatus) => {
    await axiosInstance.patch(
      `admin/orders/${orderId}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <Chip
      label={status}
      variant="outlined"
      sx={{
        backgroundColor: statusColors[status],
        fontWeight: "bold",
      }}
      onClick={() => {
        nextStatus();
      }}
    ></Chip>
  );
};

export { StatusBadge };
