import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BiFoodMenu } from "react-icons/bi";

interface Props {
  onSelectCategory: (category: string) => void;
}

const CategorySelector = ({ onSelectCategory }: Props) => {
  const categories = ["Sweet", "Savoury"];
  const [selectedCategory, setSelectedCateg] = useState("");
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        leftIcon={<BiFoodMenu />}
      >
        {selectedCategory === "" ? "Categories" : selectedCategory}
      </MenuButton>
      <MenuList>
        {categories.map((category) => (
          <MenuItem
            onClick={() => {
              setSelectedCateg(category);
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
