/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetRequest } from "../hooks/useGetRequest";
import type { Product } from "../utils/types";
import ProductList from "../components/ProductList";
import { useSearch } from "../hooks/useSearch";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { colorPalette } from "../utils/consts";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [priceCondition, setPriceCondition] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);

  const get = useGetRequest<Product[]>("/products");
  const productList = get.data || [];

  const refetch = get.refetch;

  const calculatePredicate = (
    price: number | null,
    condition: string | null
  ) => {
    if (!price || !condition) {
      return (productPrice: number) => true;
    }

    if (condition === ">") {
      return (productPrice: number) => productPrice >= price;
    }

    return (productPrice: number) => productPrice < price;
  };

  // compute predicate each render so we always pass a function to useSearch
  const pricePredicate = calculatePredicate(price, priceCondition);
  const filteredList = useSearch(productList, searchInput, pricePredicate);

  const handlePriceConditionChange = (e: { target: { value: string } }) => {
    const newPriceCondition = e.target.value;

    setPriceCondition(newPriceCondition);
  };

  const handlePriceChange = (e: { target: { value: string } }) => {
    const newPrice = e.target.value;

    setPrice(newPrice === "" ? null : parseFloat(newPrice));
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        component={"form"}
        gap={2}
        padding={2}
        marginBottom={2}
        bgcolor={colorPalette.brown}
      >
        <FormControl sx={{ width: "40%" }}>
          <InputLabel>Search Products...</InputLabel>
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            startAdornment={
              <InputAdornment position="end">
                <FaSearch style={{ marginRight: 10 }} />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="select-price">Price</InputLabel>
          <Select
            defaultValue=""
            labelId="select-price"
            value={priceCondition}
            onChange={handlePriceConditionChange}
          >
            <MenuItem value={""}> No Filter</MenuItem>
            <MenuItem value={">"}>Is Above (including) </MenuItem>
            <MenuItem value={"<"}>Is Below</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Enter price</InputLabel>
          <Input type="number" onChange={handlePriceChange}></Input>
        </FormControl>
      </Box>
      <ProductList list={filteredList} refetch={refetch} />
    </>
  );
};

export default HomePage;
