import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";
import { Text } from "@chakra-ui/react";

interface Recipes {
  id: number;
  name: string;
  ingredients: string[];
  category: string;
}

// interface FetchRecipesResponse {
//   results: Recipes[];
// }

const RecipesGrid = () => {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRecipe
      .get<Recipes[]>("/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);

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
