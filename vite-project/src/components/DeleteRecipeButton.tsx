import {
  MenuItem,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  recipe: Recipe;
}

const DeleteRecipeButton = ({ recipe }: Props) => {
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
      <MenuItem onClick={onOpen}>Delete recipe</MenuItem>
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

export default DeleteRecipeButton;