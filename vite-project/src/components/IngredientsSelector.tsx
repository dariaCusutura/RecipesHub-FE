import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { TbMeat } from "react-icons/tb";

const IngredientsSelector = ({
  ingredients,
  selectedIngredients,
  setSelectedIngr,
}) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} leftIcon={<TbMeat size={17} />}>
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
