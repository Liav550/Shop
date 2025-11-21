type Product = {
  image?: string;
  name: string;
  description?: string;
  price?: number;
};

type User = {
  id: number;
  email: string;
};

export type { Product, User };
