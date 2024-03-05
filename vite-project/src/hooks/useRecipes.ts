import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";

export interface Recipe {
  _id: number;
  name: string;
  ingredients: string[];
  category: string;
}
interface Props {
  path: string;
}

const useRecipes = ({ path }: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRecipe
      .get<Recipe[]>(path)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      });

    return () => setError("");
  }, [path]);

  return { recipes, error };
};

export default useRecipes;
