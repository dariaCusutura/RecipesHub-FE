import { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";
import { RecipesQuery } from "../pages/RecipesPage";

export interface Recipe {
  _id: number;
  name: string;
  ingredients: string[];
  category: string;
  author: string;
  image: string;
}
interface Props {
  path: string;
}

const useRecipes = ({ path }: Props, recipesQuery: RecipesQuery) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Serializing recipesQuery for dependency array. Consider performance implications.
  const serializedRecipesQuery = JSON.stringify(recipesQuery);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    apiRecipe
      .get<Recipe[]>(path, {
        params: { category: recipesQuery?.category },
      })
      .then((res) => {
        setRecipes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setIsLoading(false);
      });

    return () => {
      setError("");
      controller.abort();
    };
  }, [path, recipesQuery?.category, serializedRecipesQuery]);

  return { recipes, error, isLoading };
};

export default useRecipes;
