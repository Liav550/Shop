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

export type { Product, User };
