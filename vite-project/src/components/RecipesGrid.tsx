import useRecipes from "../hooks/useRecipes";
import { Text } from "@chakra-ui/react";

const RecipesGrid = () => {
  const { recipes, error } = useRecipes();

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </>
  );
};

export default RecipesGrid;
