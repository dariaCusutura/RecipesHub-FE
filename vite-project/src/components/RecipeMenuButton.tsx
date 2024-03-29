import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Recipe } from "../hooks/useRecipes";
import EditRecipeButton from "./EditRecipeButton";
import DeleteRecipeButton from "./DeleteRecipeButton";

interface Props {
  recipe: Recipe;
}

const RecipeMenuButton = ({ recipe }: Props) => {
  return (
    <>
      <Menu>
        <MenuButton marginBottom={1} borderRadius="9999px" alignSelf="center">
          <HiOutlineDotsHorizontal size={25} />
        </MenuButton>
        <MenuList marginTop={-2} marginRight={-2}>
          <EditRecipeButton recipe={recipe}/>
          <DeleteRecipeButton recipe={recipe} />
        </MenuList>
      </Menu>
    </>
  );
};

export default RecipeMenuButton;
