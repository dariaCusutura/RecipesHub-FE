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

  return (
    <>
      {isSmall ? ( // Check if isSmall is true
        <Menu isOpen={isMenuOpen}>
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
            onClick={() => setIsMenuOpen(true)}
          />
          <MenuList ref={menuRef}>
            <AllRecipesSelector
              onSelectAll={() => {
                setPage(0);
                setRecipesQuery({ page: 0 } as RecipesQuery);
                setPath("/recipes");
                setHeading("All Recipes");
                setDisplayRecipes();
                setIsMenuOpen(false);
              }}
              isSmall={isSmall}
            />
            <MyRecipesSelector
              isSmall={isSmall}
              selectMyRecipes={() => {
                setPage(0);
                setHeading("My Recipes");
                setPath("/recipes");
                setRecipesQuery({ ...recipesQuery, author: name, page: 0 });
                setDisplayRecipes();
                setIsMenuOpen(false);
              }}
            />
            <FavouritesSelector
              isSmall={isSmall}
              manageClick={() => {
                setPath("/recipes/favorites/list");
                setRecipesQuery({ page: 0 } as RecipesQuery);
                setHeading("My Favorite Recipes");
                setDisplayRecipes();
                setPage(0);
                setIsMenuOpen(false);
              }}
            />
            <CategorySelector
              isSmall={isSmall}
              onSelectCategory={(category) => {
                setHeading(category + " " + "Recipes");
                setPage(0);
                setPath("/recipes");
                setRecipesQuery({ category, page: 0 } as RecipesQuery);
                setDisplayRecipes();
                setIsMenuOpen(false);
              }}
            />
            <br />
            <IngredientsSelector
              isSmall={isSmall}
              ingredients={ingredients}
              selectedIngredients={selectedIngredients}
              setSelectedIngr={(ingredient) =>
                handleSelectIngredientsChange(ingredient)
              }
            />
            <br />
            {/* add recipe button */}
            <AddEditRecipe name={name} mode="add" recipe={{} as Recipe} />
          </MenuList>
        </Menu>
      ) : (
        // Render List and ListItem if isSmall is false
        <List paddingLeft={3} spacing={4}>
          <ListItem>
            <AllRecipesSelector
              onSelectAll={() => {
                setPage(0);
                setRecipesQuery({ page: 0 } as RecipesQuery);
                setPath("/recipes");
                setHeading("All Recipes");
                setDisplayRecipes();
              }}
              isSmall={isSmall}
            />
          </ListItem>
          <ListItem>
            <MyRecipesSelector
              isSmall={isSmall}
              selectMyRecipes={() => {
                setPage(0);
                setHeading("My Recipes");
                setPath("/recipes");
                setRecipesQuery({ ...recipesQuery, author: name, page: 0 });
                setDisplayRecipes();
              }}
            />
          </ListItem>
          <ListItem>
            <FavouritesSelector
              isSmall={isSmall}
              manageClick={() => {
                setPath("/recipes/favorites/list");
                setRecipesQuery({ page: 0 } as RecipesQuery);
                setHeading("My Favorite Recipes");
                setDisplayRecipes();
                setPage(0);
              }}
            />
          </ListItem>
          <ListItem>
            <CategorySelector
              isSmall={isSmall}
              onSelectCategory={(category) => {
                setHeading(category + " " + "Recipes");
                setPage(0);
                setPath("/recipes");
                setRecipesQuery({ category, page: 0 } as RecipesQuery);
                setDisplayRecipes();
              }}
            />
          </ListItem>
          <ListItem>
            <IngredientsSelector
              isSmall={isSmall}
              ingredients={ingredients}
              selectedIngredients={selectedIngredients}
              setSelectedIngr={(ingredient) =>
                handleSelectIngredientsChange(ingredient)
              }
            />
          </ListItem>
          {/* add recipe button */}
          <ListItem>
            <AddEditRecipe name={name} mode="add" recipe={{} as Recipe} />
          </ListItem>
        </List>
      )}
    </>
  );
};

export default Aside;
