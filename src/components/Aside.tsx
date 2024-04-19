import {
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import AllRecipesSelector from "./AllRecipesSelector";
import MyRecipesSelector from "./MyRecipesSelector";
import FavouritesSelector from "./FavouritesSelector";
import CategorySelector from "./CategorySelector";
import IngredientsSelector from "./IngredientsSelector";
import AddEditRecipe from "./AddEditRecipe";
import { RecipesQuery } from "../pages/RecipesPage";
import { Recipe } from "../hooks/useRecipes";
import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import React from "react";
import MenuItemWrapper from "./MenuItemWrapper";

interface Props {
  setPath: (path: string) => void;
  setPage: (page: number) => void;
  setHeading: (heading: string) => void;
  setDisplayRecipes: () => void;
  setRecipesQuery: (query: RecipesQuery) => void;
  handleSelectIngredientsChange: (ingredient: string) => void;
  recipesQuery: RecipesQuery;
  ingredients: string[];
  selectedIngredients: string[];
  name: string;
  isSmall: boolean;
}

const Aside = ({
  setPath,
  setPage,
  setHeading,
  setDisplayRecipes,
  setRecipesQuery,
  handleSelectIngredientsChange,
  recipesQuery,
  ingredients,
  name,
  selectedIngredients,
  isSmall,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref for the menu

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (options) => {
    setPage(0);
    setRecipesQuery(options.query as RecipesQuery);
    setPath(options.path);
    setHeading(options.heading);
    setDisplayRecipes();
    if (isSmall) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const menuItems = [
    {
      component: AllRecipesSelector,
      props: {
        onSelectAll: () =>
          handleSelectOption({
            query: { page: 0 },
            path: "/recipes",
            heading: "All Recipes",
          }),
        isSmall,
      },
      label: "All Recipes",
    },
    {
      component: MyRecipesSelector,
      props: {
        selectMyRecipes: () =>
          handleSelectOption({
            query: { ...recipesQuery, author: name, page: 0 },
            path: "/recipes",
            heading: "My Recipes",
          }),
        isSmall,
      },
      label: "My Recipes",
    },
    {
      component: FavouritesSelector,
      props: {
        manageClick: () =>
          handleSelectOption({
            query: { page: 0 },
            path: "/recipes/favorites/list",
            heading: "My Favorite Recipes",
          }),
        isSmall,
      },
      label: "My Favorite Recipes",
    },
    {
      component: CategorySelector,
      props: {
        onSelectCategory: (category) =>
          handleSelectOption({
            query: { category, page: 0 },
            path: "/recipes",
            heading: category + " " + "Recipes",
          }),
        isSmall,
      },
      label: "Select category",
    },
    {
      component: IngredientsSelector,
      props: {
        setSelectedIngr: (ingredient) =>
          handleSelectIngredientsChange(ingredient),
        isSmall,
        ingredients,
        selectedIngredients,
      },
      label: "Select ingredients",
    },
  ];

  const renderMenuItems = () => (
    <>
      {menuItems.map(({ component, props, label }, index) => (
        <React.Fragment key={label}>
          <MenuItemWrapper component={component} props={props} />
          {index >= 3 && <br />}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <>
      {isSmall ? ( // Check if isSmall is true
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<RxHamburgerMenu />}
            variant="outline"
            marginTop={1}
            marginLeft={3}
            marginRight={1}
            borderColor={"thirdColor"}
            boxShadow="5px 5px 12px 0 rgba(0,0,0,0.2)"
            borderWidth="2px"
            bg="background"
            opacity="0.95"
            _hover={{
              borderColor: "accent",
              boxShadow: "5px 5px 12px 0 rgba(0,0,0,0.5)",
              transition: "0.7s",
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <MenuList ref={menuRef}>
            {renderMenuItems()}{" "}
            <AddEditRecipe
              name={name}
              mode="add"
              recipe={{} as Recipe}
              isSmall={isSmall}
            />
          </MenuList>
        </Menu>
      ) : (
        // Render List and ListItem if isSmall is false
        <List paddingLeft={3} spacing={4}>
          {menuItems.map(({ component, props, label }) => (
            <ListItem key={label}>
              <MenuItemWrapper component={component} props={props} />
            </ListItem>
          ))}
          <ListItem>
            <AddEditRecipe
              isSmall={isSmall}
              name={name}
              mode="add"
              recipe={{} as Recipe}
            />
          </ListItem>
        </List>
      )}
    </>
  );
};

export default Aside;
