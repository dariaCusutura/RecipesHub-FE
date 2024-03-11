import useRecipes from "../hooks/useRecipes";
import { Heading, List, ListItem } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import { RecipesQuery } from "../pages/RecipesPage";

interface Props {
  path: string;
  recipesQuery: RecipesQuery;
  selectedIngredients: string[];
}

const RecipesGrid = ({ path, recipesQuery, selectedIngredients }: Props) => {
  const { recipes, error } = useRecipes({ path: path }, recipesQuery);

  const hasIngredients = (parent, subset) => {
    return subset.every((e) => {
      return parent.includes(e);
    });
  };

  return (
    <>
      {error ? (
        <Heading marginY={3} size="lg" key={error}>
          {error}
        </Heading>
      ) : (
        <List marginY={3}>
          {selectedIngredients.length !== 0
            ? recipes.map(
                (recipe) =>
                  hasIngredients(recipe.ingredients, selectedIngredients) && (
                    <ListItem paddingRight={5} marginY={3} key={recipe.name}>
                      <RecipeCard recipe={recipe} />
                    </ListItem>
                  )
              )
            : recipes.map((recipe) => (
                <ListItem paddingRight={5} marginY={3} key={recipe.name}>
                  <RecipeCard recipe={recipe} />
                </ListItem>
              ))}
        </List>
      )}
    </>
  );
};

export default RecipesGrid;
