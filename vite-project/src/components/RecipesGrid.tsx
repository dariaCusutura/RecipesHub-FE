import useRecipes from "../hooks/useRecipes";
import { Text } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";

interface Props {
  path: string;
}

const RecipesGrid = ({ path }: Props) => {
  const { recipes, error } = useRecipes({ path: path });

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </ul>
    </>
  );
};

export default RecipesGrid;
