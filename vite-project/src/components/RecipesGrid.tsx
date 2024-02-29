import useRecipes from "../hooks/useRecipes";
import { List, ListItem, Text } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";

interface Props {
  path: string;
}

const RecipesGrid = ({ path }: Props) => {
  const { recipes, error } = useRecipes({ path: path });

  return (
    <>
      {error && <Text>{error}</Text>}
      <List>
        {recipes.map((recipe) => (
          <ListItem paddingRight={5} marginY={3} key={recipe.name}>
            <RecipeCard recipe={recipe} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default RecipesGrid;
