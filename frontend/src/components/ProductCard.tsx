import { Box, Button, Input } from "@mui/material";
import { type ChangeEvent, type FC } from "react";
import type { Product } from "../utils/types";
import { colorPalette } from "../utils/consts";
import { useCart } from "../contexts/useCart";
import { FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../contexts/useAuth";
import { useDeleteRequest } from "../hooks/useDeleteRequest";
import type { QueryObserverResult } from "@tanstack/react-query";

interface ProductCardProps {
  product: Product;
  amount?: number;
  isCartItem?: boolean;
  refetch?: () => Promise<QueryObserverResult<Product[], unknown>>;
}
const ProductCard: FC<ProductCardProps> = ({
  product,
  isCartItem = false,
  amount = 1,
  refetch,
}) => {
  const { addToCart, removeFromCart, changeProductAmount } = useCart();
  const { user } = useAuth();
  const { mutateAsync: deleteProduct } = useDeleteRequest(
    `admin/products/${product.id}`,
    { withAuth: true }
  );
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

  const validate = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;

    if (val === "" || val === null) {
      e.target.value = "1";
      return;
    }

    const num = Number(val);

    if (!Number.isInteger(num) || num < 1) {
      e.target.value = "1";
      return;
    }

    e.target.value = String(num);

    await changeProductAmount(product.id, parseInt(e.target.value));
  };

  const onRemoveProduct = async () => {
    try {
      await deleteProduct(product.id);

      await refetch?.();
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
        maxHeight: "40rem",
        padding: 1,
        gap: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: colorPalette.darkBege,
      }}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", maxHeight: "60%", flexGrow: 1 }}
        />
      )}
      <Box display="flex" flexDirection="column" gap={1}>
        <Box>{product.name}</Box>
        <Box component={"small"}>{product.description}</Box>
        <Box fontWeight="800" display={"flex"} gap={1}>
          <Box
            flexGrow={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {product.price}$
          </Box>
          {isCartItem && (
            <Input
              sx={{
                flexGrow: 1,
                width: "30%",
                padding: 0,
              }}
              defaultValue={amount}
              onChange={validate}
              type="number"
              inputProps={{ min: 1, step: 1 }}
            ></Input>
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
        {user?.role === "admin" && !isCartItem && (
          <Button
            sx={{
              bgcolor: "#ea4040ff",
              color: "black",
              paddingLeft: 4,
              paddingRight: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box component={"span"} flexGrow={1} onClick={onRemoveProduct}>
              DELETE PRODUCT
            </Box>
            <FaTrashAlt />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
