import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Recipe } from "../hooks/useRecipes";
import DeleteButton from "./DeleteButton";
import { User } from "../hooks/useUsers";
import AddEditRecipe from "./AddEditRecipe";

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
          <AddEditRecipe recipe={recipe} name="" mode="edit" />
          <DeleteButton
            recipe={recipe}
            mode="recipe"
            user={{} as User}
            deleteMyAccount={false}
          />
        </MenuList>
      </Menu>
    </>
  );
};

export default RecipeMenuButton;
