import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Recipe } from "../hooks/useRecipes";
import React from "react";

interface Props {
  recipe: Recipe;
}

const RecipeMenuButton = ({ recipe }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const manageDeleteRecipe = async () => {
    onClose();
    await axios
      .delete(`http://localhost:3000/recipes/${recipe._id}`)
      .catch((err) => console.log(err))
      .then(() => {
        toast.success("Recipe deleted");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <>
      <Menu>
        <MenuButton marginBottom={1} borderRadius="9999px" alignSelf="center">
          <HiOutlineDotsHorizontal size={25} />
        </MenuButton>
        <MenuList marginTop={-2} marginRight={-2}>
          <MenuItem>Edit recipe</MenuItem>
          <MenuItem onClick={onOpen}>Delete recipe</MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody marginTop={3} fontSize={20}>
              Are you sure you want to delete this recipe?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={manageDeleteRecipe} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RecipeMenuButton;
