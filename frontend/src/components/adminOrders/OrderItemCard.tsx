import type { FC } from "react";
import type { Product } from "../../utils/types";
import { Box, Typography } from "@mui/material";

interface OrderItemCardProps {
  product: Omit<Product, "description">;
  amount: number;
}

const OrderItemCard: FC<OrderItemCardProps> = ({ product, amount }) => {
  return (
    <Typography
      height={"50px"}
      display={"flex"}
      alignItems={"center"}
      gap={2}
      marginBottom={1}
    >
      <img src={product.image} style={{ maxHeight: "100%" }} alt="" />
      <Box component={"span"}>{product.name}</Box>
      <Box component={"b"}>x{amount}</Box>
      <Box component={"b"} marginLeft={"auto"}>
        {" "}
        {(product.price! * amount).toFixed(2)}$
      </Box>
    </Typography>
  );
};

export { OrderItemCard };
