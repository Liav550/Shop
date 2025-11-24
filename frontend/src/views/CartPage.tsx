import { useAuth } from "../contexts/useAuth";
import { useGetRequest } from "../hooks/useGetRequest";
import type { Cart } from "../utils/types";
import ProductList from "./ProductList";

const CartPage = () => {
  const { user } = useAuth();

  console.log(user);
  const { data } = useGetRequest<Cart>(`/carts/${user?.id}`);

  return data?.orderItems && <ProductList list={data?.orderItems} />;
};

export default CartPage;
