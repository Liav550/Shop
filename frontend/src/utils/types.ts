type Product = {
  image?: string;
  id: number;
  name: string;
  description?: string;
  price?: number;
};

type User = {
  id: number;
  email: string;
};

type ProductItemDTO = {
  cartId: number;
  productId: number;
  amount: number;
};

type CartItem = {
  amount: number;
  product: Product;
};

type Cart = {
  id: number;
  orderItems: CartItem[];
};

export type { Product, User, CartItem, Cart, ProductItemDTO };
