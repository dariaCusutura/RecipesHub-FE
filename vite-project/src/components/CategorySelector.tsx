import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const CategorySelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Category
      </MenuButton>
      <MenuList>
        <MenuItem>Sweet</MenuItem>
        <MenuItem>Savoury</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
