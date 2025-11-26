import { Box } from "@mui/material";
import { colorPalette } from "../../utils/consts";
import { OrderCard } from "./OrderCard";
import { useGetRequest } from "../../hooks/useGetRequest";
import { useAuth } from "../../contexts/useAuth";
import type { AdminOrder } from "../../utils/types";
import type { FC } from "react";

interface OrderListProps {
  url: string;
  height?: string;
}

const OrderList: FC<OrderListProps> = ({ url, height }) => {
  const { token } = useAuth();
  const { data: orders } = useGetRequest<AdminOrder[]>(
    url,
    true,
    token ?? undefined
  );

  return orders && orders.length > 0 ? (
    <Box
      sx={{
        height: height || "55vh",
        backgroundColor: colorPalette.brown,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        padding: "1rem",
        borderRadius: "8px",
        overflowY: "auto",
      }}
    >
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Box>
  ) : (
    <Box> No Previous Orders</Box>
  );
};

export { OrderList };
