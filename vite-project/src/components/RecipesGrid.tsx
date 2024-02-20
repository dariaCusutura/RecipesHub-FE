import useRecipes from "../hooks/useRecipes";
import { Text } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";

const RecipesGrid = () => {
  const { recipes, error } = useRecipes();

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe}/>
        ))}
      </ul>
    </>
  );
};

export default RecipesGrid;
