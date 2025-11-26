import type { Path } from "../utils/types";

export const paths: Path[] = [
  {
    to: "/admin",
    role: "admin",
    name: "Admin Panel",
  },
  {
    to: "/products",
    role: "user",
    name: "Products",
  },
  {
    to: "/cart",
    role: "user",
    name: "My Cart",
  },
  {
    to: "/orders",
    role: "user",
    name: "My Orders",
  },
];
