import { Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import image from "../assets/image.png";
import type { Product } from "../utils/types";

const ProductList = () => {
  const productList: Product[] = [
    {
      name: "GAN 16 3x3 Max (Magnetic, MagLev, Core Magnets, UV Coated)",
      image: image,
      price: 59.99,
    },
    {
      name: "GAN 16 3x3 Max (Magnetic, MagLev, Core Magnets, UV Coated)",
      image: image,
      price: 59.99,
    },
    {
      name: "GAN 16 3x3 Max (Magnetic, MagLev, Core Magnets, UV Coated)",
      image: image,
      price: 59.99,
    },
    {
      name: "GAN 16 3x3 Max (Magnetic, MagLev, Core Magnets, UV Coated)",
      image: image,
      price: 59.99,
    },
    {
      name: "GAN 16 3x3 Max (Magnetic, MagLev, Core Magnets, UV Coated)",
      image: image,
      price: 59.99,
    },
    {
      name: "GAN 16 3x3 Max (Magnetic, MagLev, Core Magnets, UV Coated)",
      image: image,
      price: 59.99,
    },
    {
      name: "GAN 16 3x3 Max (Magnetic, MagLev, Core Magnets, UV Coated)",
      image: image,
      price: 59.99,
    },
    {
      name: "GAN 16 3x3 Max (Magnetic, MagLev, Core Magnets, UV Coated)",
      image: image,
      price: 59.99,
    },
  ];
  return (
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
      {productList.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </Box>
  );
};

export default ProductList;
