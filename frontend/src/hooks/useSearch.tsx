/**
  @template T - bla ba
*/

import type { Product } from "../utils/types";

const useSearch = (
  list: Product[],
  searchInput: string,
  pricePredicate: (productPrice: number) => boolean
) => {
  return list.filter(
    (record) =>
      pricePredicate(record.price) &&
      Object.entries(record).some(([, value]) =>
        value.toString().toLowerCase().includes(searchInput.toLowerCase())
      )
  );
};

export { useSearch };
