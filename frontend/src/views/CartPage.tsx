import { Box, Button } from "@mui/material";
import { useCart } from "../contexts/useCart";
import ProductList from "../components/ProductList";
import { FaShoppingCart } from "react-icons/fa";
import { colorPalette } from "../utils/consts";
const CartPage = () => {
  const { cart, orderCart } = useCart();

  return cart?.orderItems ? (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <ProductList list={cart?.orderItems} />
      <Button
        sx={{
          color: "black",
          width: "30%",
          bgcolor: colorPalette.salmon,
          borderRadius: "8px",
          transition: "all 0.5s ease-in-out",
          "&:hover": {
            opacity: "80%",
            transition: "all 0.5s ease",
          },
          border: "1px solid black",
          fontSize: "2rem",
          margin: "1rem 0",
        }}
        onClick={orderCart}
      >
        <Box sx={{ mr: "1rem" }}>Ship</Box>
        <FaShoppingCart />
      </Button>
    </Box>
  ) : (
    <Box>Your cart is empty</Box>
  );
};

export default CartPage;
