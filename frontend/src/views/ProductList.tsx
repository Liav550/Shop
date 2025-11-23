import { Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import type { Product, CartItem } from "../utils/types";
import type { FC } from "react";

interface ProductListProps {
  list: Product[] | CartItem[];
}

const ProductList: FC<ProductListProps> = ({ list }) => {
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
            showQuantity={"amount" in item}
            showCartButton={"amount" in item === false}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
