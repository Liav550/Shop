import { Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import type { Product } from "../utils/types";
import { useGetRequest } from "../hooks/useGetRequest";

const ProductList = () => {
  const productList: Product[] =
    useGetRequest<Product[]>("/products").data || [];

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: "0.8rem",
          margin: "0 300px",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </>
  );
};

export default ProductList;
