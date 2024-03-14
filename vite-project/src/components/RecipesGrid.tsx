import useRecipes from "../hooks/useRecipes";
import { Heading, List, ListItem } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import { RecipesQuery } from "../pages/RecipesPage";

interface Props {
  path: string;
  recipesQuery: RecipesQuery;
  selectedIngredients: string[];
  result: string;
}

const RecipesGrid = ({
  path,
  recipesQuery,
  selectedIngredients,
  result,
}: Props) => {
  const { recipes, error } = useRecipes({ path: path }, recipesQuery);

  // Function to check if a recipe contains all selected ingredients
  const hasAllIngredients = (recipeIngredients: string[]) => {
    return selectedIngredients.every((ingredient) =>
      recipeIngredients.includes(ingredient)
    );
  };
  // Filter recipes based on conditions
  const filteredRecipes = result
    ? recipes.filter((recipe) => recipe.name === result)
    : selectedIngredients.length !== 0
    ? recipes.filter((recipe) => hasAllIngredients(recipe.ingredients))
    : recipes;

  if (error) {
    return (
      <Heading marginY={3} size="lg" key={error}>
        {error}
      </Heading>
    );
  } else
    return (
      <List marginY={3}>
        {filteredRecipes.map((recipe) => (
          <ListItem paddingRight={5} marginY={3} key={recipe.name}>
            <RecipeCard recipe={recipe} />
          </ListItem>
        ))}
      </List>
    );
};

export default RecipesGrid;
