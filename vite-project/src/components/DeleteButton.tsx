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
import axios, { AxiosResponse } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Recipe } from "../hooks/useRecipes";
import { User } from "../hooks/useUsers";

interface Props {
  recipe: Recipe;
  mode: string;
  user: User;
}

const DeleteButton = ({ recipe, mode, user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const manageDeleteRecipe = async () => {
    onClose();
    await axios
      .delete(mode === "recipe" ?  `http://localhost:3000/recipes/${recipe._id}` : 
      `http://localhost:3000/users/${user._id}`, {
        withCredentials: true,
      })
      .catch((err) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return toast.error(err.response.data);
      })
      .then((res: AxiosResponse) => {
        if (res !== undefined && (res as AxiosResponse).status === 200) {
          toast.success(res.data);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
  };

  return (
    <>
      <MenuItem onClick={onOpen}>{mode === "recipe" ? "Delete recipe" : "Delete user"}</MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody marginTop={3} fontSize={20}>
              Are you sure you want to delete this {mode === "recipe" ? "recipe" : "user"}?
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

export default DeleteButton;
