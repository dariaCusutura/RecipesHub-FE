import {
  Button,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { LuPlusSquare } from "react-icons/lu";
import toast from "react-hot-toast";
import { Recipe } from "../hooks/useRecipes";
import noImage from "./NoImg.jpg";

interface Props {
  name: string;
  mode: string;
  recipe: Recipe;
  isSmall: boolean;
}

const AddEditRecipe = ({ name, mode, recipe, isSmall }: Props) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageAddress, setImageAddress] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = ["Sweet", "Savoury"];

  useEffect(() => {
    if (mode === "edit") {
      setRecipeName(recipe.name);
      setIngredients(recipe.ingredients.join(", "));
      setImageAddress(recipe.image !== noImage ? recipe.image : "");
      setCategory(recipe.category);
    }
  }, [mode, recipe]);

  const handleSubmit = async () => {
    const url =
      mode === "add"
        ? `http://localhost:3000/recipes`
        : `http://localhost:3000/recipes/${recipe._id}`;
    const method = mode === "add" ? "post" : "put";

    try {
      const response = await axios[method](
        url,
        {
          name: recipeName,
          category,
          ingredients: ingredients === "" ? 0 : ingredients.split(","),
          image: imageAddress || noImage,
          author: mode === "add" ? name : recipe.author,
          date: mode === "add" ? new Date() : recipe.date,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        onClose();
        toast.success(mode === "add" ? "Recipe Saved" : "Recipe Updated");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data || "An error occurred");
      if (
        error.response?.data === "Access denied." ||
        error.response?.data === "Invalid token"
      ) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  return (
    <>
      {mode === "add" ? (
        <Button
          variant="primary"
          onClick={onOpen}
          width={160}
          justifyContent={"left"}
          leftIcon={<LuPlusSquare size={19} />}
          boxShadow={isSmall && 0}
        >
          Add recipe
        </Button>
      ) : (
        <MenuItem onClick={onOpen}>Edit recipe</MenuItem>
      )}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          mode === "add" && setCategory("");
          setError("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={25} color={"thirdColor"}>
            {mode === "add" ? "Add a new recipe" : "Edit recipe"}
          </ModalHeader>
          <ModalCloseButton marginTop={3} />
          <ModalBody>
            <Input
              defaultValue={mode !== "add" ? recipe.name : ""}
              id="Name"
              placeholder="Recipe name"
              marginBottom={5}
              onChange={(e) => {
                setRecipeName(e.target.value);
                e.preventDefault();
              }}
            />
            <Input
              defaultValue={mode !== "add" ? recipe.ingredients.join(", ") : ""}
              id="Ingredients"
              placeholder="Ingredients"
              marginBottom={5}
              onChange={(e) => {
                setIngredients(e.target.value);
                e.preventDefault();
              }}
            />
            <Input
              defaultValue={
                mode !== "add" && recipe.image !== noImage ? recipe.image : ""
              }
              id="Image"
              placeholder="Image address (optional)"
              marginBottom={5}
              onChange={(e) => {
                setImageAddress(e.target.value);
                e.preventDefault();
              }}
            />
            <Menu>
              <MenuButton
                variant="primary"
                as={Button}
                rightIcon={<BsChevronDown />}
                marginBottom={5}
              >
                {category || "Select category"}
              </MenuButton>
              <MenuList>
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => {
                      setCategory(category);
                      setError("");
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {error && (
              <Box>
                <Text color={"accent"} as={"b"}>
                  {error}
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} variant="primary">
              {mode === "add" ? "Save" : "Update Recipe"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEditRecipe;
