import { useGetRequest } from "../hooks/useGetRequest";
import type { Product } from "../utils/types";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const get = useGetRequest<Product[]>("/products");

  const productList = get.data || [];
  const refetch = get.refetch;

  return <ProductList list={productList} refetch={refetch} />;
};

export default HomePage;
