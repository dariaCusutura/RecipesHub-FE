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
  }, [path, recipesQuery]);

  return { recipes, error };
};

export default useRecipes;
