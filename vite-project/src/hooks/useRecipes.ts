import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  category: string;
}

const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRecipe
      .get<Recipe[]>("/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);

  return { recipes, error };
};

export default useRecipes;
