import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";

interface Recipes {
  id: number;
  name: string;
  ingredients: string[];
  category: string;
}

const useRecipes = () => {
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

  return { recipes, error };
};

export default useRecipes;
