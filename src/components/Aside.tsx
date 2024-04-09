import { List, ListItem } from "@chakra-ui/react";
import AllRecipesSelector from "./AllRecipesSelector";
import MyRecipesSelector from "./MyRecipesSelector";
import FavouritesSelector from "./FavouritesSelector";
import CategorySelector from "./CategorySelector";
import IngredientsSelector from "./IngredientsSelector";
import AddEditRecipe from "./AddEditRecipe";
import { RecipesQuery } from "../pages/RecipesPage";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  setPath: (path: string) => void;
  setPage: (page: number) => void;
  setHeading: (heading: string) => void;
  setSearchResult: (result: string) => void;
  setRecipesQuery: (query: RecipesQuery) => void;
  handleSelectIngredientsChange: (ingredient: string) => void;
  recipesQuery: RecipesQuery;
  ingredients: string[];
  selectedIngredients: string[];
  name: string;
}

const Aside = ({
  setPath,
  setPage,
  setHeading,
  setSearchResult,
  setRecipesQuery,
  handleSelectIngredientsChange,
  recipesQuery,
  ingredients,
  name,
  selectedIngredients,
}: Props) => {
  return (
    <List paddingLeft={3} spacing={4}>
      <ListItem>
        <AllRecipesSelector
          onSelectAll={() => {
            setPage(0);
            setRecipesQuery({ page: 0 } as RecipesQuery);
            setPath("/recipes");
            setHeading("All Recipes");
            setSearchResult("");
          }}
        />
      </ListItem>
      <ListItem>
        <MyRecipesSelector
          selectMyRecipes={() => {
            setPage(0);
            setHeading("My Recipes");
            setPath("/recipes");
            setRecipesQuery({ ...recipesQuery, author: name, page: 0 });
            setSearchResult("");
          }}
        />
      </ListItem>
      <ListItem>
        <FavouritesSelector
          manageClick={() => {
            setPath("/recipes/favorites/list");
            setRecipesQuery({ page: 0 } as RecipesQuery);
            setHeading("My Favorite Recipes");
            setSearchResult("");
            setPage(0);
          }}
        />
      </ListItem>
      <ListItem>
        <CategorySelector
          onSelectCategory={(category) => {
            setHeading(category + " " + "Recipes");
            setPath("/recipes");
            setRecipesQuery({ ...recipesQuery, category });
            setSearchResult("");
          }}
        />
      </ListItem>
      <ListItem>
        <IngredientsSelector
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
  );
};

export default Aside;
