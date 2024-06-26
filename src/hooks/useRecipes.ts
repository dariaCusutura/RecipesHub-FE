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
  date: Date;
}
interface Props {
  path: string;
}

const useRecipes = ({ path }: Props, recipesQuery: RecipesQuery) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecipesCount, setTotalRecipes] = useState();
  // Serializing recipesQuery for dependency array
  const serializedRecipesQuery = JSON.stringify(recipesQuery);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    apiRecipe
      .get(path, {
        params: {
          category: recipesQuery?.category,
          author: recipesQuery?.author,
          page: recipesQuery?.page,
          ingredients: recipesQuery?.ingredients,
        },
      })
      .then((res) => {
        setRecipes(res.data.recipes);
        setTotalRecipes(res.data.totalRecipesCount);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("useRecipes error:", err);
        setError(err.response.data);
        setIsLoading(false);
        if (
          err.response.data === "jwt must be provided" ||
          err.response.data === "Access denied."
        )
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      });

    return () => {
      setError("");
      controller.abort();
    };
  }, [
    path,
    recipesQuery?.author,
    recipesQuery?.category,
    recipesQuery?.ingredients,
    recipesQuery?.page,
    serializedRecipesQuery,
  ]);

  return { recipes, error, isLoading, totalRecipesCount };
};

export default useRecipes;
