import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { TbMeat } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import React from "react";

interface Props {
  ingredients: string[];
  selectedIngredients: string[];
  setSelectedIngr: (ingredient: string) => void;
  isSmall: boolean;
}

const IngredientsSelector = ({
  ingredients,
  selectedIngredients,
  setSelectedIngr,
  isSmall,
}: Props) => {
  return (
    <Menu closeOnSelect={false}>
      {isSmall ? (
        <MenuButton
          variant="ghost"
          as={Button}
          color={"background"}
          width={160}
          leftIcon={<TbMeat size={19} />}
          rightIcon={selectedIngredients.length === 0 && <BsChevronDown />}
          _hover={{ bgColor: "accent", transition: "0.7s" }}
        >
          Ingredients{" "}
          {selectedIngredients.length !== 0 && selectedIngredients.length}
        </MenuButton>
      ) : (
        <MenuButton
          variant="primary"
          as={Button}
          width={160}
          leftIcon={<TbMeat size={19} />}
          rightIcon={selectedIngredients.length === 0 && <BsChevronDown />}
        >
          Ingredients{" "}
          {selectedIngredients.length !== 0 && selectedIngredients.length}
        </MenuButton>
      )}

      <MenuList>
        <MenuOptionGroup type="checkbox">
          {ingredients.map((ingredient, index) => (
            <React.Fragment key={ingredient + "-" + index}>
              <MenuItemOption
                onClick={() => setSelectedIngr(ingredient)}
                isChecked={selectedIngredients.includes(
                  ingredient.toLowerCase()
                )}
                value={ingredient}
              >
                {ingredient}
              </MenuItemOption>
              {index !== ingredients.length - 1 && <MenuDivider />}
            </React.Fragment>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default IngredientsSelector;
