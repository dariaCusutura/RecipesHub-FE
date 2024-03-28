import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { TbMeat } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  ingredients: string[];
  selectedIngredients: string[];
  setSelectedIngr: (ingredient: string) => void;
}

const IngredientsSelector = ({
  ingredients,
  selectedIngredients,
  setSelectedIngr,
}: Props) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        width={160}
        leftIcon={<TbMeat size={19} />}
        rightIcon={selectedIngredients.length === 0 && <BsChevronDown />}
      >
        Ingredients{" "}
        {selectedIngredients.length !== 0 && selectedIngredients.length}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup type="checkbox">
          {ingredients.map((ingredient) => (
            <MenuItemOption
              key={ingredient}
              onClick={() => setSelectedIngr(ingredient)}
              isChecked={selectedIngredients.includes(ingredient.toLowerCase())}
              value={ingredient}
            >
              {ingredient}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default IngredientsSelector;
