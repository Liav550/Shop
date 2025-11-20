import { Box } from "@mui/material";
import type { FC } from "react";
import type { Product } from "../utils/types";
import { colorPalette } from "../utils/consts";

interface ProductCardProps {
  product: Product;
}
const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Box
      sx={{
        fontSize: "1.1rem",
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid black",
        height: "25rem",
        display: "flex",
        padding: 1,
        gap: 1,
        flexDirection: "column",
        backgroundColor: colorPalette.bege,
      }}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", maxHeight: "70%" }}
        />
      )}
      <Box flexGrow={1}>{product.name}</Box>
      {product.price && (
        <Box fontWeight="800" marginBottom={"auto"}>
          {product.price}$
        </Box>
      )}
    </Box>
  );
};

export default ProductCard;
