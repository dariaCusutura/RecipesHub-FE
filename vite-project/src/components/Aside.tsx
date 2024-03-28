import { List, ListItem } from "@chakra-ui/react";
import AllRecipesSelector from "./AllRecipesSelector";
import MyRecipesSelector from "./MyRecipesSelector";
import FavouritesSelector from "./FavouritesSelector";
import CategorySelector from "./CategorySelector";
import IngredientsSelector from "./IngredientsSelector";
import AddRecipe from "./AddRecipe";
import { RecipesQuery } from "../pages/RecipesPage";

interface Props {
  setPath: (path: string) => void;
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
            setRecipesQuery({} as RecipesQuery);
            setPath("/recipes");
            setHeading("All Recipes");
            setSearchResult("");
          }}
        />
      </ListItem>
      <ListItem>
        <MyRecipesSelector
          selectMyRecipes={() => {
            setHeading("My Recipes");
            setPath("/recipes");
            setRecipesQuery({ ...recipesQuery, author: name });
            setSearchResult("");
          }}
        />
      </ListItem>
      <ListItem>
        <FavouritesSelector
          manageClick={() => {
            setPath("/recipes/favorites/list");
            setRecipesQuery({} as RecipesQuery);
            setHeading("My Favorite Recipes");
            setSearchResult("");
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
      <ListItem>
        <AddRecipe name={name} />
      </ListItem>
    </List>
  );
};

export default Aside;
