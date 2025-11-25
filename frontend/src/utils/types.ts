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

type LocalLoginProps = {
  email: string;
  password: string;
  provider: string;
};

type GoogleLoginProps = {
  email: string;
  sub: string;
  provider: string;
};

export type {
  Product,
  User,
  CartItem,
  Cart,
  ProductItemDTO,
  LocalLoginProps,
  GoogleLoginProps,
};
