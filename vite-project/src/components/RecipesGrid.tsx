import useRecipes from "../hooks/useRecipes";
import { Heading, List, ListItem } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import { RecipesQuery } from "../pages/RecipesPage";

interface Props {
  path: string;
  recipesQuery: RecipesQuery
}

const RecipesGrid = ({ path, recipesQuery }: Props) => {
  const { recipes, error } = useRecipes({ path: path }, recipesQuery );

  return (
    <>
      {error ? (
        <Heading marginY={3} size="lg">
          {error}
        </Heading>
      ) : (
        <List marginY={3}>
          {recipes &&
            recipes.map((recipe) => (
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
