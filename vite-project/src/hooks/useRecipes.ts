import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";
import { RecipesQuery } from "../pages/RecipesPage";

export interface Recipe {
  _id: number;
  name: string;
  ingredients: string[];
  category: string;
}
interface Props {
  path: string;
}

const useRecipes = ({ path }: Props, recipesQuery: RecipesQuery) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  // Serializing recipesQuery for dependency array. Consider performance implications.
  const serializedRecipesQuery = JSON.stringify(recipesQuery);

  useEffect(() => {
    apiRecipe
      .get<Recipe[]>(path, {
        params: { category: recipesQuery?.category },
      })
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      });

    return () => setError("");
  }, [path, recipesQuery?.category, serializedRecipesQuery]);

  return { recipes, error };
};

export default useRecipes;
