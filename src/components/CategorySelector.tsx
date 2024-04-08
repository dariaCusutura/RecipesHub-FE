import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { BiFoodMenu } from "react-icons/bi";
import React from "react";

interface Props {
  onSelectCategory: (category: string) => void;
}

const CategorySelector = ({ onSelectCategory }: Props) => {
  const categories = ["Sweet", "Savoury"];
  return (
    <Menu>
      <MenuButton
        variant="primary"
        as={Button}
        rightIcon={<BsChevronDown />}
        leftIcon={<BiFoodMenu size={19} />}
        width={160}
      >
        Categories
      </MenuButton>
      <MenuList>
      {categories.map((category, index) => (
          <React.Fragment key={category + "-" + index}>
            <MenuItem
              onClick={() => {
                onSelectCategory(category);
              }}
              key={category}
            >
              {category}
            </MenuItem>
            {index !== categories.length - 1 && (
              <MenuDivider key={category + "-divider"} />
            )}
          </React.Fragment>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
