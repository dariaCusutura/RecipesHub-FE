import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

const RecipeMenuButton = () => {
  return (
    <Menu>
      <MenuButton marginBottom={1} borderRadius="9999px" alignSelf="center">
        <HiOutlineDotsHorizontal size={25} />
      </MenuButton>
      <MenuList marginTop={-2} marginRight={-2}>
        <MenuItem>Edit recipe</MenuItem>
        <MenuItem>Delete recipe</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default RecipeMenuButton;
