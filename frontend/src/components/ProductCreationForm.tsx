import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { colorPalette } from "../utils/consts";
import { useState } from "react";
import { usePostRequest } from "../hooks/usePostRequest";

interface FormProps {
  name: string;
  description: string;
  price: number;
  file: File | null;
}
const ProductCreationForm = () => {
  const { mutateAsync: createProduct } = usePostRequest("admin/products", {
    withAuth: true,
    contentType: "multipart/form-data",
  });
  const [formState, setFormState] = useState<FormProps>({
    name: "",
    description: "",
    price: 0,
    file: null,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formState.file ||
      formState.name.trim() === "" ||
      formState.description.trim() === ""
    ) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("description", formState.description);
    formData.append("price", formState.price.toString());
    formData.append("file", formState.file);

    await createProduct(formData);
  };

  return (
    <Box
      component={"form"}
      onSubmit={onSubmit}
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
        <Input
          id="name"
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input
          multiline
          maxRows={3}
          id="description"
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
        ></Input>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="price">Price</InputLabel>
        <Input
          type="number"
          id="price"
          inputProps={{
            min: 0,
            step: "0.01",
          }}
          onChange={(e) =>
            setFormState({ ...formState, price: parseFloat(e.target.value) })
          }
        ></Input>
      </FormControl>
      <FormControl>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={(e) =>
            setFormState({ ...formState, file: e.target.files![0] })
          }
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
        {formState.file && (
          <img src={URL.createObjectURL(formState.file)} alt="" />
        )}
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
