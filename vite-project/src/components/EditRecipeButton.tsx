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
} from "@chakra-ui/react";
import { useState } from "react";
import { Recipe } from "../hooks/useRecipes";
import { BsChevronDown } from "react-icons/bs";
import axios, { AxiosResponse } from "axios";
import noImage from "./NoImg.jpg";
import toast from "react-hot-toast";

interface Props {
  recipe: Recipe;
  name: string;
}

const EditRecipeButton = ({ recipe, name }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recipeName, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(", "));
  const [imageAddress, setImageAddress] = useState("");
  const [category, setCategory] = useState(recipe.category);
  const [error, setError] = useState("");
  const categories = ["Sweet", "Savoury"];

  const manageUpdate = async () => {
    await axios
      .put(
        `http://localhost:3000/recipes/${recipe._id}`,
        {
          name: recipeName,
          ingredients: ingredients === "" ? 0 : ingredients.split(","),
          category,
          author: name,
          image: imageAddress !== "" ? imageAddress : noImage,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
        if (
          err.response.data === "Access denied." ||
          err.response.data === "Invalid token"
        )
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      })
      .then((res) => {
        if (res !== undefined && (res as AxiosResponse).status === 200) {
          onClose();
          toast.success("Recipe Updated");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Edit recipe</MenuItem>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setError("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={25} marginTop={3}>
            Edit Recipe
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              defaultValue={recipe.name}
              id="Name"
              placeholder="Recipe name"
              marginBottom={5}
              onChange={(e) => {
                setName(e.target.value);
                e.preventDefault();
              }}
            />
            <Input
              defaultValue={recipe.ingredients.join(", ")}
              id="Ingredients"
              placeholder="Ingredients"
              marginBottom={5}
              onChange={(e) => {
                setIngredients(e.target.value);
                e.preventDefault();
              }}
            />
            <Input
              defaultValue={recipe.image !== noImage ? recipe.image : ""}
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
                as={Button}
                rightIcon={<BsChevronDown />}
                marginBottom={5}
              >
                {category !== "" ? category : "Select category"}
              </MenuButton>
              <MenuList defaultValue={recipe.category}>
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
            {error && <Text color={"red"}>{error}</Text>}
          </ModalBody>
          <ModalFooter>
            <Button onClick={manageUpdate} colorScheme="green">
              Update Recipe
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditRecipeButton;
