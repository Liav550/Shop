import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import type { Product, CartItem } from "../utils/types";
import type { FC } from "react";
import type { QueryObserverResult } from "@tanstack/react-query";

interface ProductListProps {
  list: Product[] | CartItem[];
  refetch?: () => Promise<QueryObserverResult<Product[], unknown>>;
}

const ProductList: FC<ProductListProps> = ({ list, refetch }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gap: "0.8rem",
          margin: "0 300px",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {list.map((item) => (
          <ProductCard
            key={"amount" in item ? item.product.id : item.id}
            product={"amount" in item ? item.product : item}
            isCartItem={"amount" in item}
            amount={"amount" in item ? item.amount : 1}
            refetch={refetch}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
