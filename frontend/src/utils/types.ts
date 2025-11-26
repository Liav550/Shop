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
  role: "user" | "admin";
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

type Path = {
  to: string;
  role: "user" | "admin";
  name: string;
};

type OrderStatus = "ORDERING" | "PENDING" | "DELIVERED" | "DELIVERING";

type AdminOrder = {
  id: number;
  orderedAt: string;
  status: OrderStatus;
  orderItems: CartItem[];
  user: Pick<User, "email">;
};

export type {
  Product,
  User,
  CartItem,
  Cart,
  ProductItemDTO,
  LocalLoginProps,
  GoogleLoginProps,
  Path,
  AdminOrder,
  OrderStatus,
};
