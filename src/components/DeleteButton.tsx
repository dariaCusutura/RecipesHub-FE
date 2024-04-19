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
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface Props {
  recipe: Recipe;
  mode: string;
  user: User;
  deleteMyAccount: boolean;
}

const DeleteButton = ({ recipe, mode, user, deleteMyAccount }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, , removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const cancelRef = React.useRef();

  const manageDeleteAccount = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const manageDeleteRecipe = async () => {
    onClose();
    const url =
      mode === "recipe"
        ? `http://localhost:3000/recipes/${recipe._id}`
        : `http://localhost:3000/users/${user._id}`;

    await axios
      .delete(url, {
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
          deleteMyAccount
            ? setTimeout(() => {
                manageDeleteAccount();
              }, 1000)
            : setTimeout(() => {
                window.location.reload();
              }, 1000);
        }
      });
  };

  return (
    <>
      {deleteMyAccount ? (
        <Button onClick={onOpen} ml={3} marginStart={-1} variant={"primary"}>
          Delete your account
        </Button>
      ) : (
        <MenuItem onClick={onOpen}>Delete {mode}</MenuItem>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody
              fontSize={20}
              borderRadius={3}
              color={"thirdColor"}
            >
              Are you sure you want to delete{" "}
              {deleteMyAccount ? "your account" : `this ${mode}`}?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} color={"thirdColor"}>
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
