import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";
import { MdExpandMore } from "react-icons/md";
import { colorPalette } from "../../utils/consts";
import type { AdminOrder } from "../../utils/types";
import { StatusBadge } from "./StatusBadge";
import { OrderItemCard } from "./OrderItemCard";

interface OrderCardProps {
  order: AdminOrder;
}

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const totalPrice = order.orderItems.reduce((acc, item) => {
    return acc + item.product.price! * item.amount;
  }, 0);

  return (
    <Accordion
      sx={{ width: "100%", height: "fit-content", bgcolor: colorPalette.bege }}
      expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={<MdExpandMore style={{ fontSize: "2rem" }} />}
      >
        <Typography display={"flex"} alignItems={"center"}>
          Order #{order.id}
        </Typography>
        <Typography component={"span"} marginLeft={2}>
          <StatusBadge status={order.status} orderId={order.id} />
        </Typography>
        <Typography component={"span"} marginLeft={2} marginTop={0.5}>
          Ordered At &nbsp;
          {new Date(order.orderedAt).toLocaleString("he-IL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </Typography>
        <Typography component={"span"} marginLeft={2} marginTop={0.5}>
          {order.orderItems.length}{" "}
          {order.orderItems.length === 1 ? "item" : "items"}
        </Typography>
        <Typography component={"b"} marginLeft={"auto"} marginTop={0.5}>
          {order.user.email}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {order.orderItems.map((item) => {
          return (
            <>
              <OrderItemCard
                key={item.product.id}
                product={item.product}
                amount={item.amount}
              />
              <Divider />
            </>
          );
        })}
        <Typography display={"flex"} alignItems={"center"} marginTop={2}>
          <Box component={"b"} ml={"auto"}>
            Total: {totalPrice.toFixed(2)}$
          </Box>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export { OrderCard };
