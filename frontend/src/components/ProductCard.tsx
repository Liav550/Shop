import { Box, Button, TextField } from "@mui/material";
import { type FC } from "react";
import type { Product } from "../utils/types";
import { colorPalette } from "../utils/consts";
import { useCart } from "../contexts/useCart";
import { FaTrashAlt } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
  isCartItem?: boolean;
}
const ProductCard: FC<ProductCardProps> = ({ product, isCartItem = false }) => {
  const { addToCart, removeFromCart } = useCart();

  const onAddToCart = async () => {
    try {
      await addToCart(product.id);
    } catch (error) {
      console.error(error);
    }
  };

  const onRemoveFromCart = async () => {
    try {
      await removeFromCart(product.id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      sx={{
        fontSize: "1.1rem",
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid black",
        display: "flex",
        height: "30rem",
        padding: 1,
        gap: 1,
        flexDirection: "column",
        backgroundColor: colorPalette.darkBege,
      }}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", flexGrow: 1, maxHeight: "60%" }}
        />
      )}
      <Box flexGrow={1} display={"flex"} flexDirection={"column"} gap={"1rem"}>
        <Box>{product.name}</Box>
        <Box>
          <small>{product.description}</small>
        </Box>
      </Box>
      <Box fontWeight="800" marginBottom={"auto"} display={"flex"} gap={1}>
        <Box
          flexGrow={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {product.price}$
        </Box>
        {isCartItem && (
          <TextField
            sx={{ flexGrow: 1, width: "30%", height: "20%", padding: 0 }}
            defaultValue={1}
            type="number"
          ></TextField>
        )}
        {!isCartItem ? (
          <Button
            sx={{
              flexGrow: 1,
              backgroundColor: colorPalette.brown,
              color: "black",
              fontSize: "0.8rem",
            }}
            onClick={onAddToCart}
          >
            Add To Cart
          </Button>
        ) : (
          <Button onClick={onRemoveFromCart}>
            <FaTrashAlt color={colorPalette.brown} />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
