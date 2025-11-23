import { useGetRequest } from "../hooks/useGetRequest";
import type { Product } from "../utils/types";
import ProductList from "./ProductList";

const Home = () => {
  const productList: Product[] =
    useGetRequest<Product[]>("/products").data || [];

  return <ProductList list={productList} />;
};

export default Home;
