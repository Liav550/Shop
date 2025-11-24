import { useCart } from "../contexts/useCart";
import ProductList from "./ProductList";

const CartPage = () => {
  const { cart } = useCart();
  console.log(cart);

  return cart?.orderItems && <ProductList list={cart?.orderItems} />;
};

export default CartPage;
