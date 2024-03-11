import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { BiFoodMenu } from "react-icons/bi";

interface Props {
  onSelectCategory: (category: string) => void;
}

const CategorySelector = ({ onSelectCategory }: Props) => {
  const categories = ["Sweet", "Savoury"];
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        leftIcon={<BiFoodMenu />}
      >
        Categories
      </MenuButton>
      <MenuList>
        {categories.map((category) => (
          <MenuItem
            onClick={() => {
              onSelectCategory(category);
            }}
            key={category}
          >
            {category}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
