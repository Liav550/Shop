import { createContext, useContext, type FC, type ReactNode } from "react";
import type { Cart, ProductItemDTO } from "../utils/types";
import { useAuth } from "./useAuth";
import { useGetRequest } from "../hooks/useGetRequest";
import { usePostRequest } from "../hooks/usePostRequest";
import { useDeleteRequest } from "../hooks/useDeleteRequest";
import axiosInstance from "../api/axiosInstance";

interface CartContextType {
  cart: Cart | null;
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  changeProductAmount: (productId: number, amount: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  addToCart: async () => {},
  removeFromCart: async () => {},
  changeProductAmount: async () => {},
});

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { data: cart, refetch } = useGetRequest<Cart>(`/carts/${user?.id}`);

  const { mutateAsync: add } = usePostRequest<
    ProductItemDTO,
    { productId: number }
  >(`/carts/${cart?.id}/add`);

  const { mutateAsync: remove } = useDeleteRequest<
    { status: string },
    { productId: number }
  >(`carts/${cart?.id}/remove`);

  const removeFromCart = async (productId: number) => {
    await remove({ productId });

    refetch();
  };

  const addToCart = async (productId: number) => {
    await add({ productId });

    refetch();
  };

  const changeProductAmount = async (productId: number, amount: number) => {
    await axiosInstance.patch(`carts/${cart?.id}/${productId}`, { amount });

    refetch();
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart ? cart : null,
        addToCart,
        removeFromCart,
        changeProductAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
