import useRecipes from "../hooks/useRecipes";
import { Heading, List, ListItem } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";

interface Props {
  path: string;
}

const RecipesGrid = ({ path }: Props) => {
  const { recipes, error } = useRecipes({ path: path });

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
