import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { colorPalette } from "../utils/consts";
import { useState } from "react";

const ProductCreationForm = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <Box
      component={"form"}
      sx={{
        height: "56.5vh",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "2rem",
        overflowY: "auto",
        backgroundColor: colorPalette.brown,
      }}
    >
      <FormControl sx={{ mx: "auto" }}>
        <Box component={"h2"}>Add New Product</Box>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input multiline maxRows={3} id="description"></Input>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="price">Price</InputLabel>
        <Input id="price" type="number"></Input>
      </FormControl>
      <FormControl>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={(e) => setFile(e.target.files![0])}
        />
        <label htmlFor="raised-button-file">
          <Button
            sx={{
              backgroundColor: colorPalette.salmon,
              color: "black",
              width: "100%",
            }}
            variant="contained"
            component="span"
          >
            Select Image
          </Button>
        </label>
      </FormControl>
      <FormControl>
        {file && <img src={URL.createObjectURL(file)} alt="" />}
      </FormControl>
      <Button
        sx={{ backgroundColor: colorPalette.darkBege, color: "black" }}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
};

export { ProductCreationForm };
