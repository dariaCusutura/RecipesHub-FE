import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Recipe } from "../hooks/useRecipes";
import EditRecipeButton from "./EditRecipeButton";
import DeleteButton from "./DeleteButton";
import { User } from "../hooks/useUsers";

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
          <DeleteButton recipe={recipe} mode="recipe" user={{} as User}/>
        </MenuList>
      </Menu>
    </>
  );
};

export default RecipeMenuButton;
