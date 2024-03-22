import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  recipe: Recipe;
}

const RecipeMenuButton = ({ recipe }: Props) => {
  const manageDeleteRecipe = async () => {
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
          <MenuItem onClick={manageDeleteRecipe}>Delete recipe</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default RecipeMenuButton;
