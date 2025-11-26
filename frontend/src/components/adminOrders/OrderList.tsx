import { Box } from "@mui/material";
import { colorPalette } from "../../utils/consts";
import { OrderCard } from "./OrderCard";
import { useGetRequest } from "../../hooks/useGetRequest";
import { useAuth } from "../../contexts/useAuth";
import type { AdminOrder } from "../../utils/types";

const OrderList = () => {
  const { token } = useAuth();
  const { data: orders } = useGetRequest<AdminOrder[]>(
    "/admin/orders",
    true,
    token ?? undefined
  );

  return (
    <Box
      sx={{
        height: "55vh",
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
      {orders &&
        orders.map((order) => <OrderCard key={order.id} order={order} />)}
    </Box>
  );
};

export { OrderList };
